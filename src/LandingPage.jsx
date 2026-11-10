import { useEffect, useRef, useState } from 'react';
import { CrossLogo, Icon } from './Icons';
import { PUBLIC_PAGES } from './data/publicNavigation';
import { DEVOTIONALS } from './data/lifeosContent';
import { todayIndex } from './LifeOSPages';
import { loadChapterVerses } from './data/bibleLibrary';
import { extractPassageText, getDailyScripture } from './lib/dailyScripture';
import { isSupabaseConfigured, supabase } from './lib/supabase';
import './LandingPage.css';
import './LandingPremium.css';

const NAV_LINKS = [
  ['home', 'Home'], ['bible', 'Bible'], ['devotional', 'Devotionals'],
  ['prayer', 'Prayer'], ['ministries', 'Ministries'], ['testimonies', 'Community']
];

const FAITH_CARDS = [
  ['bible', 'book', 'Holy Bible', 'Discover the living Word, one chapter at a time.'],
  ['devotional', 'heart', 'Daily Devotionals', 'Make space for a moment of reflection.'],
  ['rosary', 'prayer', 'The Holy Rosary', 'Meditate on the mysteries of Christ.'],
  ['novena', 'prayer', 'Novena', 'Nine days of prayer and attentive faith.'],
  ['chaplet', 'prayer', 'Divine Mercy Chaplet', 'A guided journey in prayer and mercy.'],
  ['prayer', 'heart', 'Prayer', 'Bring your heart to God in every season.'],
  ['growth', 'growth', 'Spiritual Growth', 'Nurture a faithful rhythm for each day.'],
  ['seminar', 'learn', 'Life in the Spirit', 'Explore seven sessions of formation.']
];

