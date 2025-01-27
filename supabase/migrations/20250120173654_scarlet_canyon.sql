-- Drop existing table if exists
DROP TABLE IF EXISTS user_posting_preferences;

-- Create user_posting_preferences table with correct structure
CREATE TABLE IF NOT EXISTS user_posting_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  auto_publish boolean DEFAULT false,
  default_time time DEFAULT '12:00',
  platforms jsonb DEFAULT '{"facebook": true, "instagram": true}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add unique constraint
ALTER TABLE user_posting_preferences
  ADD CONSTRAINT user_posting_preferences_profile_id_key UNIQUE (profile_id);

-- Add index for profile_id
CREATE INDEX IF NOT EXISTS idx_user_posting_preferences_profile_id 
  ON user_posting_preferences(profile_id);

-- Enable RLS
ALTER TABLE user_posting_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can manage their own posting preferences" ON user_posting_preferences;
  DROP POLICY IF EXISTS "Admins can view all posting preferences" ON user_posting_preferences;
  
  CREATE POLICY "Users can manage their own posting preferences"
    ON user_posting_preferences
    FOR ALL
    TO authenticated
    USING (auth.uid() = profile_id)
    WITH CHECK (auth.uid() = profile_id);

  CREATE POLICY "Admins can view all posting preferences"
    ON user_posting_preferences
    FOR SELECT
    TO authenticated
    USING (is_admin());
END $$;

-- Add updated_at trigger
DROP TRIGGER IF EXISTS update_user_posting_preferences_updated_at ON user_posting_preferences;
CREATE TRIGGER update_user_posting_preferences_updated_at
  BEFORE UPDATE ON user_posting_preferences
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Function to handle new user preferences
CREATE OR REPLACE FUNCTION handle_new_user_preferences()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.user_posting_preferences (profile_id)
  VALUES (new.id)
  ON CONFLICT (profile_id) DO NOTHING;
  RETURN new;
END;
$$ language plpgsql security definer;

-- Trigger for new user creation
DROP TRIGGER IF EXISTS on_auth_user_created_preferences ON auth.users;
CREATE TRIGGER on_auth_user_created_preferences
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE handle_new_user_preferences();

-- Insert preferences for existing users in batches
DO $$ 
DECLARE
  batch_size INTEGER := 100;
  total_users INTEGER;
  processed_users INTEGER := 0;
BEGIN
  SELECT COUNT(*) INTO total_users 
  FROM profiles 
  WHERE id NOT IN (SELECT profile_id FROM user_posting_preferences);
  
  WHILE processed_users < total_users LOOP
    INSERT INTO user_posting_preferences (profile_id)
    SELECT id FROM profiles
    WHERE id NOT IN (SELECT profile_id FROM user_posting_preferences)
    LIMIT batch_size;
    
    processed_users := processed_users + batch_size;
  END LOOP;
END $$;