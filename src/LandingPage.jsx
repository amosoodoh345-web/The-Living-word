import { useEffect, useRef, useState } from 'react';
import { CrossLogo, Icon } from './Icons';
import './LandingPage.css';

export default function LandingPage({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutPending, setAboutPending] = useState(false);
  const menuButtonRef = useRef(null);
  const drawerRef = useRef(null);

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
        <a className="landing-brand" href="/index.html#/home" aria-label="Enter The Living Word">
          <CrossLogo size={46} />
          <span>
            <span className="landing-brand-kicker">Life in the Spirit</span>
            <strong>The Living Word</strong>
          </span>
        </a>
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
            <a className="landing-drawer-link" href="/index.html#/home">Home <Icon name="arrow" size={18} /></a>
            <a className="landing-drawer-enter" href="/index.html#/home">Enter LIFEOS <Icon name="arrow" size={18} /></a>
            <button className="landing-drawer-link" type="button" onClick={() => navigate('bible')}>Bible <Icon name="arrow" size={18} /></button>
            <button className="landing-drawer-link" type="button" onClick={() => navigate('prayer')}>Prayer <Icon name="arrow" size={18} /></button>
            <button className="landing-drawer-link" type="button" onClick={() => navigate('devotional')}>Daily Devotional <Icon name="arrow" size={18} /></button>
            <button className="landing-drawer-link" type="button" onClick={openAbout}>About LIFEOS <Icon name="arrow" size={18} /></button>
          </nav>
        </>
      )}

      <main>
        <section className="landing-hero" aria-labelledby="landing-title">
          <div className="landing-hero-content">
            <p className="landing-eyebrow"><span aria-hidden="true">✦</span> Welcome to The Living Word</p>
            <h1 id="landing-title">LIFEOS</h1>
            <p className="landing-hero-subtitle">A closer walk with God, one day at a time.</p>
            <p className="landing-hero-intro">Come as you are. Find Scripture, prayer, and thoughtful daily practices to help you grow in the Spirit.</p>
            <div className="landing-actions">
              <a className="landing-primary-action" href="/index.html#/home">Explore LIFEOS <Icon name="arrow" size={19} /></a>
              <button className="landing-secondary-action" type="button" onClick={() => navigate('bible')}>Begin with Scripture</button>
            </div>
            <blockquote className="landing-verse">
              <p>“Be still, and know that I am God.”</p>
              <cite>Psalm 46:10 <span>·</span> KJV</cite>
            </blockquote>
          </div>
          <span className="landing-image-credit">St Paul preaching at Athens · Städel Museum · Public domain</span>
        </section>

        <section className="landing-about" id="about-lifeos" aria-labelledby="landing-about-title">
          <div>
            <p className="landing-section-kicker">About LIFEOS</p>
            <h2 id="landing-about-title">A little space for what matters most.</h2>
          </div>
          <p className="landing-about-copy">The Living Word brings Bible reading, prayer guides, daily devotionals, spiritual formation, and community stories together in one welcoming place.</p>
        </section>

        <nav className="landing-pathways" aria-label="Explore LIFEOS">
          <button type="button" onClick={() => navigate('bible')}>
            <span className="landing-pathway-icon"><Icon name="book" size={21} /></span>
            <span><strong>Read Scripture</strong><small>Explore the Bible at your pace</small></span>
            <Icon name="arrow" size={18} />
          </button>
          <button type="button" onClick={() => navigate('prayer')}>
            <span className="landing-pathway-icon"><Icon name="prayer" size={21} /></span>
            <span><strong>Make room for prayer</strong><small>Find a prayer or guided devotion</small></span>
            <Icon name="arrow" size={18} />
          </button>
          <button type="button" onClick={() => navigate('devotional')}>
            <span className="landing-pathway-icon"><Icon name="heart" size={21} /></span>
            <span><strong>Pause with a reflection</strong><small>Begin with today's devotional</small></span>
            <Icon name="arrow" size={18} />
          </button>
        </nav>
      </main>

      <footer className="landing-footer">LIFEOS <span aria-hidden="true">·</span> The Living Word</footer>
    </div>
  );
}