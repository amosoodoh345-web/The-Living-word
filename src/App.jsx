import { useEffect, useMemo, useState } from 'react';
import {
  BIBLE_BOOKS,
  bibleBooks,
  defaultPrayerFocuses,
  getBookInfo,
  getBookChapterCount,
  loadChapterVerses
} from './data/bibleLibrary';
import { ENCOURAGEMENTS, ENCOURAGEMENT_THEMES } from './data/encouragementLibrary';
import { SITE_NAVIGATION } from './siteNavigation';
import {
  DevotionalPage,
  ExplorePage,
  MinistriesPage,
  NovenaPage,
  PrayerGuidePage,
  PrayerPage,
  SeminarPage,
  SongsPage,
  TestimoniesPage,
  WisdomReadingsPage
} from './LifeOSPages';
import RemindersPage from './RemindersPage';
import SpiritualGrowthPage from './SpiritualGrowthPage';
import HomeDashboard from './HomeDashboard';
import ProfilePage from './ProfilePage';
import { Icon } from './Icons';
import {
  DEFAULT_REMINDERS,
  getDueReminders,
  normalizeReminders,
  reminderFiredKey
} from './lib/reminders';
import { getGrowthSummary, toggleDailyPractice } from './lib/spiritualGrowth';
import { SEMINAR_SESSIONS } from './data/lifeosContent';

const translations = [
  { id: 'kjv', label: 'KJV', fullName: 'King James Version (with Apocrypha)' },
  { id: 'web', label: 'WEB', fullName: 'World English Bible (Modern English)' },
  { id: 'bbe', label: 'BBE', fullName: 'Bible in Basic English' }
];

const storageKeys = {
  theme: 'life-in-the-spirit-theme',
  favorites: 'life-in-the-spirit-favorites',
  history: 'life-in-the-spirit-history',
  prayer: 'life-in-the-spirit-prayer',
  journal: 'life-in-the-spirit-journal',
  seminarProgress: 'lifeos-seminar-progress',
  testimonyDrafts: 'lifeos-testimony-drafts',
  reminders: 'lifeos-reminders',
  growthActivity: 'lifeos-growth-activity'
};

const navItems = [
  { id: 'home', label: 'Home', icon: <Icon name="home" /> },
  { id: 'bible', label: 'Bible', icon: <Icon name="book" /> },
  { id: 'explore', label: 'Learn', icon: <Icon name="learn" /> },
  { id: 'prayer', label: 'Prayer', icon: <Icon name="prayer" /> },
  { id: 'profile', label: 'Profile', icon: <Icon name="user" /> }
];

// Pages opened from the dashboard keep their parent tab highlighted.
const navGroups = {
  bible: ['bible', 'wisdom', 'encouragement'],
  explore: ['explore', 'seminar', 'devotional', 'ministries', 'songs', 'testimonies'],
  prayer: ['prayer', 'novena', 'rosary', 'chaplet', 'journal'],
  profile: ['profile', 'reminders', 'growth', 'saved']
};

const isNavItemActive = (itemId, currentPage) => (navGroups[itemId] || [itemId]).includes(currentPage);

function SiteNavigation() {
  return (
    <nav className="lifeos-site-nav" aria-label="The Living Word pages">
      <a className="lifeos-site-brand" href="./index.html">
        <span className="lifeos-site-mark" aria-hidden="true">✦</span><span>The Living Word</span>
      </a>
      <div className="lifeos-site-nav-links">
        {SITE_NAVIGATION.map((item) => (
          <a key={item.id} href={item.href} aria-current={item.id === 'home' ? 'page' : undefined}>{item.label}</a>
        ))}
      </div>
    </nav>
  );
}

const readStored = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

