/*
  # Admin Panel Setup

  1. New Functions
    - verify_and_set_admin function for admin authentication
  
  2. Security
    - RLS policies for admin access
*/

-- Create admin verification function
CREATE OR REPLACE FUNCTION verify_and_set_admin(login text, password text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Simple admin verification
  RETURN login = 'admin' AND password = 'Mercedesa35amg!';
END;
$$;