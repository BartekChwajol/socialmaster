/*
  # Fix database relations and migrate existing data

  1. Changes
    - Create missing profiles for existing users
    - Update foreign key relationships
    - Rename columns and update constraints
    
  2. Security
    - Maintain existing RLS policies
*/

-- First, create missing profiles for existing users
INSERT INTO profiles (id, email, metadata)
SELECT 
  id,
  email,
  raw_user_meta_data
FROM auth.users
WHERE id NOT IN (SELECT id FROM profiles)
ON CONFLICT (id) DO NOTHING;

-- Now we can safely update the posts table
ALTER TABLE posts 
  RENAME COLUMN user_id TO profile_id;

ALTER TABLE posts
  DROP CONSTRAINT IF EXISTS posts_user_id_fkey,
  ADD CONSTRAINT posts_profile_id_fkey 
    FOREIGN KEY (profile_id) 
    REFERENCES profiles(id) 
    ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_posts_profile_id 
  ON posts(profile_id);

-- Update social_media_accounts table
ALTER TABLE social_media_accounts 
  RENAME COLUMN user_id TO profile_id;

ALTER TABLE social_media_accounts
  DROP CONSTRAINT IF EXISTS social_media_accounts_user_id_fkey,
  ADD CONSTRAINT social_media_accounts_profile_id_fkey 
    FOREIGN KEY (profile_id) 
    REFERENCES profiles(id) 
    ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS idx_social_media_accounts_profile_id 
  ON social_media_accounts(profile_id);

-- Update unique constraints
ALTER TABLE posts 
  DROP CONSTRAINT IF EXISTS posts_user_id_date_key,
  ADD CONSTRAINT posts_profile_id_date_key 
    UNIQUE (profile_id, date);

ALTER TABLE social_media_accounts 
  DROP CONSTRAINT IF EXISTS social_media_accounts_user_id_platform_account_name_key,
  ADD CONSTRAINT social_media_accounts_profile_id_platform_account_name_key 
    UNIQUE (profile_id, platform, account_name);