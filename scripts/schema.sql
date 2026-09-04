create extension if not exists pgcrypto;

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  role text not null default 'developer', -- 'owner' | 'developer'
  created_at timestamptz not null default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  body jsonb not null default '[]',
  cover_image text,
  status text not null default 'draft', -- 'draft' | 'published'
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  price numeric(12, 2),
  category text,
  image_urls text[] not null default '{}',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text not null, -- email or phone
  type text not null,     -- 'booking' | 'quote' | 'training'
  message text,
  status text not null default 'new', -- 'new' | 'contacted' | 'closed'
  created_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text not null,
  featured boolean not null default false, -- shows in homepage carousel
  active boolean not null default true,     -- shows in /work gallery
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_posts_status on posts(status);
create index if not exists idx_posts_slug on posts(slug);
create index if not exists idx_products_active on products(active);
create index if not exists idx_inquiries_status on inquiries(status);
create index if not exists idx_projects_active on projects(active);
create index if not exists idx_projects_featured on projects(featured);
