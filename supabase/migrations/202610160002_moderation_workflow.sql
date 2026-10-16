create table if not exists public.moderators (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.moderators enable row level security;
revoke all on public.moderators from anon, authenticated;

create or replace function public.is_moderator()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.moderators
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_moderator() from public, anon;
grant execute on function public.is_moderator() to authenticated;

grant update (status) on public.testimonies to authenticated;

create policy "Moderators can review every testimony"
  on public.testimonies for select
  to authenticated
  using (public.is_moderator());

create policy "Moderators can change testimony status"
  on public.testimonies for update
  to authenticated
  using (public.is_moderator())
  with check (public.is_moderator());

create policy "Moderators can remove testimonies"
  on public.testimonies for delete
  to authenticated
  using (public.is_moderator());

alter table public.testimony_reports
  add column if not exists status text not null default 'open'
  check (status in ('open', 'resolved'));

alter table public.testimony_reports
  add column if not exists resolved_by uuid references auth.users (id) on delete set null;

alter table public.testimony_reports
  add column if not exists resolved_at timestamptz;

grant update (status, resolved_by, resolved_at)
  on public.testimony_reports to authenticated;

create policy "Moderators can review all testimony reports"
  on public.testimony_reports for select
  to authenticated
  using (public.is_moderator());

create policy "Moderators can resolve testimony reports"
  on public.testimony_reports for update
  to authenticated
  using (public.is_moderator())
  with check (public.is_moderator());
