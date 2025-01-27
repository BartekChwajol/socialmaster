/*
  # Fix admin permissions

  1. Changes
    - Add admin policies for all tables
    - Update existing policies
    
  2. Security
    - Only admins can view all data
    - Regular users can only view their own data
*/

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM auth.users
    WHERE auth.uid() = id
    AND raw_user_meta_data->>'isAdmin' = 'true'
  );
END;
$$ language plpgsql security definer;

-- Update profiles policies
DROP POLICY IF EXISTS "Profiles are viewable by admin" ON profiles;
CREATE POLICY "Profiles are viewable by admin" ON profiles
  FOR SELECT USING (is_admin());

-- Add admin policies for posts
DROP POLICY IF EXISTS "Posts are viewable by admin" ON posts;
CREATE POLICY "Posts are viewable by admin" ON posts
  FOR SELECT USING (is_admin());

-- Add admin policies for social_media_accounts
DROP POLICY IF EXISTS "Social media accounts are viewable by admin" ON social_media_accounts;
CREATE POLICY "Social media accounts are viewable by admin" ON social_media_accounts
  FOR SELECT USING (is_admin());

-- Update existing RLS policies to use profile_id instead of user_id
DROP POLICY IF EXISTS "Users can manage their own posts" ON posts;
CREATE POLICY "Users can manage their own posts" ON posts
  FOR ALL USING (auth.uid() = profile_id)
  WITH CHECK (auth.uid() = profile_id);

DROP POLICY IF EXISTS "Users can manage their own social media accounts" ON social_media_accounts;
CREATE POLICY "Users can manage their own social media accounts" ON social_media_accounts
  FOR ALL USING (auth.uid() = profile_id)
  WITH CHECK (auth.uid() = profile_id);