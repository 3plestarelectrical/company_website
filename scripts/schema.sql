create extension if not exists pgcrypto;

create table if not exists admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  role text not null default 'developer',
  created_at timestamptz not null default now()
);

create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  body jsonb not null default '[]',
  cover_image text,
  status text not null default 'draft',
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
  contact text not null,
  type text not null,
  message text,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_urls text[] not null default '{}',
  featured boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Migration for databases created before this change: projects used to have
-- a single `image_url` column. This safely converts existing rows to the
-- new `image_urls` array and drops the old column. No-ops on fresh installs
-- and is safe to re-run.
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_name = 'projects' and column_name = 'image_url'
  ) then
    update projects
      set image_urls = array[image_url]
      where image_url is not null and image_url <> '' and image_urls = '{}';
    alter table projects drop column image_url;
  end if;
end $$;

create index if not exists idx_posts_status on posts(status);
create index if not exists idx_posts_slug on posts(slug);
create index if not exists idx_products_active on products(active);
create index if not exists idx_inquiries_status on inquiries(status);
create index if not exists idx_projects_active on projects(active);
create index if not exists idx_projects_featured on projects(featured);