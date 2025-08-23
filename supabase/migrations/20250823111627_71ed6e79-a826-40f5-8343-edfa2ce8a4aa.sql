
-- 1) Roles: enum and user_roles table
create type public.app_role as enum ('admin', 'rep');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role public.app_role not null,
  unique (user_id, role),
  created_at timestamptz not null default now()
);

alter table public.user_roles enable row level security;

-- function to check roles; SECURITY DEFINER to avoid recursive RLS
create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = _user_id
      and role = _role
  )
$$;

-- Policies for user_roles
create policy "Users can read their own roles"
on public.user_roles
for select
to authenticated
using (auth.uid() = user_id);

create policy "Admins manage roles"
on public.user_roles
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));



-- 2) Profiles
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create trigger profiles_updated_at
before update on public.profiles
for each row execute function public.update_updated_at_column();

-- Policies: owners can manage their profile; admins can manage all
create policy "Owner can select own profile"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

create policy "Owner can insert their profile"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

create policy "Owner can update own profile"
on public.profiles
for update
to authenticated
using (auth.uid() = id);

create policy "Admins can select all profiles"
on public.profiles
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update all profiles"
on public.profiles
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'));



-- 3) Pending invites (to assign roles on first login)
create table public.pending_invites (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  role public.app_role not null,
  invited_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now()
);

alter table public.pending_invites enable row level security;

create policy "Admins manage pending_invites"
on public.pending_invites
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));



-- 4) On new user signup: create profile and assign role (from pending_invites, else 'rep')
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_role public.app_role := 'rep';
begin
  -- Ensure profile exists
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;

  -- Assign role from pending_invites if matched by email; else default 'rep'
  select pi.role into v_role
  from public.pending_invites pi
  where lower(pi.email) = lower(new.email)
  limit 1;

  if v_role is null then
    v_role := 'rep';
  end if;

  insert into public.user_roles (user_id, role)
  values (new.id, v_role)
  on conflict (user_id, role) do nothing;

  -- Cleanup invite
  delete from public.pending_invites where lower(email) = lower(new.email);

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();



-- 5) Prospecting logs
create table public.prospecting_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  contacted_at date not null default (now()::date),
  contact_name text,
  note text,
  added_to_jobber boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.prospecting_logs enable row level security;

create trigger prospecting_logs_updated_at
before update on public.prospecting_logs
for each row execute function public.update_updated_at_column();

-- RLS: reps manage own logs; admin manage all
create policy "Users manage their own prospecting logs (select)"
on public.prospecting_logs
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users manage their own prospecting logs (insert)"
on public.prospecting_logs
for insert
to authenticated
with check (auth.uid() = user_id);

create policy "Users manage their own prospecting logs (update)"
on public.prospecting_logs
for update
to authenticated
using (auth.uid() = user_id);

create policy "Users manage their own prospecting logs (delete)"
on public.prospecting_logs
for delete
to authenticated
using (auth.uid() = user_id);

create policy "Admins can read all prospecting logs"
on public.prospecting_logs
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update all prospecting logs"
on public.prospecting_logs
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can delete all prospecting logs"
on public.prospecting_logs
for delete
to authenticated
using (public.has_role(auth.uid(), 'admin'));



-- 6) Goals (one per user)
create table public.goals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  content text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

alter table public.goals enable row level security;

create trigger goals_updated_at
before update on public.goals
for each row execute function public.update_updated_at_column();

-- RLS: reps manage their own goal; admins see/manage all
create policy "Users read their own goals"
on public.goals
for select
to authenticated
using (auth.uid() = user_id);

create policy "Users manage their own goals (insert/update/delete)"
on public.goals
for all
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "Admins can read all goals"
on public.goals
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins can update all goals"
on public.goals
for update
to authenticated
using (public.has_role(auth.uid(), 'admin'));



-- 7) Sales records (Admin enters; reps read their own). Includes customer_name.
create table public.sales_records (
  id uuid primary key default gen_random_uuid(),
  rep_id uuid not null references public.profiles(id) on delete cascade,
  customer_name text not null,
  sold_at date not null default (now()::date),
  amount numeric(10,2) not null default 0,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.sales_records enable row level security;

create trigger sales_records_updated_at
before update on public.sales_records
for each row execute function public.update_updated_at_column();

-- RLS: reps can read their own; admins manage all
create policy "Reps can read their own sales"
on public.sales_records
for select
to authenticated
using (auth.uid() = rep_id);

create policy "Admins can read all sales"
on public.sales_records
for select
to authenticated
using (public.has_role(auth.uid(), 'admin'));

create policy "Admins manage sales"
on public.sales_records
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));



-- 8) Training items (records)
create table public.training_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  file_url text,      -- for PDFs/images stored in storage
  video_url text,     -- for external video links
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.training_items enable row level security;

create trigger training_items_updated_at
before update on public.training_items
for each row execute function public.update_updated_at_column();

-- RLS: all authenticated can read; admins manage
create policy "All authenticated can read training"
on public.training_items
for select
to authenticated
using (true);

create policy "Admins manage training items"
on public.training_items
for all
to authenticated
using (public.has_role(auth.uid(), 'admin'))
with check (public.has_role(auth.uid(), 'admin'));



-- 9) Storage for training materials (private)
insert into storage.buckets (id, name, public)
values ('training-materials', 'training-materials', false)
on conflict (id) do nothing;

-- Allow authenticated users to read files in training-materials
create policy "Authenticated can read training files"
on storage.objects
for select
to authenticated
using (bucket_id = 'training-materials');

-- Allow admins to manage files in training-materials
create policy "Admins manage training files"
on storage.objects
for all
to authenticated
using (bucket_id = 'training-materials' and public.has_role(auth.uid(), 'admin'))
with check (bucket_id = 'training-materials' and public.has_role(auth.uid(), 'admin'));



-- 10) Leaderboard RPCs (SECURITY DEFINER) + grants
create or replace function public.get_prospecting_leaderboard(week_start date, week_end date)
returns table (
  user_id uuid,
  full_name text,
  contacts integer
)
language sql
stable
security definer
set search_path = public
as $$
  select
    l.user_id,
    coalesce(p.full_name, 'Unnamed') as full_name,
    count(*)::int as contacts
  from public.prospecting_logs l
  left join public.profiles p on p.id = l.user_id
  where l.contacted_at between week_start and week_end
  group by l.user_id, p.full_name
  order by contacts desc, full_name asc
$$;

grant execute on function public.get_prospecting_leaderboard(date, date) to authenticated;

create or replace function public.get_sales_leaderboard(month_start date, month_end date)
returns table (
  user_id uuid,
  full_name text,
  deals integer,
  revenue numeric
)
language sql
stable
security definer
set search_path = public
as $$
  select
    s.rep_id as user_id,
    coalesce(p.full_name, 'Unnamed') as full_name,
    count(*)::int as deals,
    coalesce(sum(s.amount), 0)::numeric as revenue
  from public.sales_records s
  left join public.profiles p on p.id = s.rep_id
  where s.sold_at between month_start and month_end
  group by s.rep_id, p.full_name
  order by deals desc, revenue desc, full_name asc
$$;

grant execute on function public.get_sales_leaderboard(date, date) to authenticated;
