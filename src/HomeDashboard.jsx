import { useEffect, useState } from 'react';
import { loadChapterVerses } from './data/bibleLibrary';
import { DAILY_PRAYERS, DEVOTIONALS, SEMINAR_SESSIONS } from './data/lifeosContent';
import { todayIndex } from './LifeOSPages';
import { CrossLogo, Icon } from './Icons';
import { extractPassageText, getDailyScripture } from './lib/dailyScripture';
import { formatCountdown, getNextReminder } from './lib/reminders';
import { SITE_NAVIGATION } from './siteNavigation';

const DAY_MS = 86400000;

const MENU_PAGES = [
  { page: 'home', label: 'Home' },
  { page: 'bible', label: 'Bible Reading' },
  { page: 'seminar', label: 'Life in the Spirit Seminar' },
  { page: 'devotional', label: 'Daily Devotionals' },
  { page: 'prayer', label: 'Prayer, Rosary & Chaplet' },
  { page: 'encouragement', label: 'Spiritual Reflections' },
  { page: 'testimonies', label: 'Testimonies' },
  { page: 'ministries', label: 'Church & Ministries' }
];

const FEATURES = [
  { id: 'bible', icon: 'book', title: 'Bible Reading', text: 'Read Scripture in KJV, WEB or BBE and keep your place as you go.', actions: [{ label: 'Open the Bible', page: 'bible' }] },
  { id: 'seminar', icon: 'learn', title: 'Life in the Spirit Seminar', text: 'Seven guided sessions to open your heart to the Holy Spirit.', actions: [{ label: 'Start learning', page: 'seminar' }] },
  { id: 'devotional', icon: 'heart', title: 'Daily Devotionals', text: 'A short reflection and prayer to begin each day with God.', actions: [{ label: 'Read today’s devotional', page: 'devotional' }] },
  { id: 'rosary', icon: 'prayer', title: 'Rosary and Chaplet', text: 'Pray along with guided Rosary and Divine Mercy Chaplet sequences.', actions: [{ label: 'Rosary', page: 'rosary' }, { label: 'Chaplet', page: 'chaplet' }] },
  { id: 'reflections', icon: 'journal', title: 'Spiritual Reflections', text: 'Browse devotional reflections and write in your private prayer journal.', actions: [{ label: 'Find a reflection', page: 'encouragement' }, { label: 'Journal', page: 'journal' }] },
  { id: 'testimonies', icon: 'testimony', title: 'Testimonies', text: 'Record what God has done in your life and be encouraged by His faithfulness.', actions: [{ label: 'Share a testimony', page: 'testimonies' }] },
  { id: 'ministries', icon: 'home', title: 'Church and Ministries', text: 'Discover ministries, worship songs and ways to belong to the Church.', actions: [{ label: 'Ministries', page: 'ministries' }, { label: 'Worship songs', page: 'songs' }] }
];

const formatClock = (time) => {
  const [hours, minutes] = time.split(':').map(Number);
  return `${hours % 12 || 12}:${String(minutes).padStart(2, '0')} ${hours < 12 ? 'AM' : 'PM'}`;
};

const sessionTitle = (title) => title.replace(/\s*\(Charisms\)/, '');

function useNow(intervalMs) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), intervalMs);
    return () => window.clearInterval(timer);
  }, [intervalMs]);
  return now;
}

function useDailyVerse(scripture) {
  const [verse, setVerse] = useState({ status: 'loading', text: '' });

  useEffect(() => {
    let isCurrent = true;
    setVerse({ status: 'loading', text: '' });
    loadChapterVerses(scripture.book, scripture.chapter, 'kjv')
      .then(({ verses }) => {
        if (!isCurrent) return;
        const text = extractPassageText(verses, scripture);
        setVerse(text ? { status: 'ready', text } : { status: 'error', text: '' });
      })
      .catch(() => {
        if (isCurrent) setVerse({ status: 'error', text: '' });
      });
    return () => {
      isCurrent = false;
    };
  }, [scripture.label]);

  return verse;
}

const permissionNotes = {
  granted: 'Notifications are allowed. Alerts appear while the app is open and able to run.',
  default: 'Open reminder settings to allow notifications while the app is open.',
  denied: 'Notifications are blocked in your browser settings. In-app reminders still work.',
  unsupported: 'This browser does not support notifications. The schedule stays available in the app.'
};

