/*
  # Add image_url column to posts table

  1. Changes
    - Add image_url column to posts table
    - Add index for faster image_url lookups
  
  2. Security
    - No changes to RLS policies needed
*/

-- Add image_url column to posts table
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS image_url text;

-- Add index for image_url column
CREATE INDEX IF NOT EXISTS idx_posts_image_url 
ON posts(image_url);