-- =========================================================
-- CYBER MUSLIM COMMUNITY (CMC) — DATABASE SCHEMA & RLS RULES
-- Owner & Architect: MD RASEL HOSSEN
-- =========================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('admin', 'member', 'visitor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by authenticated users"
  ON public.profiles FOR SELECT USING (auth.role() = 'authenticated');

CREATE TABLE IF NOT EXISTS public.visitor_stats (
  id INT PRIMARY KEY DEFAULT 1,
  count BIGINT NOT NULL DEFAULT 1482,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

INSERT INTO public.visitor_stats (id, count)
VALUES (1, 1482)
ON CONFLICT (id) DO NOTHING;

ALTER TABLE public.visitor_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view visitor counter"
  ON public.visitor_stats FOR SELECT USING (true);

CREATE OR REPLACE FUNCTION public.increment_visitor_count()
RETURNS BIGINT LANGUAGE plpgsql SECURITY DEFINER AS $$
DECLARE new_count BIGINT;
BEGIN
  UPDATE public.visitor_stats SET count = count + 1, updated_at = NOW() WHERE id = 1 RETURNING count INTO new_count;
  RETURN new_count;
END;
$$;

CREATE TABLE IF NOT EXISTS public.announcements (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT DEFAULT 'Notice',
  author TEXT DEFAULT 'CMC Admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can view announcements" ON public.announcements FOR SELECT USING (true);

CREATE TABLE IF NOT EXISTS public.messages (
  id TEXT PRIMARY KEY,
  name TEXT DEFAULT 'Anonymous Member',
  contact TEXT DEFAULT 'None provided',
  message TEXT NOT NULL,
  status TEXT DEFAULT 'unread',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors can submit message" ON public.messages FOR INSERT WITH CHECK (true);

CREATE TABLE IF NOT EXISTS public.media (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL CHECK (file_type IN ('image', 'video', 'audio', 'document', 'apk')),
  file_size BIGINT NOT NULL,
  version TEXT,
  checksum TEXT,
  is_private BOOLEAN DEFAULT true,
  uploaded_by TEXT DEFAULT 'MD RASEL HOSSEN',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated members can view media" ON public.media FOR SELECT USING (auth.role() = 'authenticated');
