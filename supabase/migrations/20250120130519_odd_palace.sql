/*
  # Update user posting preferences table

  1. Changes
    - Drop existing table and recreate with correct structure
    - Add proper foreign key reference to profiles
    - Add RLS policies
*/

-- Drop existing table if exists
DROP TABLE IF EXISTS user_posting_preferences;

-- Create user_posting_preferences table with correct structure
CREATE TABLE user_posting_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  auto_publish boolean DEFAULT false,
  default_time time DEFAULT '12:00',
  facebook_enabled boolean DEFAULT true,
  instagram_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add index for user_id
CREATE INDEX idx_user_posting_preferences_user_id 
  ON user_posting_preferences(user_id);

-- Add unique constraint for user_id
ALTER TABLE user_posting_preferences 
  ADD CONSTRAINT user_posting_preferences_user_id_key 
  UNIQUE (user_id);

-- Enable RLS
ALTER TABLE user_posting_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own posting preferences"
  ON user_posting_preferences
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

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