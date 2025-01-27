/*
  # Add social media integrations and post settings

  1. New Tables
    - social_media_accounts
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - platform (text) - nazwa platformy (Instagram, Facebook, etc.)
      - account_name (text) - nazwa konta
      - access_token (text) - token dostępu
      - is_connected (boolean) - status połączenia
      - created_at (timestamptz)
      - updated_at (timestamptz)
    
    - post_schedules
      - id (uuid, primary key)
      - post_id (uuid, references posts)
      - platform (text) - platforma docelowa
      - scheduled_time (time) - zaplanowana godzina publikacji
      - created_at (timestamptz)
      - updated_at (timestamptz)

    - user_posting_preferences
      - id (uuid, primary key)
      - user_id (uuid, references auth.users)
      - platform (text) - platforma
      - default_time (time) - domyślna godzina publikacji
      - created_at (timestamptz)
      - updated_at (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Social Media Accounts table
CREATE TABLE IF NOT EXISTS social_media_accounts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  platform text NOT NULL,
  account_name text NOT NULL,
  access_token text,
  is_connected boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, platform, account_name)
);

-- Post Schedules table
CREATE TABLE IF NOT EXISTS post_schedules (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts NOT NULL,
  platform text NOT NULL,
  scheduled_time time NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- User Posting Preferences table
CREATE TABLE IF NOT EXISTS user_posting_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  platform text NOT NULL,
  default_time time NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, platform)
);

-- Enable RLS
ALTER TABLE social_media_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_posting_preferences ENABLE ROW LEVEL SECURITY;

-- Policies for social_media_accounts
CREATE POLICY "Users can manage their own social media accounts"
  ON social_media_accounts
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policies for post_schedules
CREATE POLICY "Users can manage their own post schedules"
  ON post_schedules
  FOR ALL
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM posts
    WHERE posts.id = post_id
    AND posts.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM posts
    WHERE posts.id = post_id
    AND posts.user_id = auth.uid()
  ));

-- Policies for user_posting_preferences
CREATE POLICY "Users can manage their own posting preferences"
  ON user_posting_preferences
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Add updated_at triggers
CREATE TRIGGER update_social_media_accounts_updated_at
  BEFORE UPDATE ON social_media_accounts
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_post_schedules_updated_at
  BEFORE UPDATE ON post_schedules
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_user_posting_preferences_updated_at
  BEFORE UPDATE ON user_posting_preferences
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();