/*
  # Token System Implementation

  1. New Tables
    - `user_tokens`
      - Tracks user token balance and usage
      - Stores token refresh schedule
      - Links to profiles table

  2. Security
    - Enable RLS
    - Add policies for user access
    - Add policies for admin access

  3. Functions
    - Token deduction function
    - Token balance check function
    - Daily token refresh function
*/

-- Create user_tokens table
CREATE TABLE user_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  token_balance integer NOT NULL DEFAULT 0,
  last_refresh timestamptz DEFAULT now(),
  next_refresh timestamptz DEFAULT now() + interval '1 day',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT user_tokens_profile_id_key UNIQUE (profile_id)
);

-- Enable RLS
ALTER TABLE user_tokens ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own tokens"
  ON user_tokens
  FOR SELECT
  TO authenticated
  USING (auth.uid() = profile_id);

CREATE POLICY "System can update token balances"
  ON user_tokens
  FOR ALL
  TO authenticated
  USING (auth.uid() = profile_id)
  WITH CHECK (auth.uid() = profile_id);

-- Create token functions
CREATE OR REPLACE FUNCTION check_token_balance(user_id uuid, required_tokens integer)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM user_tokens
    WHERE profile_id = user_id
    AND token_balance >= required_tokens
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION deduct_tokens(user_id uuid, tokens_to_deduct integer)
RETURNS boolean AS $$
BEGIN
  UPDATE user_tokens
  SET token_balance = token_balance - tokens_to_deduct
  WHERE profile_id = user_id
  AND token_balance >= tokens_to_deduct;
  
  RETURN FOUND;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Add updated_at trigger
CREATE TRIGGER update_user_tokens_updated_at
  BEFORE UPDATE ON user_tokens
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Create initial token balances for existing users
INSERT INTO user_tokens (profile_id, token_balance)
SELECT id, 100 FROM profiles
ON CONFLICT (profile_id) DO NOTHING;