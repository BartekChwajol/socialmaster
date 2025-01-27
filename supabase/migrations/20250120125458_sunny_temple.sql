/*
  # Add custom posts functionality

  1. New Tables
    - `custom_posts`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references profiles)
      - `date` (date)
      - `content` (text)
      - `image_url` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on custom_posts table
    - Add policies for authenticated users to manage their own posts
    - Add policies for admins to view all posts
*/

-- Create custom_posts table
CREATE TABLE IF NOT EXISTS custom_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  content text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_custom_posts_profile_id ON custom_posts(profile_id);
CREATE INDEX IF NOT EXISTS idx_custom_posts_date ON custom_posts(date);

-- Add unique constraint for profile_id and date combination
ALTER TABLE custom_posts 
ADD CONSTRAINT custom_posts_profile_id_date_key 
UNIQUE (profile_id, date);

-- Enable RLS
ALTER TABLE custom_posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can manage their own custom posts"
  ON custom_posts
  FOR ALL
  TO authenticated
  USING (auth.uid() = profile_id)
  WITH CHECK (auth.uid() = profile_id);

CREATE POLICY "Admins can view all custom posts"
  ON custom_posts
  FOR SELECT
  TO authenticated
  USING (is_admin());

-- Add updated_at trigger
CREATE TRIGGER update_custom_posts_updated_at
  BEFORE UPDATE ON custom_posts
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Create storage bucket for post images
INSERT INTO storage.buckets (id, name, public)
VALUES ('post-images', 'post-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for post images
CREATE POLICY "Users can upload their own post images"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'post-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update their own post images"
  ON storage.objects
  FOR UPDATE
  TO authenticated
  USING (
    bucket_id = 'post-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete their own post images"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'post-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Post images are publicly accessible"
  ON storage.objects
  FOR SELECT
  TO public
  USING (bucket_id = 'post-images');