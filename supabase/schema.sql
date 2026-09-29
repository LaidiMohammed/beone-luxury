-- BEONE LUXURY — schéma Supabase (à activer plus tard, front seul pour l'instant)
create table if not exists products (
  id text primary key,
  name text not null,
  price text not null,
  collection text not null,
  image text not null,
  tag text,
  description text
);

create table if not exists shops (
  id text primary key,
  name text not null,
  address text not null,
  hours text,
  phone text,
  image text,
  map_url text,
  map_query text
);

create table if not exists site_settings (
  key text primary key,
  value text
);
