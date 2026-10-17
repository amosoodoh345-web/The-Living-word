const DAY_LABELS = {
  'monday-prayer': 'Monday · Prayer meeting',
  'wednesday-bible-study': 'Wednesday · Bible study',
  'saturday-prayer': 'Saturday · Prayer meeting'
};

export default function RemindersPage({ reminders, onChange, permission, onRequestPermission }) {
  const updateReminder = (id, changes) => {
    onChange(reminders.map((reminder) => (
      reminder.id === id ? { ...reminder, ...changes } : reminder
    )));
  };

  return (
    <main className="content-page reminders-page">
      <section className="page-intro">
        <p className="eyebrow">A gentle nudge for your week</p>
        <h2>Prayer & study reminders</h2>
        <p>Your schedule is saved on this device and uses its local time. Change a time or switch off a reminder whenever you like.</p>
      </section>

      <section className="panel reminder-settings" aria-label="Weekly reminder schedule">
        <div className="section-heading">
          <div><p className="mini-label">Weekly schedule</p><h3>Your reminders</h3></div>
          <span className="subtle-label">Local time</span>
        </div>
        <div className="reminder-list">
          {reminders.map((reminder) => (
            <div className="reminder-row" key={reminder.id}>
              <label className="reminder-enable">
                <input
                  type="checkbox"
                  checked={reminder.enabled}
                  onChange={(event) => updateReminder(reminder.id, { enabled: event.target.checked })}
                />
                <span>{DAY_LABELS[reminder.id] || reminder.dayName}</span>
              </label>
              <label className="reminder-time">
                <span className="visually-hidden">Time for {DAY_LABELS[reminder.id]}</span>
                <input
                  type="time"
                  value={reminder.time}
                  disabled={!reminder.enabled}
                  onChange={(event) => updateReminder(reminder.id, { time: event.target.value })}
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="panel reminder-notification-panel">
        <p className="mini-label">Browser notifications</p>
        <h3>{permission === 'granted' ? 'Notifications are allowed' : 'Choose whether to allow notifications'}</h3>
        <p>
          {permission === 'unsupported'
            ? 'This browser does not support notifications. The schedule remains available in the app.'
            : permission === 'denied'
              ? 'Notifications are blocked in browser settings. You can still use the in-app schedule.'
              : permission === 'granted'
                ? 'The app can show a browser notification when it is open and able to run.'
                : 'Allow notifications to receive a browser alert while the app is open and able to run.'}
        </p>
        {permission !== 'granted' && permission !== 'unsupported' && permission !== 'denied' && (
          <button className="primary-btn small" onClick={onRequestPermission}>Allow browser notifications</button>
        )}
        <p className="reminder-limit-note">
          Browser timers may be paused when a tab is in the background, and reminders cannot be delivered after the website is closed.
          Reliable closed-app web reminders require a server push service. A future Android app can use Capacitor local notifications,
          scheduled by Android itself.
        </p>
      </section>
    </main>
  );
}