function App() {
  const [page, setPage] = useState(() => new URLSearchParams(window.location.search).get('view') === 'testimonies' ? 'testimonies' : 'home');
  const [sharedExperience, setSharedExperience] = useState(() => {
    try {
      const experience = sessionStorage.getItem('living-word-experience-to-share') || '';
      sessionStorage.removeItem('living-word-experience-to-share');
      return experience;
    } catch {
      return '';
    }
  });
  const [activeTranslation, setActiveTranslation] = useState('kjv');
  const [selectedBook, setSelectedBook] = useState('Genesis');
  const [selectedChapter, setSelectedChapter] = useState(1);
  const [selectedVerse, setSelectedVerse] = useState(1);
  const [testamentFilter, setTestamentFilter] = useState('ALL');
  const [bookSearch, setBookSearch] = useState('');
  const [chapterVerses, setChapterVerses] = useState([]);
  const [isLoadingVerses, setIsLoadingVerses] = useState(false);
  const [chapterError, setChapterError] = useState('');
  const [chapterSource, setChapterSource] = useState('bundled');
  const [fontSize, setFontSize] = useState(18);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [readingMode, setReadingMode] = useState('continuous');
  const [favourites, setFavourites] = useState(() => readStored(storageKeys.favorites, []));
  const [history, setHistory] = useState(() => readStored(storageKeys.history, []));
  const [journal, setJournal] = useState(() => readStored(storageKeys.journal, []));
  const [seminarProgress, setSeminarProgress] = useState(() => readStored(storageKeys.seminarProgress, {}));
  const [testimonyDrafts, setTestimonyDrafts] = useState(() => readStored(storageKeys.testimonyDrafts, []));
  const [reminders, setReminders] = useState(() => normalizeReminders(readStored(storageKeys.reminders, DEFAULT_REMINDERS)));
  const [growthActivity, setGrowthActivity] = useState(() => readStored(storageKeys.growthActivity, {}));
  const [notificationPermission, setNotificationPermission] = useState(() => (
    'Notification' in window ? Notification.permission : 'unsupported'
  ));
  const [theme, setTheme] = useState(() => localStorage.getItem(storageKeys.theme) || 'light');
  const [prayerFocus, setPrayerFocus] = useState(() => readStored(storageKeys.prayer, defaultPrayerFocuses[0]));
  const [searchTerm, setSearchTerm] = useState('');
  const [encouragementSearch, setEncouragementSearch] = useState('');
  const [encouragementTheme, setEncouragementTheme] = useState('All themes');
  const [encouragementCursor, setEncouragementCursor] = useState(0);
  const [journalText, setJournalText] = useState('');
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [notice, setNotice] = useState('');
  const [pendingSessionId, setPendingSessionId] = useState(null);

  const currentBookInfo = useMemo(() => getBookInfo(selectedBook), [selectedBook]);
  const totalChapters = useMemo(() => getBookChapterCount(selectedBook), [selectedBook]);
  const chapterOptions = useMemo(
    () => Array.from({ length: totalChapters }, (_, i) => i + 1),
    [totalChapters]
  );

  const filteredBooks = useMemo(() => {
    return BIBLE_BOOKS.filter((b) => {
      const matchesTestament = testamentFilter === 'ALL' || b.testament === testamentFilter;
      const q = bookSearch.trim().toLowerCase();
      const matchesSearch = !q || b.name.toLowerCase().includes(q) || b.category.toLowerCase().includes(q);
      return matchesTestament && matchesSearch;
    });
  }, [testamentFilter, bookSearch]);

  const currentVerseData = useMemo(() => {
    if (!chapterVerses || chapterVerses.length === 0) return null;
    return chapterVerses.find((entry) => entry.verse === selectedVerse) || chapterVerses[0];
  }, [chapterVerses, selectedVerse]);

  const filteredVerses = useMemo(() => {
    if (!chapterVerses) return [];
    if (!searchTerm.trim()) return chapterVerses;
    const term = searchTerm.trim().toLowerCase();
    return chapterVerses.filter((entry) => (entry.text || '').toLowerCase().includes(term));
  }, [chapterVerses, searchTerm]);

  const filteredEncouragements = useMemo(() => {
    const query = encouragementSearch.trim().toLowerCase();
    return ENCOURAGEMENTS.filter((entry) => {
      const matchesTheme = encouragementTheme === 'All themes' || entry.theme === encouragementTheme;
      const matchesSearch = !query || `${entry.text} ${entry.reference} ${entry.theme}`.toLowerCase().includes(query);
      return matchesTheme && matchesSearch;
    });
  }, [encouragementSearch, encouragementTheme]);
  const currentEncouragementIndex = filteredEncouragements.length
    ? encouragementCursor % filteredEncouragements.length
    : 0;
  const currentEncouragement = filteredEncouragements[currentEncouragementIndex] || null;

  // Load chapter verses asynchronously with offline caching
  useEffect(() => {
    let isCurrent = true;
    setIsLoadingVerses(true);
    setChapterError('');

    loadChapterVerses(selectedBook, selectedChapter, activeTranslation)
      .then((result) => {
        if (!isCurrent) return;
        setChapterVerses(result.verses);
        setChapterSource(result.source);
        setIsLoadingVerses(false);
        if (selectedVerse > result.verses.length) {
          setSelectedVerse(1);
        }
      })
      .catch((err) => {
        if (!isCurrent) return;
        setIsLoadingVerses(false);
        setChapterError(err.message || 'Unable to load chapter.');
      });

    return () => {
      isCurrent = false;
    };
  }, [selectedBook, selectedChapter, activeTranslation]);

  // Cancel speech on chapter or page change
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [selectedBook, selectedChapter, selectedVerse, page]);

  useEffect(() => {
    document.body.dataset.theme = theme;
    localStorage.setItem(storageKeys.theme, theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem(storageKeys.favorites, JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem(storageKeys.history, JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem(storageKeys.journal, JSON.stringify(journal));
  }, [journal]);

  useEffect(() => {
    localStorage.setItem(storageKeys.seminarProgress, JSON.stringify(seminarProgress));
  }, [seminarProgress]);

  useEffect(() => {
    localStorage.setItem(storageKeys.testimonyDrafts, JSON.stringify(testimonyDrafts));
  }, [testimonyDrafts]);

  useEffect(() => {
    localStorage.setItem(storageKeys.prayer, JSON.stringify(prayerFocus));
  }, [prayerFocus]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [page]);

  useEffect(() => {
    if (page !== 'seminar' || !pendingSessionId) return;
    document.getElementById(`session-${pendingSessionId}`)?.scrollIntoView({ block: 'center' });
    setPendingSessionId(null);
  }, [page, pendingSessionId]);

  useEffect(() => {
    localStorage.setItem(storageKeys.reminders, JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem(storageKeys.growthActivity, JSON.stringify(growthActivity));
  }, [growthActivity]);

  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const due = getDueReminders(reminders, now).filter(
        (reminder) => localStorage.getItem(reminderFiredKey(reminder, now)) !== 'sent'
      );
      if (due.length === 0) return;

      due.forEach((reminder) => localStorage.setItem(reminderFiredKey(reminder, now), 'sent'));
      const message = due.map((reminder) => reminder.message).join(' ');
      setNotice(message);

      if ('Notification' in window && Notification.permission === 'granted') {
        const showNotifications = async () => {
          try {
            const registration = 'serviceWorker' in navigator
              ? await navigator.serviceWorker.getRegistration()
              : null;
            if (registration && 'showNotification' in registration) {
              await registration.showNotification('LIFEOS reminder', {
                body: message,
                icon: '/spirit-icon-192.png',
                tag: due.map((reminder) => reminder.id).join('-')
              });
            } else {
              new Notification('LIFEOS reminder', { body: message });
            }
          } catch (error) {
            console.error('Could not show the reminder notification:', error);
            setNotice(`${message} Browser notification could not be shown.`);
          }
        };
        void showNotifications();
      }
    };

    const syncPermission = () => {
      setNotificationPermission('Notification' in window ? Notification.permission : 'unsupported');
      checkReminders();
    };
    checkReminders();
    const interval = window.setInterval(checkReminders, 15_000);
    window.addEventListener('focus', syncPermission);
    document.addEventListener('visibilitychange', syncPermission);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('focus', syncPermission);
      document.removeEventListener('visibilitychange', syncPermission);
    };
  }, [reminders]);

  useEffect(() => {
    const onInstallPrompt = (event) => {
      event.preventDefault();
      setInstallPrompt(event);
    };
    const onInstalled = () => {
      setIsInstalled(true);
      setInstallPrompt(null);
    };
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', onInstallPrompt);
    window.addEventListener('appinstalled', onInstalled);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    setIsInstalled(window.matchMedia('(display-mode: standalone)').matches);

    return () => {
      window.removeEventListener('beforeinstallprompt', onInstallPrompt);
      window.removeEventListener('appinstalled', onInstalled);
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  useEffect(() => {
    if (!currentVerseData) return;
    const entry = {
      id: `${selectedBook}-${selectedChapter}-${currentVerseData.verse}`,
      reference: `${selectedBook} ${selectedChapter}:${currentVerseData.verse}`,
      book: selectedBook,
      chapter: selectedChapter,
      verse: currentVerseData.verse
    };
    setHistory((previous) => [entry, ...previous.filter((item) => item.id !== entry.id)].slice(0, 8));
    setSelectedVerse(currentVerseData.verse);
  }, [currentVerseData, selectedBook, selectedChapter]);

  const goToReference = (item) => {
    setSelectedBook(item.book);
    setSelectedChapter(item.chapter);
    setSelectedVerse(item.verse);
    setPage('bible');
  };

  const openScriptureReference = (reference) => {
    const match = reference.match(/^(.+?)\s+(\d+):(\d+)/);
    if (!match) return;
    goToReference({
      book: match[1] === 'Psalm' ? 'Psalms' : match[1],
      chapter: Number(match[2]),
      verse: Number(match[3])
    });
  };

  const toggleSeminarSession = (sessionId) => {
    setSeminarProgress((previous) => ({ ...previous, [sessionId]: !previous[sessionId] }));
  };

  const addTestimonyDraft = (draft) => setTestimonyDrafts((previous) => [draft, ...previous]);

  const openSeminarSession = (sessionId) => {
    setPendingSessionId(sessionId);
    setPage('seminar');
  };

  const toggleFavorite = () => {
    if (!currentVerseData) return;
    const id = `${selectedBook}-${selectedChapter}-${currentVerseData.verse}`;
    setFavourites((previous) => {
      if (previous.some((item) => item.id === id)) {
        return previous.filter((item) => item.id !== id);
      }
      return [{
        id,
        reference: `${selectedBook} ${selectedChapter}:${currentVerseData.verse}`,
        text: currentVerseData.text,
        book: selectedBook,
        chapter: selectedChapter,
        verse: currentVerseData.verse
      }, ...previous];
    });
  };

  const copyVerse = (v) => {
    const target = v || currentVerseData;
    if (!target) return;
    const ref = `${selectedBook} ${selectedChapter}:${target.verse}`;
    const text = `${ref} (${activeTranslation.toUpperCase()})\n"${target.text}"`;
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setNotice(`Copied ${ref} to clipboard.`);
    } else {
      setNotice(`Verse: "${target.text}"`);
    }
  };

  const copyEncouragement = async () => {
    if (!currentEncouragement) return;
    const content = `${currentEncouragement.text}\n\nScripture to read: ${currentEncouragement.reference}`;
    try {
      await navigator.clipboard.writeText(content);
      setNotice('Encouragement copied to clipboard.');
    } catch {
      setNotice('Clipboard access is unavailable in this browser.');
    }
  };

  const shareEncouragement = async () => {
    if (!currentEncouragement) return;
    const content = `${currentEncouragement.text}\n\nScripture to read: ${currentEncouragement.reference}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'A moment of encouragement', text: content });
      } catch (error) {
        if (error.name !== 'AbortError') setNotice('Sharing is unavailable right now.');
      }
      return;
    }
    await copyEncouragement();
  };

  const reflectOnEncouragement = () => {
    if (!currentEncouragement) return;
    setJournalText(`Encouragement · ${currentEncouragement.theme}\n"${currentEncouragement.text}"\n\nScripture to read: ${currentEncouragement.reference}\n\nMy reflection: `);
    setPage('journal');
  };

  const toggleAudio = (textToRead) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setNotice('Speech audio is not supported in this browser.');
      return;
    }
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const text = textToRead || (currentVerseData ? currentVerseData.text : '');
    if (!text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.92;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const sendVerseToJournal = (v) => {
    const target = v || currentVerseData;
    if (!target) return;
    setJournalText(`"${target.text}"\n— ${selectedBook} ${selectedChapter}:${target.verse} (${activeTranslation.toUpperCase()})\n\nReflection: `);
    setPage('journal');
  };

  const saveJournalEntry = (event) => {
    event.preventDefault();
    if (!journalText.trim()) {
      setNotice('Write a thought or prayer before saving.');
      return;
    }
    setJournal((previous) => [{
      id: `${Date.now()}`,
      date: new Date().toLocaleDateString(undefined, { dateStyle: 'medium' }),
      text: journalText.trim()
    }, ...previous]);
    setJournalText('');
    setNotice('Your reflection has been saved on this device.');
  };

  const installApp = async () => {
    if (!installPrompt) {
      setNotice('To install, use your browser menu and choose “Add to Home Screen” or “Install app”.');
      return;
    }
    await installPrompt.prompt();
    const choice = await installPrompt.userChoice;
    if (choice.outcome === 'accepted') setIsInstalled(true);
    setInstallPrompt(null);
  };

  const requestReminderPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      if (permission !== 'granted') {
        setNotice(permission === 'denied'
          ? 'Notifications were blocked. You can allow them in your browser settings.'
          : 'Notification permission was not granted.');
      }
    } catch (error) {
      console.error('Could not request notification permission:', error);
      setNotice('Could not request notification permission in this browser.');
    }
  };

  const changeBook = (book) => {
    setSelectedBook(book);
    setSelectedChapter(1);
    setSelectedVerse(1);
    setSearchTerm('');
  };

  const moveVerse = (direction) => {
    const currentIndex = chapterVerses.findIndex((entry) => entry.verse === selectedVerse);
    const next = chapterVerses[currentIndex + direction];
    if (next) setSelectedVerse(next.verse);
  };

  const moveChapter = (direction) => {
    const next = selectedChapter + direction;
    if (next >= 1 && next <= totalChapters) {
      setSelectedChapter(next);
      setSelectedVerse(1);
      setSearchTerm('');
    }
  };

  const isFavorite = currentVerseData && favourites.some(
    (item) => item.id === `${selectedBook}-${selectedChapter}-${currentVerseData.verse}`
  );
  const growthSummary = getGrowthSummary(growthActivity);
  const seminarComplete = SEMINAR_SESSIONS.filter((session) => seminarProgress[session.id]).length;

  const testamentBadge = useMemo(() => {
    if (currentBookInfo.testament === 'DC') return 'Deuterocanonical (Apocrypha)';
    if (currentBookInfo.testament === 'OT') return 'Old Testament';
    return 'New Testament';
  }, [currentBookInfo]);

  const renderPage = () => {
    if (page === 'profile') {
      return (
        <ProfilePage
          theme={theme}
          onToggleTheme={() => setTheme((previous) => previous === 'light' ? 'dark' : 'light')}
          isInstalled={isInstalled}
          onInstall={installApp}
          isOnline={isOnline}
          reminders={reminders}
          notificationPermission={notificationPermission}
          counts={{
            journal: journal.length,
            favourites: favourites.length,
            streak: growthSummary.currentStreak,
            seminarComplete,
            seminarTotal: SEMINAR_SESSIONS.length
          }}
          onNavigate={setPage}
        />
      );
    }

    if (page === 'reminders') {
      return (
        <RemindersPage
          reminders={reminders}
          onChange={setReminders}
          permission={notificationPermission}
          onRequestPermission={requestReminderPermission}
        />
      );
    }

    if (page === 'growth') {
      return (
        <SpiritualGrowthPage
          activity={growthActivity}
          onToggle={(practiceId) => setGrowthActivity((previous) => toggleDailyPractice(previous, practiceId))}
        />
      );
    }

    if (page === 'bible') {
      return (
        <main className="content-page bible-page">
          <section className="bible-intro">
            <div>
              <p className="eyebrow">The complete 73-book library</p>
              <h2>Scripture, in full.</h2>
              <p>Read chapter by chapter across the Old Testament, Deuterocanonical books, and New Testament. Chapters load as you read and are cached on this device for later.</p>
            </div>
            <div className="bible-library-count" aria-label="Bible library contents">
              <strong>{BIBLE_BOOKS.length}</strong><span>books</span>
              <i aria-hidden="true" />
              <strong>{BIBLE_BOOKS.reduce((total, book) => total + book.chapters, 0).toLocaleString()}</strong><span>chapters</span>
            </div>
            <a className="bible-art-credit" href="https://commons.wikimedia.org/wiki/File:Paul_preaching_to_Athens_(SM_5510z).png" target="_blank" rel="noreferrer">St Paul preaching at Athens · Städel Museum · Public Domain</a>
          </section>

          <section className="wisdom-promo" aria-label="Wisdom readings">
            <div>
              <p className="mini-label">Proverbs · Ecclesiastes · Psalms</p>
              <h3>75 words of wisdom</h3>
              <p>Original reflection notes with Scripture references, ready to explore in context.</p>
            </div>
            <button className="primary-btn small" onClick={() => setPage('wisdom')}>Open wisdom guide <span aria-hidden="true">→</span></button>
          </section>

          <div className="reader-layout">
            <aside className="reader-sidebar" aria-label="Bible library">
              <section className="library-panel panel">
                <div className="section-heading">
                  <div><p className="mini-label">Library</p><h3>Browse books</h3></div>
                  <span className="subtle-label">{filteredBooks.length} of {BIBLE_BOOKS.length}</span>
                </div>

                <div className="testament-tabs" role="tablist" aria-label="Filter by testament">
                  <button
                    className={testamentFilter === 'ALL' ? 'tab-pill active' : 'tab-pill'}
                    onClick={() => setTestamentFilter('ALL')}
                  >All <span>{BIBLE_BOOKS.length}</span></button>
                  <button
                    className={testamentFilter === 'OT' ? 'tab-pill active' : 'tab-pill'}
                    onClick={() => setTestamentFilter('OT')}
                  >Old <span>{BIBLE_BOOKS.filter((book) => book.testament === 'OT').length}</span></button>
                  <button
                    className={testamentFilter === 'DC' ? 'tab-pill active' : 'tab-pill'}
                    onClick={() => setTestamentFilter('DC')}
                    title="Catholic & Orthodox Deuterocanonical books"
                  >Deutero <span>{BIBLE_BOOKS.filter((book) => book.testament === 'DC').length}</span></button>
                  <button
                    className={testamentFilter === 'NT' ? 'tab-pill active' : 'tab-pill'}
                    onClick={() => setTestamentFilter('NT')}
                  >New <span>{BIBLE_BOOKS.filter((book) => book.testament === 'NT').length}</span></button>
                </div>

                <input
                  className="search-box"
                  type="search"
                  value={bookSearch}
                  onChange={(event) => setBookSearch(event.target.value)}
                  placeholder="Find a book"
                  aria-label="Filter books"
                />

                <div className="book-list">
                  {filteredBooks.map((b) => (
                    <button
                      key={b.name}
                      className={b.name === selectedBook ? 'book-item active' : 'book-item'}
                      onClick={() => changeBook(b.name)}
                    >
                      <span className="book-title">{b.name}</span>
                      <span className={`book-tag tag-${b.testament.toLowerCase()}`}>
                        {b.testament === 'DC' ? 'Deuterocanon' : b.category}
                      </span>
                    </button>
                  ))}
                  {filteredBooks.length === 0 && (
                    <p className="empty-state">No books match "{bookSearch}".</p>
                  )}
                </div>
              </section>
            </aside>

            <section className="reader-panel">
              <div className="reader-toolbar">
                <div className="reader-location">
                  <p className="mini-label">Now reading</p>
                  <h3>{selectedBook} <span>{selectedChapter}</span></h3>
                  <p>{currentBookInfo.category} · {totalChapters} chapters</p>
                </div>
                <div className="reader-controls">
                  <label className="field">
                    <span>Translation</span>
                    <select value={activeTranslation} onChange={(event) => setActiveTranslation(event.target.value)}>
                      {translations.map((translation) => <option key={translation.id} value={translation.id}>{translation.label}</option>)}
                    </select>
                  </label>
                  <label className="field">
                    <span>Chapter</span>
                    <select value={selectedChapter} onChange={(event) => { setSelectedChapter(Number(event.target.value)); setSelectedVerse(1); }}>
                      {chapterOptions.map((chapter) => <option key={chapter} value={chapter}>{selectedBook} {chapter}</option>)}
                    </select>
                  </label>
                  <div className="chapter-step-buttons" aria-label="Navigate chapters">
                    <button className="font-btn" disabled={selectedChapter <= 1} onClick={() => moveChapter(-1)} title="Previous chapter" aria-label="Previous chapter">←</button>
                    <button className="font-btn" disabled={selectedChapter >= totalChapters} onClick={() => moveChapter(1)} title="Next chapter" aria-label="Next chapter">→</button>
                  </div>
                  <div className="font-size-controls" aria-label="Text size">
                    <button className="font-btn" onClick={() => setFontSize((previous) => Math.max(14, previous - 2))} title="Decrease text size" aria-label="Decrease text size">A−</button>
                    <button className="font-btn" onClick={() => setFontSize((previous) => Math.min(28, previous + 2))} title="Increase text size" aria-label="Increase text size">A+</button>
                  </div>
                </div>
              </div>

              <div className="reader-meta-row">
                <span className="testament-badge">{testamentBadge}</span>
                <span className="translation-tag">{activeTranslation.toUpperCase()}</span>
                <span className="source-tag">
                  {chapterSource === 'bundled' && '✦ Pre-bundled Offline'}
                  {chapterSource === 'offline-cache' && '✓ Cached Offline'}
                  {chapterSource === 'network' && '☁ Loaded & Cached'}
                  {chapterSource === 'cache' && '✓ Ready to read'}
                </span>
                <div className="mode-toggle">
                  <button
                    className={readingMode === 'continuous' ? 'mode-pill active' : 'mode-pill'}
                    onClick={() => setReadingMode('continuous')}
                  >Prose reader</button>
                  <button
                    className={readingMode === 'cards' ? 'mode-pill active' : 'mode-pill'}
                    onClick={() => setReadingMode('cards')}
                  >Verse cards</button>
                </div>
              </div>

              <div className="chapter-grid" aria-label="Available chapters">
                {chapterOptions.map((chapter) => (
                  <button
                    key={chapter}
                    className={chapter === selectedChapter ? 'chapter-button active' : 'chapter-button'}
                    onClick={() => { setSelectedChapter(chapter); setSelectedVerse(1); }}
                  >{chapter}</button>
                ))}
              </div>

              <article className="reader-card">
                <div className="verse-header">
                  <div>
                    <p className="mini-label">Selected passage</p>
                    <h3>{selectedBook} {selectedChapter}{currentVerseData ? `:${currentVerseData.verse}` : ''}</h3>
                  </div>
                  <div className="header-badges">
                    <span className="translation-tag">{activeTranslation.toUpperCase()}</span>
                  </div>
                </div>

                {isLoadingVerses ? (
                  <div className="loading-card">
                    <span className="loading-spinner">✦</span>
                    <p>Loading {selectedBook} {selectedChapter}...</p>
                  </div>
                ) : chapterError ? (
                  <div className="error-card">
                    <p>{chapterError}</p>
                    <button
                      className="secondary-btn small"
                      onClick={() => {
                        setIsLoadingVerses(true);
                        setChapterError('');
                        loadChapterVerses(selectedBook, selectedChapter, activeTranslation)
                          .then((res) => {
                            setChapterVerses(res.verses);
                            setChapterSource(res.source);
                            setIsLoadingVerses(false);
                          })
                          .catch((e) => {
                            setChapterError(e.message || 'Retry failed.');
                            setIsLoadingVerses(false);
                          });
                      }}
                    >Retry loading</button>
                  </div>
                ) : currentVerseData ? (
                  <p className="featured-verse" style={{ fontSize: `${fontSize + 4}px` }}>
                    {currentVerseData.text}
                  </p>
                ) : (
                  <p className="empty-state">No verses loaded yet.</p>
                )}

                <div className="verse-actions">
                  <button
                    className="secondary-btn small"
                    disabled={!chapterVerses.some((entry) => entry.verse < selectedVerse)}
                    onClick={() => moveVerse(-1)}
                  >‹ Verse</button>
                  <button
                    className="secondary-btn small"
                    disabled={!chapterVerses.some((entry) => entry.verse > selectedVerse)}
                    onClick={() => moveVerse(1)}
                  >Verse ›</button>
                  <button
                    className="primary-btn small"
                    disabled={!currentVerseData}
                    onClick={toggleFavorite}
                  >{isFavorite ? '♥ Saved' : '♡ Save verse'}</button>
                  <button
                    className="secondary-btn small"
                    disabled={!currentVerseData}
                    onClick={() => copyVerse(currentVerseData)}
                  >📋 Copy</button>
                  <button
                    className="secondary-btn small"
                    disabled={!currentVerseData}
                    onClick={() => toggleAudio(currentVerseData ? currentVerseData.text : '')}
                  >{isSpeaking ? '◼ Stop Audio' : '🔊 Listen'}</button>
                  <button
                    className="secondary-btn small"
                    disabled={!currentVerseData}
                    onClick={() => sendVerseToJournal(currentVerseData)}
                  >✎ Reflect</button>
                </div>
              </article>

              <section className="panel chapter-full-panel">
                <div className="section-heading">
                  <div>
                    <p className="mini-label">{selectedBook} Chapter {selectedChapter}</p>
                    <h3>All verses in this chapter</h3>
                  </div>
                  <div className="panel-heading-actions">
                    <span className="subtle-label">{chapterVerses.length} total verses</span>
                    <button
                      className="secondary-btn small audio-chapter-btn"
                      disabled={isLoadingVerses || chapterVerses.length === 0}
                      onClick={() => {
                        const fullText = chapterVerses.map(v => `${v.verse}. ${v.text}`).join(' ');
                        toggleAudio(fullText);
                      }}
                    >
                      {isSpeaking ? '◼ Stop' : '🔊 Read chapter'}
                    </button>
                  </div>
                </div>

                <div className="chapter-search-box">
                  <input
                    className="search-box"
                    type="search"
                    value={searchTerm}
                    onChange={(event) => setSearchTerm(event.target.value)}
                    placeholder={`Search within ${selectedBook} ${selectedChapter}...`}
                    aria-label={`Search within ${selectedBook} ${selectedChapter}`}
                  />
                  {searchTerm && (
                    <span className="search-match-count">{filteredVerses.length} matches</span>
                  )}
                </div>

                {isLoadingVerses ? (
                  <div className="loading-card">
                    <span className="loading-spinner">✦</span>
                    <p>Loading full chapter...</p>
                  </div>
                ) : readingMode === 'continuous' ? (
                  <div
                    className="continuous-prose"
                    style={{ fontSize: `${fontSize}px` }}
                  >
                    {filteredVerses.map((entry) => {
                      const isActive = entry.verse === selectedVerse;
                      return (
                        <span
                          key={`${selectedBook}-${selectedChapter}-${entry.verse}`}
                          className={isActive ? 'prose-verse active' : 'prose-verse'}
                          onClick={() => setSelectedVerse(entry.verse)}
                          title={`Click to select verse ${entry.verse}`}
                        >
                          <sup className="verse-num">{entry.verse}</sup>
                          <span className="verse-body">{entry.text}</span>
                          {' '}
                        </span>
                      );
                    })}
                    {filteredVerses.length === 0 && (
                      <p className="empty-state">No matching verses found for "{searchTerm}".</p>
                    )}
                  </div>
                ) : (
                  <div className="verse-list">
                    {filteredVerses.map((entry) => (
                      <button
                        key={`${selectedBook}-${selectedChapter}-${entry.verse}`}
                        className={entry.verse === selectedVerse ? 'verse-item active' : 'verse-item'}
                        onClick={() => setSelectedVerse(entry.verse)}
                      >
                        <strong>{entry.verse}</strong>{entry.text}
                      </button>
                    ))}
                    {filteredVerses.length === 0 && (
                      <p className="empty-state">No matching verses in this chapter.</p>
                    )}
                  </div>
                )}

                <div className="chapter-bottom-nav">
                  <button
                    className="secondary-btn"
                    disabled={selectedChapter <= 1}
                    onClick={() => { moveChapter(-1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  >‹ Previous Chapter ({selectedChapter - 1})</button>
                  <span className="subtle-label">
                    {selectedBook} {selectedChapter} of {totalChapters}
                  </span>
                  <button
                    className="primary-btn"
                    disabled={selectedChapter >= totalChapters}
                    onClick={() => { moveChapter(1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  >Next Chapter ({selectedChapter + 1}) ›</button>
                </div>
              </section>
            </section>
          </div>
        </main>
      );
    }

    if (page === 'encouragement') {
      return (
        <main className="content-page encouragement-page">
          <section className="page-intro">
            <p className="eyebrow">A word for the road ahead</p>
            <h2>Encouragement for today</h2>
            <p>Explore 1,000 original devotional reflections, each paired with a Scripture reference to read in context. These reflections are not Bible quotations.</p>
          </section>
          <section className="encouragement-controls" aria-label="Find encouragement">
            <label className="field" htmlFor="encouragement-theme">
              <span>Theme</span>
              <select id="encouragement-theme" value={encouragementTheme} onChange={(event) => { setEncouragementTheme(event.target.value); setEncouragementCursor(0); }}>
                {ENCOURAGEMENT_THEMES.map((theme) => <option key={theme} value={theme}>{theme}</option>)}
              </select>
            </label>
            <label className="field encouragement-search" htmlFor="encouragement-search">
              <span>Search reflections and references</span>
              <input id="encouragement-search" className="search-box" type="search" value={encouragementSearch} onChange={(event) => { setEncouragementSearch(event.target.value); setEncouragementCursor(0); }} placeholder="Try peace, courage, or John 14" />
            </label>
            <span className="subtle-label encouragement-count">{filteredEncouragements.length} reflections</span>
          </section>
          {currentEncouragement ? (
            <article className="encouragement-card" aria-live="polite">
              <p className="mini-label">{currentEncouragement.theme} · {currentEncouragementIndex + 1} of {filteredEncouragements.length}</p>
              <blockquote>{currentEncouragement.text}</blockquote>
              <div className="encouragement-scripture">
                <span className="mini-label">Scripture to read</span>
                <button className="text-button" onClick={() => goToReference(currentEncouragement)}>{currentEncouragement.reference} <span aria-hidden="true">→</span></button>
              </div>
              <div className="encouragement-actions">
                <button className="secondary-btn small" onClick={copyEncouragement}>Copy</button>
                <button className="secondary-btn small" onClick={shareEncouragement}>Share</button>
                <button className="secondary-btn small" onClick={reflectOnEncouragement}>Reflect</button>
                <span className="encouragement-spacer" />
                <button className="secondary-btn small" onClick={() => setEncouragementCursor((currentEncouragementIndex - 1 + filteredEncouragements.length) % filteredEncouragements.length)} aria-label="Previous encouragement">← Previous</button>
                <button className="primary-btn small" onClick={() => setEncouragementCursor((currentEncouragementIndex + 1) % filteredEncouragements.length)} aria-label="Next encouragement">Next →</button>
              </div>
            </article>
          ) : (
            <div className="empty-card"><h3>No reflections found</h3><p>Try another theme or search term.</p></div>
          )}
        </main>
      );
    }

    if (page === 'explore') {
      return <ExplorePage onNavigate={setPage} />;
    }

    if (page === 'seminar') {
      return <SeminarPage progress={seminarProgress} onToggle={toggleSeminarSession} />;
    }

    if (page === 'devotional') {
      return (
        <DevotionalPage
          onOpenBible={openScriptureReference}
          onJournal={(entry) => {
            setJournalText(`${entry.title}\n${entry.scripture}\n\n${entry.reflection}\n\n${entry.prompt}\n\nMy response: `);
            setPage('journal');
          }}
        />
      );
    }

    if (page === 'wisdom') return <WisdomReadingsPage onOpenBible={openScriptureReference} />;
    if (page === 'ministries') return <MinistriesPage />;
    if (page === 'songs') return <SongsPage />;
    if (page === 'novena') return <NovenaPage />;
    if (page === 'rosary' || page === 'chaplet') return <PrayerGuidePage kind={page} key={page} />;

    if (page === 'testimonies') {
      return <TestimoniesPage reports={testimonyDrafts} onAdd={addTestimonyDraft} onDelete={(id) => setTestimonyDrafts((previous) => previous.filter((draft) => draft.id !== id))} initialExperience={sharedExperience} onPrefillConsumed={setSharedExperience} />;
    }

    if (page === 'prayer') {
      return (
        <PrayerPage
          prayerFocus={prayerFocus}
          setPrayerFocus={setPrayerFocus}
          defaultPrayerFocuses={defaultPrayerFocuses}
          onNavigate={(destination) => {
            if (destination === 'bible') {
              setSelectedBook('Psalms');
              setSelectedChapter(23);
              setSelectedVerse(1);
            }
            setPage(destination);
          }}
        />
      );
    }

    if (page === 'journal') {
      return (
        <main className="content-page reflection-journal-page">
          <section className="reflection-journal-heading">
            <div><p className="eyebrow">A quiet place to notice</p><h2>Your reflection book</h2></div>
            <p>Write a prayer, a thought from today’s reading, or something you want to remember. Your pages stay on this device.</p>
          </section>
          <div className="reflection-book-spread">
            <aside className="reflection-book-margin">
              <p className="mini-label">Today’s page</p>
              <h3>Begin where you are.</h3>
              <p>There is no need to find perfect words. Start with what is present: a hope, a question, a thank-you, or a prayer.</p>
              <div className="reflection-margin-rule" />
              <p className="reflection-margin-note">A private practice · saved on this device</p>
            </aside>
            <form className="reflection-writing-panel" onSubmit={saveJournalEntry}>
              <label htmlFor="journal-entry">What would you like to remember?</label>
              <textarea id="journal-entry" value={journalText} onChange={(event) => setJournalText(event.target.value)} placeholder="Today, I am thankful for…&#10;&#10;A word or moment I want to carry with me…&#10;&#10;My prayer…" rows="12" />
              <div className="journal-form-footer"><span className="subtle-label">Private · stored on this device</span><button className="primary-btn" type="submit">Save this page</button></div>
            </form>
          </div>
          <section className="journal-entries reflection-saved-pages">
            <div className="section-heading"><div><p className="mini-label">Your pages</p><h3>Saved reflections</h3></div><span className="subtle-label">{journal.length} saved</span></div>
            {journal.length === 0 ? <div className="empty-card"><span>✎</span><h3>Your reflections will appear here</h3><p>Start with one small thing you noticed today.</p></div> : journal.map((entry) => (
              <article className="journal-entry panel" key={entry.id}>
                <p className="mini-label">{entry.date}</p><p>{entry.text}</p>
                <button className="text-button" onClick={() => setJournal((previous) => previous.filter((item) => item.id !== entry.id))}>Delete entry</button>
              </article>
            ))}
          </section>
        </main>
      );
    }

    if (page === 'saved') {
      return (
        <main className="content-page">
          <section className="page-intro">
            <p className="eyebrow">Keep close what speaks to you</p>
            <h2>Saved verses & recent reads</h2>
            <p>Your saved passages and reading history are stored privately in this browser.</p>
          </section>
          <section className="saved-section panel">
            <div className="section-heading"><div><p className="mini-label">Your collection</p><h3>Saved verses</h3></div><span className="subtle-label">{favourites.length} saved</span></div>
            {favourites.length === 0 ? <p className="empty-state">Save a verse while reading to see it here.</p> : favourites.map((item) => (
              <article className="saved-verse" key={item.id}>
                <button className="saved-verse-open" onClick={() => goToReference(item)}><strong>{item.reference}</strong><span>{item.text}</span></button>
                <button className="icon-button" aria-label={`Remove ${item.reference}`} onClick={() => setFavourites((previous) => previous.filter((saved) => saved.id !== item.id))}>×</button>
              </article>
            ))}
          </section>
          <section className="saved-section panel">
            <div className="section-heading"><div><p className="mini-label">Continue where you left off</p><h3>Recent reads</h3></div></div>
            {history.length === 0 ? <p className="empty-state">Your recent readings will appear here.</p> : history.map((item) => (
              <button className="recent-item" key={item.id} onClick={() => goToReference(item)}><span>{item.reference}</span><span aria-hidden="true">→</span></button>
            ))}
          </section>
        </main>
      );
    }

    return (
      <HomeDashboard
        onNavigate={setPage}
        onOpenScripture={openScriptureReference}
        onOpenSession={openSeminarSession}
        reminders={reminders}
        notificationPermission={notificationPermission}
        seminarProgress={seminarProgress}
        growthSummary={growthSummary}
        journalCount={journal.length}
        lastRead={history[0] || null}
        onContinueReading={() => { if (history[0]) goToReference(history[0]); else setPage('bible'); }}
        onOpenEncouragement={() => { setPage('encouragement'); setEncouragementCursor(0); }}
      />
    );
  };

  return (
    <div className={page === 'home' ? 'app-shell is-home' : 'app-shell'}>
      <SiteNavigation />
      <header className="topbar">
        <button className="brand-wrap" onClick={() => setPage('home')} aria-label="Life in the Spirit home">
          <span className="brand-mark">✦</span>
          <span className="brand-name"><span className="brand-eyebrow">The Living Word</span><strong>Life in the Spirit</strong></span>
        </button>
        <nav className="top-navigation" aria-label="Main navigation">
          {navItems.map((item) => (
            <button key={item.id} className={isNavItemActive(item.id, page) ? 'top-navigation-item active' : 'top-navigation-item'} aria-current={page === item.id ? 'page' : undefined} onClick={() => setPage(item.id)}>{item.label}</button>
          ))}
        </nav>
        <div className="topbar-actions">
          <span className={isOnline ? 'connection-status' : 'connection-status offline'}><span />{isOnline ? 'Online' : 'Offline mode'}</span>
          <button className="icon-button theme-button" onClick={() => setTheme((previous) => previous === 'light' ? 'dark' : 'light')} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>{theme === 'light' ? '☾' : '☀'}</button>
          <button className="install-button" onClick={installApp} disabled={isInstalled}>{isInstalled ? 'Installed ✓' : '↓ Install'}</button>
        </div>
      </header>
      {notice && <div className="app-notice" role="status"><span>{notice}</span><button onClick={() => setNotice('')} aria-label="Dismiss">×</button></div>}
      {renderPage()}
      <nav className="bottom-nav" aria-label="Main navigation">
        {navItems.map((item) => (
          <button key={item.id} className={isNavItemActive(item.id, page) ? 'bottom-nav-item active' : 'bottom-nav-item'} onClick={() => { setPage(item.id); setNotice(''); }} aria-label={item.label} aria-current={isNavItemActive(item.id, page) ? 'page' : undefined}>
            <span className="bottom-nav-icon" aria-hidden="true">{item.icon}</span><span>{item.mobileLabel || item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;
