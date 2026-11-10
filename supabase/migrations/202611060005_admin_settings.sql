create table if not exists public.admin_settings (
  id integer primary key default 1 check (id = 1),
  app_name text not null default 'LIFEOS'
    check (char_length(btrim(app_name)) between 1 and 120),
  moderation_enabled boolean not null default true,
  notify_new_testimonies boolean not null default true,
  notify_new_comments boolean not null default true,
  notify_new_reports boolean not null default true,
  updated_at timestamptz not null default now()
);

insert into public.admin_settings (id)
values (1)
on conflict (id) do nothing;

alter table public.admin_settings enable row level security;

revoke all on public.admin_settings from anon, authenticated;
grant select (
  id,
  app_name,
  moderation_enabled,
  notify_new_testimonies,
  notify_new_comments,
  notify_new_reports
) on public.admin_settings to authenticated;
grant update (
  app_name,
  moderation_enabled,
  notify_new_testimonies,
  notify_new_comments,
  notify_new_reports,
  updated_at
) on public.admin_settings to authenticated;

create policy "Moderators can read administrator settings"
  on public.admin_settings for select
  to authenticated
  using (public.is_moderator());

create policy "Moderators can update administrator settings"
  on public.admin_settings for update
  to authenticated
  using (public.is_moderator())
  with check (public.is_moderator());
