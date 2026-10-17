import { GROWTH_PRACTICES, getGrowthSummary, localDateKey } from './lib/spiritualGrowth';

export default function SpiritualGrowthPage({ activity, onToggle }) {
  const today = new Date();
  const summary = getGrowthSummary(activity, today);
  const todayKey = localDateKey(today);
  const completedToday = Array.isArray(activity?.[todayKey]) ? activity[todayKey] : [];

  return (
    <main className="content-page growth-page">
      <section className="page-intro">
        <p className="eyebrow">Small steps, faithfully noticed</p>
        <h2>Your spiritual rhythm</h2>
        <p>Mark the practices you made time for today. This is a personal reflection aid, not a measure of your faith.</p>
      </section>

      <section className="growth-summary-grid" aria-label="Your growth summary">
        <article className="panel growth-summary-card"><strong>{summary.currentStreak}</strong><span>day streak</span></article>
        <article className="panel growth-summary-card"><strong>{summary.activeDaysThisWeek}</strong><span>active days this week</span></article>
        <article className="panel growth-summary-card"><strong>{summary.totalPractices}</strong><span>practices recorded</span></article>
      </section>

      <section className="panel growth-checklist">
        <div className="section-heading">
          <div><p className="mini-label">Today</p><h3>{today.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</h3></div>
          <span className="subtle-label">{summary.todayCompleted} of {GROWTH_PRACTICES.length} marked</span>
        </div>
        <div className="growth-practices">
          {GROWTH_PRACTICES.map((practice) => (
            <label className="growth-practice" key={practice.id}>
              <input
                type="checkbox"
                checked={completedToday.includes(practice.id)}
                onChange={() => onToggle(practice.id)}
              />
              <span>{practice.label}</span>
            </label>
          ))}
        </div>
        <p className="growth-privacy-note">Your check-ins are stored only in this browser on this device. They are not synced or shared.</p>
      </section>
    </main>
  );
}