export default function HomeDashboard({
  onNavigate,
  onOpenScripture,
  onOpenSession,
  reminders,
  notificationPermission,
  seminarProgress,
  growthSummary,
  journalCount,
  lastRead,
  onContinueReading,
  onOpenEncouragement
}) {
  const now = useNow(30000);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const closeOnEscape = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  const goTo = (page) => {
    setMenuOpen(false);
    onNavigate(page);
  };
  const scripture = getDailyScripture(now);
  const verse = useDailyVerse(scripture);

  const nextReminder = getNextReminder(reminders, now);
  const msUntilNext = nextReminder ? nextReminder.at - now : 0;
  const nextIsToday = nextReminder && nextReminder.at.toDateString() === now.toDateString();
  const nextIsSoon = nextReminder && msUntilNext <= 3600000;
  const bellHasDot = nextReminder && msUntilNext <= DAY_MS;

  const completedSessions = SEMINAR_SESSIONS.filter((session) => seminarProgress[session.id]).length;
  const nextSessionIndex = SEMINAR_SESSIONS.findIndex((session) => !seminarProgress[session.id]);
  const nextSession = nextSessionIndex >= 0 ? SEMINAR_SESSIONS[nextSessionIndex] : null;

  const devotional = DEVOTIONALS[todayIndex()];
  const prayer = DAILY_PRAYERS[todayIndex() % DAILY_PRAYERS.length];

  const shortcuts = [
    { page: 'bible', icon: 'book', title: 'Bible Reader', note: '73 books, 3 translations' },
    { page: 'journal', icon: 'journal', title: 'Prayer Journal', note: `${journalCount} saved ${journalCount === 1 ? 'page' : 'pages'}` },
    { page: 'songs', icon: 'music', title: 'Praise & Worship', note: 'Hymns and worship songs' },
    { page: 'testimonies', icon: 'testimony', title: 'Testimonies', note: 'Share what God has done' },
    { page: 'growth', icon: 'growth', title: 'Spiritual Growth', note: `${growthSummary.currentStreak}-day streak` }
  ];

  return (
    <main className="dash">
      <header className="dash-header">
        <div className="dash-brand">
          <CrossLogo />
          <div>
            <p className="dash-app-name">LIFE IN THE SPIRIT</p>
            <h2 className="dash-greeting">Welcome, Child of God.</h2>
          </div>
        </div>
        <div className="dash-header-actions">
          <button
            className="dash-icon-button dash-menu-toggle"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="dash-menu"
          >
            <span className={menuOpen ? 'dash-burger is-open' : 'dash-burger'} aria-hidden="true"><span /><span /><span /></span>
          </button>
          <button
            className="dash-icon-button"
            onClick={() => onNavigate('reminders')}
            aria-label={bellHasDot ? 'Reminders: one is coming up within 24 hours' : 'Reminders'}
          >
            <Icon name="bell" />
            {bellHasDot && <span className="dash-bell-dot" aria-hidden="true" />}
          </button>
          <button className="dash-icon-button dash-avatar" onClick={() => onNavigate('profile')} aria-label="Profile and settings">
            <Icon name="user" />
          </button>
        </div>
      </header>

      {menuOpen && (
        <>
          <div className="dash-menu-backdrop" onClick={() => setMenuOpen(false)} aria-hidden="true" />
          <nav className="dash-menu" id="dash-menu" aria-label="Explore LIFEOS">
            <p className="dash-menu-heading">In the app</p>
            <ul>
              {MENU_PAGES.map((item) => (
                <li key={item.page}><button onClick={() => goTo(item.page)}>{item.label}</button></li>
              ))}
            </ul>
            <p className="dash-menu-heading">Full pages</p>
            <ul>
              {SITE_NAVIGATION.filter((item) => item.id !== 'home').map((item) => (
                <li key={item.id}><a href={item.href}>{item.label}</a></li>
              ))}
            </ul>
          </nav>
        </>
      )}

      <section className="dash-hero" aria-labelledby="dash-hero-title">
        <div className="dash-hero-glow" aria-hidden="true" />
        <p className="dash-hero-eyebrow">Life in the Spirit</p>
        <h1 id="dash-hero-title">LIFEOS</h1>
        <p className="dash-hero-lead">“Come to me, all you who are weary and burdened, and I will give you rest.” Walk closer to God each day through Scripture, prayer and learning.</p>
        <p className="dash-hero-ref">Matthew 11:28</p>
        <div className="dash-actions">
          <button className="dash-button dash-button-gold" onClick={() => onNavigate('bible')}>Read the Bible <Icon name="arrow" size={18} /></button>
          <button className="dash-button dash-button-ghost" onClick={() => (nextSession ? onOpenSession(nextSession.id) : onNavigate('seminar'))}>
            {completedSessions > 0 && nextSession ? 'Continue the Seminar' : 'Begin the Seminar'}
          </button>
          <button className="dash-button dash-button-ghost" onClick={() => onNavigate('devotional')}>Daily Devotional</button>
        </div>
      </section>

      <section className="dash-features" aria-labelledby="dash-features-title">
        <div className="dash-features-head">
          <p className="dash-kicker">Everything in one place</p>
          <h2 id="dash-features-title">Grow closer to God</h2>
        </div>
        <div className="dash-feature-grid">
          {FEATURES.map((feature) => (
            <article className="dash-feature" key={feature.id}>
              <span className="dash-feature-icon"><Icon name={feature.icon} /></span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
              <div className="dash-feature-actions">
                {feature.actions.map((action) => (
                  <button key={action.page} onClick={() => onNavigate(action.page)}>{action.label} <Icon name="arrow" size={16} /></button>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="dash-scripture" aria-labelledby="dash-scripture-title">
        <span className="dash-scripture-cross" aria-hidden="true">✝</span>
        <p className="dash-kicker" id="dash-scripture-title">
          Verse of the day · {new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(now)}
        </p>
        {verse.status === 'loading' && <div className="dash-skeleton" aria-busy="true" aria-label="Loading today's verse"><span /><span /><span /></div>}
        {verse.status === 'ready' && <blockquote className="dash-verse">“{verse.text}”</blockquote>}
        {verse.status === 'error' && (
          <p className="dash-verse-fallback">Today’s verse text could not be loaded. Open the Bible to read {scripture.label} (an internet connection may be needed the first time).</p>
        )}
        <p className="dash-reference">{scripture.label} <span>· KJV</span></p>
        <div className="dash-actions">
          <button className="dash-button dash-button-gold" onClick={() => onOpenScripture(scripture.label)}>Read full passage <Icon name="arrow" size={18} /></button>
          {lastRead && <button className="dash-button dash-button-ghost" onClick={onContinueReading}>Continue {lastRead.reference}</button>}
        </div>
      </section>

      <section className="dash-card dash-reminder" aria-labelledby="dash-reminder-title">
        <div className="dash-card-head">
          <span className="dash-card-icon"><Icon name="clock" /></span>
          <div>
            <p className="dash-kicker">Prayer & Bible Study</p>
            <h3 id="dash-reminder-title">Weekly reminders</h3>
          </div>
        </div>
        {nextReminder ? (
          <div className={nextIsSoon ? 'dash-next dash-next-soon' : 'dash-next'}>
            <p className="dash-next-label">Next up · {nextIsToday ? 'Today' : new Intl.DateTimeFormat(undefined, { weekday: 'long' }).format(nextReminder.at)} at {formatClock(nextReminder.reminder.time)}</p>
            <p className="dash-next-message">{nextReminder.reminder.message}</p>
            <p className="dash-countdown" role="timer" aria-live="off">{nextIsSoon ? 'Starting in' : 'In'} <strong>{formatCountdown(msUntilNext)}</strong></p>
          </div>
        ) : (
          <div className="dash-next"><p className="dash-next-message">All reminders are switched off.</p><p className="dash-next-label">Turn one on whenever you are ready.</p></div>
        )}
        <ul className="dash-schedule" aria-label="Weekly schedule">
          {reminders.map((reminder) => (
            <li key={reminder.id} className={reminder.enabled ? undefined : 'is-off'}>
              <span>{reminder.dayName} · {formatClock(reminder.time)}</span>
              <span>{reminder.enabled ? 'On' : 'Off'}</span>
            </li>
          ))}
        </ul>
        <p className="dash-fineprint">
          {permissionNotes[notificationPermission] || permissionNotes.default}{' '}
          Reminders when the app is closed are not active yet; they need push notifications or the planned Android app, which can schedule them on the phone itself.
        </p>
        <button className="dash-button dash-button-outline" onClick={() => onNavigate('reminders')}>Manage reminder settings</button>
      </section>

      <section className="dash-seminar" aria-labelledby="dash-seminar-title">
        <div className="dash-seminar-banner">
          <div>
            <p className="dash-kicker">Seven sessions</p>
            <h3 id="dash-seminar-title">Life in the Spirit Seminar</h3>
            <p className="dash-seminar-progress-text">{completedSessions} of {SEMINAR_SESSIONS.length} sessions complete</p>
            <div className="dash-progress" role="progressbar" aria-valuemin="0" aria-valuemax={SEMINAR_SESSIONS.length} aria-valuenow={completedSessions} aria-label="Seminar progress">
              <span style={{ width: `${(completedSessions / SEMINAR_SESSIONS.length) * 100}%` }} />
            </div>
          </div>
          {nextSession ? (
            <button className="dash-button dash-button-gold" onClick={() => onOpenSession(nextSession.id)}>
              {completedSessions === 0 ? 'Begin' : 'Continue'} Session {nextSessionIndex + 1} <Icon name="arrow" size={18} />
            </button>
          ) : (
            <button className="dash-button dash-button-gold" onClick={() => onNavigate('seminar')}>Review the seminar</button>
          )}
        </div>
        <ol className="dash-sessions">
          {SEMINAR_SESSIONS.map((session, index) => (
            <li key={session.id}>
              <button
                className={seminarProgress[session.id] ? 'dash-session is-complete' : 'dash-session'}
                onClick={() => onOpenSession(session.id)}
                aria-label={`Session ${index + 1}: ${sessionTitle(session.title)}${seminarProgress[session.id] ? ', completed' : ''}`}
              >
                <span className="dash-session-number">{seminarProgress[session.id] ? <Icon name="check" size={18} /> : index + 1}</span>
                <span className="dash-session-title">{sessionTitle(session.title)}</span>
                <span className="dash-session-scripture">{session.scripture}</span>
              </button>
            </li>
          ))}
        </ol>
        <p className="dash-art-credit">
          Banner art: <a href="https://commons.wikimedia.org/wiki/File:Paul_preaching_to_Athens_(SM_5510z).png" target="_blank" rel="noreferrer">St Paul preaching at Athens · Städel Museum · Public Domain</a>
        </p>
      </section>

      <section className="dash-card dash-devotional" aria-labelledby="dash-devotional-title">
        <div className="dash-card-head">
          <span className="dash-card-icon"><Icon name="heart" /></span>
          <div>
            <p className="dash-kicker">Daily devotional</p>
            <h3 id="dash-devotional-title">{devotional.title}</h3>
          </div>
        </div>
        <p className="dash-scripture-ref">{devotional.scripture}</p>
        <p className="dash-devotional-text">{devotional.reflection}</p>
        <div className="dash-prayer">
          <p className="dash-kicker">{prayer.title}</p>
          <p>{prayer.text}</p>
        </div>
        <div className="dash-actions">
          <button className="dash-button dash-button-navy" onClick={() => onNavigate('devotional')}>Read full devotional <Icon name="arrow" size={18} /></button>
          <button className="dash-button dash-button-outline" onClick={() => onOpenScripture(devotional.scripture)}>Open {devotional.scripture}</button>
        </div>
      </section>

      <section aria-labelledby="dash-growth-title">
        <h3 className="dash-section-title" id="dash-growth-title">Grow in the Spirit</h3>
        <div className="dash-shortcuts">
          {shortcuts.map((shortcut) => (
            <button className="dash-shortcut" key={shortcut.page} onClick={() => onNavigate(shortcut.page)}>
              <span className="dash-shortcut-icon"><Icon name={shortcut.icon} /></span>
              <span className="dash-shortcut-title">{shortcut.title}</span>
              <span className="dash-shortcut-note">{shortcut.note}</span>
            </button>
          ))}
        </div>
      </section>

      <section className="dash-card dash-encourage" aria-label="Encouragement">
        <div>
          <p className="dash-kicker">1,000 devotional reflections</p>
          <h3>Find a steady word for the moment you are in.</h3>
        </div>
        <button className="dash-button dash-button-navy" onClick={onOpenEncouragement}>Explore encouragement <Icon name="arrow" size={18} /></button>
      </section>

      <section className="dash-premium" aria-labelledby="dash-premium-title">
        <p className="dash-kicker">Coming later · optional</p>
        <h3 id="dash-premium-title">Deeper study, when you want it</h3>
        <p>Optional courses and downloads may be added in the future. Everything in the app today stays free, and nothing here is available to buy yet.</p>
        <ul className="dash-premium-list">
          <li><Icon name="learn" /><span><strong>Bible study courses</strong>Structured, in-depth study series</span></li>
          <li><Icon name="download" /><span><strong>Study guides & workbooks</strong>Downloadable materials for personal or group study</span></li>
        </ul>
        <span className="dash-premium-tag"><Icon name="lock" size={14} /> Not available yet</span>
      </section>
    </main>
  );
}
