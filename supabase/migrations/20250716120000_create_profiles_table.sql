/*
          # Create Profiles Table and Seed Data
          This migration creates a 'profiles' table to store user information, including their name, UPI details, and a trust score. It also seeds the table with an initial user as requested.

          ## Query Description:
          - Creates a new table named 'profiles'.
          - Inserts one initial user record ('omkar').
          - Enables Row Level Security (RLS) on the table.
          - Creates a policy to allow public read access, which is necessary for the app to check trust scores before a transaction.
          This operation is safe and will not affect existing data as it only creates new objects.

          ## Metadata:
          - Schema-Category: "Structural"
          - Impact-Level: "Low"
          - Requires-Backup: false
          - Reversible: true

          ## Structure Details:
          - Table: public.profiles
          - Columns: id, created_at, name, upi_id, upi_number, trust_score
          - Constraints: PRIMARY KEY (id), UNIQUE (upi_id), UNIQUE (upi_number)

          ## Security Implications:
          - RLS Status: Enabled
          - Policy Changes: Yes, adds a read-only policy for the 'anon' role.
          - Auth Requirements: None for reading, admin for writing.

          ## Performance Impact:
          - Indexes: Adds primary key and unique indexes.
          - Triggers: None.
          - Estimated Impact: Low. The indexes will ensure efficient lookups by UPI ID and number.
          */

-- Create the profiles table
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    name TEXT NOT NULL,
    upi_id TEXT UNIQUE,
    upi_number TEXT UNIQUE,
    trust_score INT NOT NULL CHECK (trust_score >= 0 AND trust_score <= 100)
);

-- Add comments to the table and columns for clarity
COMMENT ON TABLE public.profiles IS 'Stores user profile information, including their trust score.';
COMMENT ON COLUMN public.profiles.name IS 'The full name of the user.';
COMMENT ON COLUMN public.profiles.upi_id IS 'The user''s unique UPI ID.';
COMMENT ON COLUMN public.profiles.upi_number IS 'The user''s unique UPI-linked phone number.';
COMMENT ON COLUMN public.profiles.trust_score IS 'A score from 0-100 indicating user trustworthiness.';

-- Insert the initial user data for 'omkar'
INSERT INTO public.profiles (name, upi_id, upi_number, trust_score)
VALUES ('omkar', '9620174461', '9620174461', 40);

-- 1. Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. Create a policy that allows public read access
CREATE POLICY "Allow public read access"
ON public.profiles
FOR SELECT
TO anon, authenticated
USING (true);
