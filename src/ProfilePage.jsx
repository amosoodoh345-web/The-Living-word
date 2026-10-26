import { Icon } from './Icons';
import { SITE_NAVIGATION } from './siteNavigation';

const permissionLabels = {
  granted: 'Allowed',
  default: 'Not yet allowed',
  denied: 'Blocked in browser settings',
  unsupported: 'Not supported in this browser'
};

export default function ProfilePage({
  theme,
  onToggleTheme,
  isInstalled,
  onInstall,
  isOnline,
  reminders,
  notificationPermission,
  counts,
  onNavigate
}) {
  const enabledReminders = reminders.filter((reminder) => reminder.enabled).length;

  return (
    <main className="content-page profile-page">
      <section className="page-intro">
        <p className="eyebrow">Your space</p>
        <h2>Profile & settings</h2>
        <p>Your reflections, progress, and preferences are saved only on this device. Signing in is only needed for community testimonies.</p>
      </section>

      <section className="panel profile-section" aria-label="App settings">
        <div className="section-heading"><div><p className="mini-label">App</p><h3>Settings</h3></div><span className="subtle-label">{isOnline ? 'Online' : 'Offline'}</span></div>
        <div className="profile-row">
          <span>Appearance<small>{theme === 'dark' ? 'Dark theme' : 'Light theme'}</small></span>
          <button className="secondary-btn small" onClick={onToggleTheme}>Switch to {theme === 'dark' ? 'light' : 'dark'}</button>
        </div>
        <div className="profile-row">
          <span>Install app<small>{isInstalled ? 'Installed on this device' : 'Add it to your home screen'}</small></span>
          <button className="secondary-btn small" onClick={onInstall} disabled={isInstalled}>{isInstalled ? 'Installed' : 'Install'}</button>
        </div>
        <div className="profile-row">
          <span>Reminders<small>{enabledReminders} of {reminders.length} on · Notifications: {permissionLabels[notificationPermission] || permissionLabels.default}</small></span>
          <button className="secondary-btn small" onClick={() => onNavigate('reminders')}>Manage</button>
        </div>
      </section>

      <section className="panel profile-section" aria-label="Your content">
        <div className="section-heading"><div><p className="mini-label">Yours</p><h3>Your library</h3></div></div>
        <div className="profile-row">
          <span>Prayer journal<small>{counts.journal} saved {counts.journal === 1 ? 'page' : 'pages'}</small></span>
          <button className="secondary-btn small" onClick={() => onNavigate('journal')}>Open</button>
        </div>
        <div className="profile-row">
          <span>Saved verses & recent reads<small>{counts.favourites} saved {counts.favourites === 1 ? 'verse' : 'verses'}</small></span>
          <button className="secondary-btn small" onClick={() => onNavigate('saved')}>Open</button>
        </div>
        <div className="profile-row">
          <span>Spiritual growth<small>{counts.streak}-day streak · {counts.seminarComplete} of {counts.seminarTotal} seminar sessions</small></span>
          <button className="secondary-btn small" onClick={() => onNavigate('growth')}>Open</button>
        </div>
      </section>

      <section className="panel profile-section" aria-label="More pages">
        <div className="section-heading"><div><p className="mini-label">Also available</p><h3>More pages</h3></div></div>
        <div className="profile-links">
          {SITE_NAVIGATION.filter((item) => item.id !== 'home').map((item) => (
            <a key={item.id} href={item.href}>{item.label} <Icon name="arrow" size={16} /></a>
          ))}
        </div>
      </section>

      <section className="panel profile-section profile-premium" aria-label="Premium plans">
        <p className="mini-label">Coming later · optional</p>
        <h3>Optional premium study tools</h3>
        <p>Advanced courses and downloadable study materials may be offered in the future. Every feature in the app today remains free, and no payment system is active.</p>
      </section>

      <p className="local-data-note"><a href="./privacy.html">Privacy policy</a></p>
    </main>
  );
}
