/*
  # Add unique constraint to posts table

  1. Changes
    - Add unique constraint on user_id and date columns to support upsert operations
*/

-- Add unique constraint for user_id and date combination
ALTER TABLE posts 
ADD CONSTRAINT posts_user_id_date_key 
UNIQUE (user_id, date);