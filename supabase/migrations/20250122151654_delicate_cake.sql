-- Create table to track IP addresses
CREATE TABLE ip_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address text NOT NULL,
  registration_count integer DEFAULT 1,
  first_registration timestamptz DEFAULT now(),
  last_registration timestamptz DEFAULT now()
);

-- Add index for IP address
CREATE INDEX idx_ip_registrations_ip_address ON ip_registrations(ip_address);

-- Function to check and update IP registration count
CREATE OR REPLACE FUNCTION check_ip_registration_limit()
RETURNS trigger AS $$
DECLARE
  ip_address text;
  current_count integer;
  MAX_REGISTRATIONS constant integer := 3;
BEGIN
  -- Get IP address from auth.users metadata
  ip_address := NEW.raw_user_meta_data->>'ip_address';
  
  IF ip_address IS NULL THEN
    RAISE EXCEPTION 'IP address is required for registration';
  END IF;

  -- Get current registration count for this IP
  SELECT registration_count INTO current_count
  FROM ip_registrations
  WHERE ip_registrations.ip_address = check_ip_registration_limit.ip_address;

  IF current_count IS NULL THEN
    -- First registration from this IP
    INSERT INTO ip_registrations (ip_address)
    VALUES (ip_address);
  ELSIF current_count >= MAX_REGISTRATIONS THEN
    RAISE EXCEPTION 'Maximum number of registrations (%) reached for this IP address', MAX_REGISTRATIONS;
  ELSE
    -- Update existing record
    UPDATE ip_registrations
    SET 
      registration_count = registration_count + 1,
      last_registration = now()
    WHERE ip_registrations.ip_address = check_ip_registration_limit.ip_address;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to check IP limit before user creation
CREATE TRIGGER check_ip_limit_before_signup
  BEFORE INSERT ON auth.users
  FOR EACH ROW
  EXECUTE PROCEDURE check_ip_registration_limit();

-- Enable RLS on ip_registrations
ALTER TABLE ip_registrations ENABLE ROW LEVEL SECURITY;

-- Only allow admins to view IP registrations
CREATE POLICY "Admins can view IP registrations"
  ON ip_registrations
  FOR SELECT
  TO authenticated
  USING (is_admin());