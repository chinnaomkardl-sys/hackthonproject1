/*
# [Operation Name]
Create Profiles Table and Seed Initial Data

## Query Description: [This operation creates the 'profiles' table required by the application to store user data, including names, UPI details, and trust scores. It also inserts an initial record for the user 'omkar'. This is a foundational step for the database and is safe to run as it creates a new, required table without affecting any existing data.]

## Metadata:
- Schema-Category: ["Structural", "Data"]
- Impact-Level: ["Low"]
- Requires-Backup: false
- Reversible: true

## Structure Details:
- Table: public.profiles
- Columns: id, name, upi_id, upi_number, score

## Security Implications:
- RLS Status: [Disabled]
- Policy Changes: [No]
- Auth Requirements: [None for this script]

## Performance Impact:
- Indexes: [Primary key on 'id', Unique on 'upi_id', Unique on 'upi_number']
- Triggers: [None]
- Estimated Impact: [Low, simple table creation for application functionality.]
*/

-- Create the profiles table to store user information and trust scores.
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  upi_id TEXT UNIQUE NOT NULL,
  upi_number TEXT UNIQUE,
  score INT NOT NULL CHECK (score &gt;= 0 AND score &lt;= 100)
);

-- Insert the initial user data for 'omkar' as previously requested.
INSERT INTO public.profiles (name, upi_id, upi_number, score)
VALUES ('omkar', 'omkar@upi', '9620174461', 40);
