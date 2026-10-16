create table if not exists public.testimonies (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null check (char_length(btrim(title)) between 1 and 120),
  body text not null check (char_length(btrim(body)) between 1 and 5000),
  category text not null default 'testimony' check (category in ('testimony', 'praise_report')),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists testimonies_approved_created_at_idx
  on public.testimonies (created_at desc)
  where status = 'approved';

create index if not exists testimonies_owner_created_at_idx
  on public.testimonies (user_id, created_at desc);

alter table public.testimonies enable row level security;

revoke all on public.testimonies from anon, authenticated;
grant select (id, title, body, category, status, created_at)
  on public.testimonies to anon;
grant select (id, user_id, title, body, category, status, created_at)
  on public.testimonies to authenticated;
grant insert (user_id, title, body, category, status)
  on public.testimonies to authenticated;
grant update (title, body, category)
  on public.testimonies to authenticated;
grant delete on public.testimonies to authenticated;

create policy "Anyone can read approved testimonies"
  on public.testimonies for select
  to anon, authenticated
  using (status = 'approved');

create policy "Authors can read their own testimonies"
  on public.testimonies for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Authenticated users can submit pending testimonies"
  on public.testimonies for insert
  to authenticated
  with check (auth.uid() = user_id and status = 'pending');

create policy "Authors can edit their own pending testimonies"
  on public.testimonies for update
  to authenticated
  using (auth.uid() = user_id and status = 'pending')
  with check (auth.uid() = user_id and status = 'pending');

create policy "Authors can delete their own pending testimonies"
  on public.testimonies for delete
  to authenticated
  using (auth.uid() = user_id and status = 'pending');

create table if not exists public.testimony_reports (
  id uuid primary key default gen_random_uuid(),
  testimony_id uuid not null references public.testimonies (id) on delete cascade,
  reporter_id uuid not null references auth.users (id) on delete cascade,
  reason text not null check (char_length(btrim(reason)) between 1 and 500),
  created_at timestamptz not null default now(),
  unique (testimony_id, reporter_id)
);

alter table public.testimony_reports enable row level security;

revoke all on public.testimony_reports from anon, authenticated;
grant insert (testimony_id, reporter_id, reason)
  on public.testimony_reports to authenticated;
grant select (id, testimony_id, reporter_id, reason, created_at)
  on public.testimony_reports to authenticated;

create policy "Authenticated users can report approved testimonies"
  on public.testimony_reports for insert
  to authenticated
  with check (
    auth.uid() = reporter_id
    and exists (
      select 1
      from public.testimonies
      where id = testimony_id and status = 'approved'
    )
  );

create policy "Users can read their own testimony reports"
  on public.testimony_reports for select
  to authenticated
  using (auth.uid() = reporter_id);