export default function LandingPage({ onNavigate, onOpenScripture, session }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutPending, setAboutPending] = useState(false);
  const [verse, setVerse] = useState({ status: 'loading', text: '' });
  const [stories, setStories] = useState({ status: isSupabaseConfigured ? 'loading' : 'unavailable', items: [] });
  const menuButtonRef = useRef(null);
  const drawerRef = useRef(null);
  const devotional = DEVOTIONALS[todayIndex()];
  const scripture = getDailyScripture();

  useEffect(() => {
    let active = true;
    setVerse({ status: 'loading', text: '' });
    loadChapterVerses(scripture.book, scripture.chapter, 'kjv').then(({ verses }) => {
      if (!active) return;
      const text = extractPassageText(verses, scripture);
      setVerse(text ? { status: 'ready', text } : { status: 'error', text: '' });
    }).catch(() => {
      if (active) setVerse({ status: 'error', text: '' });
    });
    return () => { active = false; };
  }, [scripture.label]);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;
    let active = true;
    async function loadStories() {
      try {
        const { data, error } = await supabase.from('testimonies')
          .select('id, title, body, category')
          .eq('status', 'approved')
          .order('created_at', { ascending: false })
          .limit(3);
        if (error) throw error;
        if (active) setStories({ status: 'ready', items: data });
      } catch (error) {
        console.error('Could not load approved community stories:', error);
        if (active) setStories({ status: 'error', items: [] });
      }
    }
    loadStories();
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.body.style.overflow = 'hidden';
    drawerRef.current?.querySelector('a, button')?.focus();
    window.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', closeOnEscape);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!aboutPending || menuOpen) return;
    const aboutSection = document.getElementById('about-lifeos');
    if (aboutSection) {
      const root = document.scrollingElement;
      const scrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = 'auto';
      root.scrollTop = aboutSection.getBoundingClientRect().top + root.scrollTop;
      document.documentElement.style.scrollBehavior = scrollBehavior;
    }
    setAboutPending(false);
  }, [aboutPending, menuOpen]);

  const navigate = (page) => {
    setMenuOpen(false);
    onNavigate(page);
  };

  const openAbout = () => {
    setAboutPending(true);
    setMenuOpen(false);
  };

  return (
    <div className="lifeos-landing">
      <header className="landing-header">
        <button className="landing-brand" type="button" onClick={() => navigate('home')} aria-label="Enter LIFEOS home">
          <CrossLogo size={46} />
          <span>
            <strong>LIFEOS</strong>
            <span className="landing-brand-kicker">THE LIVING WORD</span>
          </span>
        </button>
        <nav className="landing-desktop-nav" aria-label="Main navigation">
          {NAV_LINKS.map(([page, label]) => page === 'prayer' ? (
            <div className="landing-nav-group" key={page}>
              <button type="button" onClick={() => navigate(page)}>{label}</button>
              <details className="landing-nav-dropdown">
                <summary aria-label="More prayer resources">⌄</summary>
                <div>
                  {[['rosary', 'Rosary'], ['novena', 'Novena'], ['chaplet', 'Chaplet']].map(([destination, text]) => (
                    <button type="button" key={destination} onClick={() => navigate(destination)}>{text}</button>
                  ))}
                </div>
              </details>
            </div>
          ) : <button type="button" key={page} className={page === 'home' ? 'landing-nav-active' : undefined} onClick={() => navigate(page)}>{label}</button>)}
          <button type="button" onClick={openAbout}>About</button>
        </nav>
        <div className="landing-account-actions">
          {session ? (
            <button type="button" className="landing-nav-signin" onClick={() => navigate('profile')}>My account</button>
          ) : (
            <>
              <button type="button" className="landing-nav-signin" onClick={() => navigate('signin')}>Sign in</button>
              <button type="button" className="landing-nav-create" onClick={() => navigate('signup')}>Create account</button>
            </>
          )}
        </div>
        <button
          ref={menuButtonRef}
          className="landing-menu-button"
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="landing-navigation-drawer"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
      </header>

      {menuOpen && (
        <>
          <button className="landing-menu-scrim" type="button" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)} />
          <nav
            ref={drawerRef}
            className="landing-drawer"
            id="landing-navigation-drawer"
            aria-label="LIFEOS navigation"
            role="dialog"
            aria-modal="true"
          >
            <div className="landing-drawer-heading">
              <span className="landing-brand-kicker">The Living Word</span>
              <button type="button" className="landing-drawer-close" aria-label="Close navigation menu" onClick={() => setMenuOpen(false)}>×</button>
            </div>
            <a className="landing-drawer-enter" href="/index.html#/home">Enter LIFEOS <Icon name="arrow" size={18} /></a>
            {session ? <button className="landing-drawer-link" type="button" onClick={() => navigate('profile')}>My account <Icon name="arrow" size={18} /></button> : (
              <>
                <button className="landing-drawer-link" type="button" onClick={() => navigate('signin')}>Sign in <Icon name="arrow" size={18} /></button>
                <button className="landing-drawer-link" type="button" onClick={() => navigate('signup')}>Create account <Icon name="arrow" size={18} /></button>
              </>
            )}
            {PUBLIC_PAGES.map(({ page, label }) => (
              <button className="landing-drawer-link" type="button" key={page} onClick={() => navigate(page)}>
                {label} <Icon name="arrow" size={18} />
              </button>
            ))}
            <button className="landing-drawer-link" type="button" onClick={openAbout}>About LIFEOS <Icon name="arrow" size={18} /></button>
          </nav>
        </>
      )}

      <main>
        <section className="landing-hero" aria-labelledby="landing-title">
          <div className="landing-hero-image" role="img" aria-label="Sunrise over a church, an open Bible and a cross draped in red." />
          <div className="landing-hero-content">
            <h1 id="landing-title">Grow in Faith.<br /><em>Live in Christ.</em></h1>
            <p className="landing-hero-intro">Discover God’s Word, deepen your prayer life, grow spiritually and connect with a community united by faith.</p>
            <div className="landing-actions">
              <button className="landing-primary-action" type="button" onClick={() => navigate('home')}>Explore LIFEOS <Icon name="arrow" size={19} /></button>
              <button className="landing-secondary-action" type="button" onClick={() => navigate('bible')}>Read the Bible</button>
            </div>
          </div>
        </section>

        <section className="landing-scripture" aria-labelledby="landing-scripture-title">
          <div className="landing-scripture-ornament" aria-hidden="true">✦</div>
          <div className="landing-scripture-copy">
            <p className="landing-section-kicker">A MOMENT IN THE WORD</p>
            <h2 id="landing-scripture-title">Scripture for today</h2>
            {verse.status === 'loading' && <p className="landing-verse-status" role="status">Loading today’s Scripture…</p>}
            {verse.status === 'error' && <p className="landing-verse-status" role="status">Today’s passage is unavailable. Open the Bible to explore Scripture.</p>}
            {verse.status === 'ready' && <blockquote>“{verse.text}”</blockquote>}
            <p className="landing-scripture-reference">{scripture.label} · KJV</p>
            <button className="landing-text-link" type="button" onClick={() => onOpenScripture(scripture.label)}>Explore this passage <Icon name="arrow" size={17} /></button>
          </div>
          <div className="landing-scripture-symbol" aria-hidden="true"><span>✝</span><Icon name="book" size={100} /></div>
        </section>

        <section className="landing-explore" aria-labelledby="landing-explore-title">
          <div className="landing-section-title">
            <p className="landing-section-kicker">A JOURNEY OF FAITH</p>
            <h2 id="landing-explore-title">Explore Your Faith</h2>
            <p>Meaningful resources to help you draw nearer to God, wherever you are.</p>
          </div>
          <div className="landing-card-grid">
            {FAITH_CARDS.map(([page, icon, title, description], index) => (
              <button className="landing-faith-card" key={page} type="button" onClick={() => navigate(page)}>
                <span className="landing-card-number">{String(index + 1).padStart(2, '0')}</span>
                <span className="landing-card-icon"><Icon name={icon} size={25} /></span>
                <strong>{title}</strong><span>{description}</span>
                <span className="landing-card-link">Explore <Icon name="arrow" size={15} /></span>
              </button>
            ))}
          </div>
        </section>

        <section className="landing-growth" id="about-lifeos">
          <div className="landing-growth-art" aria-hidden="true">
            <svg viewBox="0 0 160 110" className="landing-dove">
              <path d="M80 91c-4-15-17-20-32-26C30 58 16 42 13 25c15 12 30 17 45 14C46 29 39 17 38 6c15 14 29 20 42 23C93 26 107 20 122 6c-1 11-8 23-20 33 15 3 30-2 45-14-3 17-17 33-35 40-15 6-28 11-32 26Z" />
              <path d="M69 53c3-10 7-15 11-15s8 5 11 15l-11 38-11-38Z" />
            </svg>
            <small>FAITH · HOPE · LOVE</small>
          </div>
          <div className="landing-growth-copy">
            <p className="landing-section-kicker">GROWING IN THE SPIRIT</p>
            <h2>Life in the Spirit</h2>
            <p>Discover the Life in the Spirit seminar and spiritual resources to accompany you in prayer, faith and Christian community.</p>
            <p className="landing-devotional"><strong>Today’s reflection · {devotional.title}</strong><br />{devotional.reflection}</p>
            <div className="landing-growth-actions">
              <button className="landing-primary-action" type="button" onClick={() => navigate('seminar')}>Learn More <Icon name="arrow" size={17} /></button>
              <button className="landing-text-link" type="button" onClick={() => navigate('devotional')}>Read today’s devotional <Icon name="arrow" size={17} /></button>
            </div>
          </div>
        </section>

        <section className="landing-community">
          <p className="landing-section-kicker">TOGETHER IN FAITH</p>
          <h2>Stories of Faith</h2>
          <p>Discover stories of faith shared by the community. Everyone is welcome to read approved testimonies; sign in when you’re ready to share yours.</p>
          {stories.status === 'loading' && <p role="status">Loading community stories…</p>}
          {stories.status === 'unavailable' && <p role="status">Community stories are not configured yet.</p>}
          {stories.status === 'error' && <p role="alert">Community stories are unavailable right now. Please try again later.</p>}
          {stories.status === 'ready' && stories.items.length === 0 && <p>No approved stories have been published yet.</p>}
          {stories.status === 'ready' && stories.items.length > 0 && (
            <div className="landing-stories">
              {stories.items.map((story) => (
                <article className="landing-story" key={story.id}>
                  <p className="landing-section-kicker">{story.category === 'praise_report' ? 'PRAISE REPORT' : 'TESTIMONY'}</p>
                  <h3>{story.title}</h3>
                  <p>{story.body}</p>
                </article>
              ))}
            </div>
          )}
          <button className="landing-secondary-action" type="button" onClick={() => navigate('testimonies')}>Read Testimonies <Icon name="arrow" size={17} /></button>
          <a className="landing-community-credit" href="https://commons.wikimedia.org/wiki/File:Paul_preaching_to_Athens_(SM_5510z).png" target="_blank" rel="noreferrer">St Paul preaching at Athens · Städel Museum · Public domain</a>
        </section>

        <section className="landing-invitation">
          <span aria-hidden="true">✝</span>
          <p className="landing-section-kicker">YOUR JOURNEY STARTS HERE</p>
          <h2>Join the LIFEOS Community</h2>
          <p>Grow in faith alongside others and share your testimony with the community.</p>
          <div className="landing-invitation-actions">
            {session ? (
              <button className="landing-primary-action" type="button" onClick={() => navigate('profile')}>My account <Icon name="arrow" size={17} /></button>
            ) : (
              <>
                <button className="landing-primary-action" type="button" onClick={() => navigate('signin')}>Sign in</button>
                <button className="landing-secondary-action" type="button" onClick={() => navigate('signup')}>Create account <Icon name="arrow" size={17} /></button>
              </>
            )}
          </div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="landing-footer-brand"><strong>LIFEOS <span>✝</span></strong><p>The Living Word</p><p>Growing in faith. Living the Word. Serving with love.</p></div>
        <nav aria-label="Footer quick links"><strong>Quick Links</strong>
          {NAV_LINKS.slice(0, 4).map(([page, label]) => <button key={page} type="button" onClick={() => navigate(page)}>{label}</button>)}
          <button type="button" onClick={openAbout}>About</button>
        </nav>
        <nav aria-label="Footer resources"><strong>Resources</strong>
          {[['rosary', 'Rosary'], ['novena', 'Novena'], ['chaplet', 'Chaplet'], ['seminar', 'Life in the Spirit'], ['songs', 'Songs']].map(([page, label]) => <button key={page} type="button" onClick={() => navigate(page)}>{label}</button>)}
        </nav>
        <nav aria-label="Footer community"><strong>Connect</strong>
          <button type="button" onClick={() => navigate('ministries')}>Ministries</button>
          <button type="button" onClick={() => navigate('testimonies')}>Community</button>
          <a href="./privacy.html">Privacy</a>
        </nav>
        <p>© {new Date().getFullYear()} LIFEOS · The Living Word</p>
      </footer>
    </div>
  );
}