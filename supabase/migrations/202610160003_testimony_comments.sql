create table if not exists public.testimony_comments (
  id uuid primary key default gen_random_uuid(),
  testimony_id uuid not null references public.testimonies (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  body text not null check (char_length(btrim(body)) between 1 and 2000),
  status text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists testimony_comments_public_thread_idx
  on public.testimony_comments (testimony_id, created_at)
  where status = 'approved';

create index if not exists testimony_comments_owner_idx
  on public.testimony_comments (user_id, created_at desc);

alter table public.testimony_comments enable row level security;
revoke all on public.testimony_comments from anon, authenticated;

grant select (id, testimony_id, body, status, created_at)
  on public.testimony_comments to anon;
grant select (id, testimony_id, user_id, body, status, created_at)
  on public.testimony_comments to authenticated;
grant insert (testimony_id, user_id, body, status)
  on public.testimony_comments to authenticated;
grant update (body) on public.testimony_comments to authenticated;
grant update (status) on public.testimony_comments to authenticated;
grant delete on public.testimony_comments to authenticated;

create policy "Anyone can read approved comments on approved testimonies"
  on public.testimony_comments for select
  to anon, authenticated
  using (
    status = 'approved'
    and exists (
      select 1
      from public.testimonies
      where id = testimony_id and status = 'approved'
    )
  );

create policy "Authors can read their own comments"
  on public.testimony_comments for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Moderators can read all comments"
  on public.testimony_comments for select
  to authenticated
  using (public.is_moderator());

create policy "Authenticated users can submit pending comments"
  on public.testimony_comments for insert
  to authenticated
  with check (
    auth.uid() = user_id
    and status = 'pending'
    and exists (
      select 1
      from public.testimonies
      where id = testimony_id and status = 'approved'
    )
  );

create policy "Authors can edit their own pending comments"
  on public.testimony_comments for update
  to authenticated
  using (auth.uid() = user_id and status = 'pending')
  with check (auth.uid() = user_id and status = 'pending');

create policy "Authors can delete their own pending comments"
  on public.testimony_comments for delete
  to authenticated
  using (auth.uid() = user_id and status = 'pending');

create policy "Moderators can change comment status"
  on public.testimony_comments for update
  to authenticated
  using (public.is_moderator())
  with check (public.is_moderator());

create policy "Moderators can remove comments"
  on public.testimony_comments for delete
  to authenticated
  using (public.is_moderator());
