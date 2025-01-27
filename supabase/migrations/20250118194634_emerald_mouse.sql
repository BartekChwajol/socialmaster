/*
  # Fix admin access

  1. Changes
    - Add function to set admin status
    - Add function to check login credentials
    - Update admin policies
*/

-- Function to set user as admin
CREATE OR REPLACE FUNCTION set_admin_status(user_id uuid)
RETURNS void AS $$
BEGIN
  UPDATE auth.users
  SET raw_user_meta_data = 
    CASE 
      WHEN raw_user_meta_data IS NULL THEN jsonb_build_object('isAdmin', true)
      ELSE raw_user_meta_data || jsonb_build_object('isAdmin', true)
    END
  WHERE id = user_id;
  
  -- Update profiles table as well
  UPDATE profiles
  SET metadata = 
    CASE 
      WHEN metadata IS NULL THEN jsonb_build_object('isAdmin', true)
      ELSE metadata || jsonb_build_object('isAdmin', true)
    END
  WHERE id = user_id;
END;
$$ language plpgsql security definer;

-- Function to verify admin credentials and set admin status
CREATE OR REPLACE FUNCTION verify_and_set_admin(login text, password text)
RETURNS boolean AS $$
BEGIN
  IF login = 'admin' AND password = 'Mercedesa35amg!' THEN
    -- Set the current user as admin
    PERFORM set_admin_status(auth.uid());
    RETURN true;
  END IF;
  RETURN false;
END;
$$ language plpgsql security definer;

-- Grant execute permission on the functions
GRANT EXECUTE ON FUNCTION verify_and_set_admin TO authenticated;
GRANT EXECUTE ON FUNCTION set_admin_status TO authenticated;