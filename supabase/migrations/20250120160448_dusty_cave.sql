-- Drop existing table if exists
DROP TABLE IF EXISTS user_posting_preferences;

-- Create user_posting_preferences table with correct structure
CREATE TABLE user_posting_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  auto_publish boolean DEFAULT false,
  default_time time DEFAULT '12:00',
  platforms jsonb DEFAULT '{"facebook": true, "instagram": true}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add index for profile_id
CREATE INDEX idx_user_posting_preferences_profile_id 
  ON user_posting_preferences(profile_id);

-- Add unique constraint for profile_id
ALTER TABLE user_posting_preferences 
  ADD CONSTRAINT user_posting_preferences_profile_id_key 
  UNIQUE (profile_id);

-- Enable RLS
ALTER TABLE user_posting_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies
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

-- Add updated_at trigger
CREATE TRIGGER update_user_posting_preferences_updated_at
  BEFORE UPDATE ON user_posting_preferences
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();