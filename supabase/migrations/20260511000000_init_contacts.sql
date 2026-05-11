-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  initials TEXT NOT NULL,
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  email TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Lead', 'Cliente', 'Inativo')),
  last_seen TEXT NOT NULL DEFAULT 'Agora mesmo',
  color TEXT NOT NULL DEFAULT 'blue',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own contacts" 
ON contacts FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own contacts" 
ON contacts FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own contacts" 
ON contacts FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own contacts" 
ON contacts FOR DELETE 
USING (auth.uid() = user_id);
