/*
# Create Profiles Table
This script creates the `profiles` table to store user data, including their name, UPI details, and trust score. It also enables Row Level Security (RLS) to protect the data and inserts an initial record for the user 'omkar'.

## Query Description: This operation is structural and safe. It creates a new table and inserts one row. There is no risk to existing data as the table is new.

## Metadata:
- Schema-Category: "Structural"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true (Can be dropped)

## Structure Details:
- Table: `public.profiles`
- Columns: `id`, `name`, `upi_id`, `upi_number`, `score`

## Security Implications:
- RLS Status: Enabled
- Policy Changes: No (but sets up the table for future policies)
- Auth Requirements: None for creation

## Performance Impact:
- Indexes: Primary key on `id`
- Triggers: None
- Estimated Impact: Low
*/

-- Create the profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  upi_id TEXT UNIQUE NOT NULL,
  upi_number TEXT UNIQUE,
  score INTEGER NOT NULL CHECK (score >= 0 AND score <= 100)
);

-- Add comments to the table and columns for clarity
COMMENT ON TABLE public.profiles IS 'Stores public user profiles and their trust scores.';
COMMENT ON COLUMN public.profiles.id IS 'Unique identifier for the user profile.';
COMMENT ON COLUMN public.profiles.name IS 'The user''s full name.';
COMMENT ON COLUMN public.profiles.upi_id IS 'The user''s primary UPI ID.';
COMMENT ON COLUMN public.profiles.upi_number IS 'The user''s UPI-linked phone number.';
COMMENT ON COLUMN public.profiles.score IS 'The user''s trust score, from 0 to 100.';

-- Enable Row Level Security (RLS) on the table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows public read access to all profiles
CREATE POLICY "Public profiles are viewable by everyone."
ON public.profiles FOR SELECT
USING (true);

-- Create a policy that allows users to insert their own profile
-- This is a placeholder; in a real app, you'd link this to auth.users
CREATE POLICY "Users can insert their own profile."
ON public.profiles FOR INSERT
WITH CHECK (true); -- In a real app, this would be (auth.uid() = id)

/*
# Insert Initial User Data
This script inserts the initial data for the user 'omkar' into the newly created `profiles` table.

## Query Description: This is a data insertion operation. It is safe and adds one new record to the `profiles` table.

## Metadata:
- Schema-Category: "Data"
- Impact-Level: "Low"
- Requires-Backup: false
- Reversible: true (The row can be deleted)

## Structure Details:
- Table: `public.profiles`

## Security Implications:
- RLS Status: N/A (insertion)
- Policy Changes: No
- Auth Requirements: None for this script

## Performance Impact:
- Indexes: Uses primary key index
- Triggers: None
- Estimated Impact: Low
*/

-- Insert the specific user 'omkar' as requested
INSERT INTO public.profiles (name, upi_id, upi_number, score)
VALUES ('omkar', 'omkar@upi', '9620174461', 40);
