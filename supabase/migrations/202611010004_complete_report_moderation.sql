-- Complete testimony report moderation fields

ALTER TABLE public.testimony_reports
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'open'
  CHECK (status IN ('open', 'resolved'));

ALTER TABLE public.testimony_reports
  ADD COLUMN IF NOT EXISTS resolved_by uuid
  REFERENCES auth.users (id) ON DELETE SET NULL;

ALTER TABLE public.testimony_reports
  ADD COLUMN IF NOT EXISTS resolved_at timestamptz;

-- Allow moderators to read report-resolution details
GRANT SELECT (status, resolved_by, resolved_at)
  ON public.testimony_reports TO authenticated;

-- Allow moderators to resolve reports
GRANT UPDATE (status, resolved_by, resolved_at)
  ON public.testimony_reports TO authenticated;
-- End of supabase/migrations/202611010004_complete_report_moderation.sql