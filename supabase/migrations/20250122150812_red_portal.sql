-- Drop existing triggers and functions first
DROP TRIGGER IF EXISTS update_user_tokens_updated_at ON user_tokens;
DROP TRIGGER IF EXISTS on_auth_user_created_tokens ON auth.users;
DROP FUNCTION IF EXISTS handle_new_user_tokens();
DROP FUNCTION IF EXISTS check_token_balance(uuid, integer);
DROP FUNCTION IF EXISTS deduct_tokens(uuid, integer);

-- Update existing table if needed
DO $$ 
BEGIN
  -- Update default token balance if column exists
  IF EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'user_tokens' 
    AND column_name = 'token_balance'
  ) THEN
    ALTER TABLE user_tokens 
    ALTER COLUMN token_balance SET DEFAULT 30;
  END IF;
END $$;

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

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION handle_new_user_tokens()
RETURNS trigger AS $$
BEGIN
  INSERT INTO user_tokens (profile_id, token_balance)
  VALUES (NEW.id, 30)
  ON CONFLICT (profile_id) DO NOTHING;
  RETURN NEW;
END;
$$ language plpgsql security definer;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created_tokens
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE handle_new_user_tokens();

-- Create trigger for updated_at
CREATE TRIGGER update_user_tokens_updated_at
  BEFORE UPDATE ON user_tokens
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();

-- Update token balance for existing users
UPDATE user_tokens
SET token_balance = 30
WHERE token_balance < 30;

-- Insert tokens for users who don't have them
INSERT INTO user_tokens (profile_id, token_balance)
SELECT id, 30 FROM profiles
WHERE id NOT IN (SELECT profile_id FROM user_tokens)
ON CONFLICT (profile_id) DO NOTHING;

-- Ensure RLS is enabled
ALTER TABLE user_tokens ENABLE ROW LEVEL SECURITY;

-- Recreate policies
DO $$ 
BEGIN
  DROP POLICY IF EXISTS "Users can view their own tokens" ON user_tokens;
  DROP POLICY IF EXISTS "System can update token balances" ON user_tokens;

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
END $$;