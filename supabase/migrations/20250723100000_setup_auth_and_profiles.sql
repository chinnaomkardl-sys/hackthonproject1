/*
# [Create Profiles Table and Auth Triggers]
This script sets up the database to support user profiles linked to Supabase Authentication. It creates a `profiles` table, enables Row Level Security (RLS) for data protection, and adds policies to control access. It also includes a trigger that automatically creates a user profile when a new user signs up.

## Query Description: [This operation creates a new `profiles` table to store user data like full names and trust scores. It is designed to work with Supabase's built-in authentication. It will not affect any existing data as it only creates new structures. No data will be lost.]

## Metadata:
- Schema-Category: ["Structural"]
- Impact-Level: ["Low"]
- Requires-Backup: [false]
- Reversible: [true]

## Structure Details:
- Tables-Affected:
  - `public.profiles` (Created)
- Columns-Added:
  - `id` (UUID, PK, FK to auth.users.id)
  - `updated_at` (TIMESTAMPTZ)
  - `full_name` (TEXT)
  - `upi_id` (TEXT, UNIQUE)
  - `trust_score` (INTEGER)
  - `avatar_url` (TEXT)
- Triggers-Added:
  - `on_auth_user_created` on `auth.users` table.

## Security Implications:
- RLS Status: [Enabled] on `public.profiles`.
- Policy Changes: [Yes], new policies are created for the `profiles` table.
  - Public profiles are viewable by everyone.
  - Users can insert their own profile.
  - Users can update their own profile.
- Auth Requirements: [Policies require users to be authenticated.]

## Performance Impact:
- Indexes: [A primary key index is created on `profiles.id` and a unique index on `profiles.upi_id`.]
- Triggers: [A new trigger is added to `auth.users`, which will fire once per new user registration. The performance impact is negligible.]
- Estimated Impact: [Low. The changes are standard for user profile management and are optimized for performance.]
*/

-- 1. Create the profiles table
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  updated_at timestamp with time zone,
  full_name text,
  upi_id text,
  trust_score integer not null default 80,
  avatar_url text,

  primary key (id),
  unique(upi_id)
);

comment on table public.profiles is 'Stores public user profile information.';

alter table public.profiles enable row level security;

-- 2. Create RLS policies for profiles
create policy "Public profiles are viewable by everyone."
  on public.profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on public.profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update their own profile."
  on public.profiles for update
  using ( auth.uid() = id );

-- 3. Create a trigger to automatically create a profile for new users
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, upi_id)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    -- Generate a default unique UPI ID
    new.email
  );
  return new;
end;
$$;

-- Drop existing trigger if it exists
drop trigger if exists on_auth_user_created on auth.users;

-- Create the trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
