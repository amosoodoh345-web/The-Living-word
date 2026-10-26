import { useEffect, useMemo, useState } from 'react';
import {
  CHAPLET_STEPS,
  DAILY_PRAYERS,
  DEVOTIONALS,
  HOLY_SPIRIT_NOVENA,
  MINISTRIES,
  ROSARY_MYSTERIES,
  ROSARY_STEPS,
  SEMINAR_SESSIONS,
  SONGS
} from './data/lifeosContent';
import { SEMINAR_DETAILS } from './data/seminarDetails';
import { CHAPLET_PRAYER_SETS, PRAYER_LABELS, PRAYER_TEXTS, ROSARY_MYSTERY_REFERENCES, ROSARY_PRAYER_SETS } from './data/prayerTexts';
import { WISDOM_BOOKS, WISDOM_READINGS } from './data/wisdomReadings';
import { isSupabaseConfigured, supabase } from './lib/supabase';

export const todayIndex = () => Math.floor(Date.now() / 86400000) % DEVOTIONALS.length;

export function ExplorePage({ onNavigate }) {
  const destinations = [
    ['seminar', 'Life in the Spirit Seminar', 'Seven sessions with a Scripture reference and reflection question.'],
    ['devotional', 'Daily devotional', 'A short reading prompt, Scripture reference, and prayer.'],
    ['wisdom', '75 words of wisdom', 'Original reflection notes linked to Proverbs, Ecclesiastes, and Psalms.'],
    ['prayer', 'Prayer library', 'Daily prayer, prayer to the Holy Spirit, and guided devotions.'],
    ['ministries', 'Ministries', 'Explore four ways to serve in parish life.'],
    ['songs', 'Songs and hymns', 'Search titles and creators; lyrics are not reproduced.'],
    ['encouragement', 'Encouragement library', 'Browse the existing collection of original devotional reflections.'],
    ['growth', 'Spiritual growth tracker', 'Mark daily Scripture, prayer, and reflection, and see your streak. Saved on this device.'],
    ['testimonies', 'Testimonies and praise reports', 'Read approved community testimonies, or submit your own for moderator review.']
  ];

  return (
    <main className="content-page lifeos-content-page">
      <section className="page-intro">
        <p className="eyebrow">The Living Word</p>
        <h2>Explore and grow</h2>
        <p>Choose a learning, prayer, or service pathway. Formation outlines are drafts for pastoral review, not official Church teaching.</p>
      </section>
      <section className="lifeos-card-grid" aria-label="The Living Word pathways">
        {destinations.map(([page, title, description]) => (
          <article className="lifeos-pathway" key={page}>
            <p className="mini-label">{page === 'seminar' ? 'Formation' : page === 'ministries' ? 'Service' : 'Resources'}</p>
            <h3>{title}</h3>
            <p>{description}</p>
            <button className="text-button" onClick={() => onNavigate(page)}>Open {title} <span aria-hidden="true">→</span></button>
          </article>
        ))}
        <article className="lifeos-pathway community-notice">
          <p className="mini-label">Launch requirement</p>
          <h3>Shared community features</h3>
          <p>Public testimonies are reviewed by moderators before they appear. Comments and reports are moderated too.</p>
        </article>
      </section>
    </main>
  );
}

export function SeminarPage({ progress, onToggle }) {
  const completedCount = SEMINAR_SESSIONS.filter((session) => progress[session.id]).length;

  return (
    <main className="content-page lifeos-content-page">
      <section className="page-intro">
        <p className="eyebrow">Seven-session formation outline</p>
        <h2>Life in the Spirit Seminar</h2>
        <p>Use each Scripture reference as a starting point for prayer and discussion. This original outline needs pastoral review before being presented as Catholic formation.</p>
      </section>
      <div className="progress-track" role="status" aria-label={`${completedCount} of ${SEMINAR_SESSIONS.length} sessions completed`}>
        <span style={{ width: `${(completedCount / SEMINAR_SESSIONS.length) * 100}%` }} />
        <strong>{completedCount} of {SEMINAR_SESSIONS.length} complete</strong>
      </div>
      <section className="seminar-session-list">
        {SEMINAR_SESSIONS.map((session, index) => (
          <article className={progress[session.id] ? 'seminar-session complete' : 'seminar-session'} key={session.id} id={`session-${session.id}`}>
            <div className="seminar-session-index">{String(index + 1).padStart(2, '0')}</div>
            <div className="seminar-session-copy">
              <p className="mini-label">Session {index + 1} · <span>{session.scripture}</span></p>
              <h3>{session.title}</h3>
              <p>{session.focus}</p>
              <p className="seminar-question"><strong>Reflect:</strong> {session.question}</p>
              {SEMINAR_DETAILS[session.id] && (
                <details className="seminar-details">
                  <summary>Open full session</summary>
                  {SEMINAR_DETAILS[session.id].teaching.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  <p><strong>Prayer:</strong> {SEMINAR_DETAILS[session.id].prayer}</p>
                  <p><strong>Activity:</strong> {SEMINAR_DETAILS[session.id].activity}</p>
                  <p><strong>Sharing questions:</strong></p>
                  <ul>{SEMINAR_DETAILS[session.id].sharing.map((question) => <li key={question}>{question}</li>)}</ul>
                </details>
              )}
            </div>
            <label className="session-complete-control">
              <input type="checkbox" checked={Boolean(progress[session.id])} onChange={() => onToggle(session.id)} />
              <span>{progress[session.id] ? 'Completed' : 'Mark complete'}</span>
            </label>
          </article>
        ))}
      </section>
      <p className="local-data-note">Progress is saved only in this browser on this device.</p>
    </main>
  );
}

export function DevotionalPage({ onOpenBible, onJournal }) {
  const devotional = DEVOTIONALS[todayIndex()];

  return (
    <main className="content-page lifeos-content-page">
      <section className="page-intro">
        <p className="eyebrow">Daily devotional · {new Intl.DateTimeFormat(undefined, { weekday: 'long', month: 'long', day: 'numeric' }).format(new Date())}</p>
        <h2>{devotional.title}</h2>
        <p>Original reflection prompt paired with a Scripture reference. Read the passage in context and use the journal for your own response.</p>
      </section>
      <article className="devotional-reading">
        <p className="mini-label">Scripture to read</p>
        <button className="text-button" onClick={() => onOpenBible(devotional.scripture)}>{devotional.scripture} <span aria-hidden="true">→</span></button>
        <blockquote>{devotional.reflection}</blockquote>
        <p className="devotional-prompt"><strong>Reflect:</strong> {devotional.prompt}</p>
        <p className="devotional-original-note">Reflection text is original and is not a Bible quotation or official Church teaching.</p>
        <div className="devotional-actions">
          <button className="primary-btn small" onClick={() => onJournal(devotional)}>Write a reflection</button>
          <button className="secondary-btn small" onClick={() => onOpenBible(devotional.scripture)}>Read Scripture</button>
        </div>
      </article>
    </main>
  );
}

export function WisdomReadingsPage({ onOpenBible }) {
  const [selectedBook, setSelectedBook] = useState('All books');
  const [query, setQuery] = useState('');
  const filteredReadings = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return WISDOM_READINGS.filter((entry) => {
      const matchesBook = selectedBook === 'All books' || entry.book === selectedBook;
      const matchesQuery = !normalizedQuery || `${entry.title} ${entry.reference} ${entry.reflection}`.toLowerCase().includes(normalizedQuery);
      return matchesBook && matchesQuery;
    });
  }, [query, selectedBook]);

  return (
    <main className="content-page wisdom-page">
      <section className="page-intro">
        <p className="eyebrow">75 original reflection notes · Scripture references</p>
        <h2>Wisdom for the way</h2>
        <p>Explore 25 notes each from Proverbs, Ecclesiastes, and Psalms. These short reflections are not Bible quotations; open the reference to read the passage in context.</p>
      </section>
      <div className="wisdom-toolbar">
        <div className="wisdom-book-filter" aria-label="Filter wisdom by Bible book">
          {WISDOM_BOOKS.map((book) => (
            <button className={selectedBook === book ? 'tab-pill active' : 'tab-pill'} key={book} onClick={() => setSelectedBook(book)} aria-pressed={selectedBook === book}>{book}</button>
          ))}
        </div>
        <label className="field wisdom-search" htmlFor="wisdom-search">
          <span>Search wisdom notes</span>
          <input id="wisdom-search" className="search-box" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try patience, trust, or Psalm 23" />
        </label>
        <span className="subtle-label" aria-live="polite">{filteredReadings.length} of {WISDOM_READINGS.length} notes</span>
      </div>
      <section className="wisdom-reading-list" aria-label="Wisdom reflections">
        {filteredReadings.map((entry, index) => (
          <article className="wisdom-reading-entry" key={entry.id}>
            <span className="wisdom-reading-number">{String(index + 1).padStart(2, '0')}</span>
            <div className="wisdom-reading-copy">
              <p className="mini-label">{entry.book}</p>
              <h3>{entry.title}</h3>
              <p>{entry.reflection}</p>
            </div>
            <button className="text-button wisdom-reference" onClick={() => onOpenBible(entry.reference)}>{entry.reference} <span aria-hidden="true">→</span></button>
          </article>
        ))}
        {filteredReadings.length === 0 && <p className="empty-state">No wisdom notes match that search.</p>}
      </section>
    </main>
  );
}

export function PrayerPage({ prayerFocus, setPrayerFocus, defaultPrayerFocuses, onNavigate }) {
  return (
    <main className="content-page lifeos-content-page">
      <section className="page-intro">
        <p className="eyebrow">Daily prayer</p>
        <h2>A moment of prayer</h2>
        <p>Choose a focus, or use the short original prayers below. These are devotional aids, not official liturgical texts.</p>
      </section>
      <section className="prayer-page-grid">
        <article className="prayer-feature">
          <span className="prayer-symbol" aria-hidden="true">✧</span>
          <p className="mini-label">Selected intention</p>
          <h3>{prayerFocus.title}</h3>
          <p className="prayer-words">{prayerFocus.text}</p>
          <p className="prayer-guidance">Pause, pray in your own words, and seek support from your parish community when needed.</p>
          <button className="secondary-btn" onClick={() => onNavigate('bible')}>Open Bible</button>
        </article>
        <section className="prayer-options">
          <p className="mini-label">Prayer intentions</p>
          <h3>What is on your heart?</h3>
          {defaultPrayerFocuses.map((focus) => (
            <button key={focus.title} className={focus.title === prayerFocus.title ? 'prayer-choice active' : 'prayer-choice'} onClick={() => setPrayerFocus(focus)}>
              <span>{focus.title}</span><span aria-hidden="true">→</span>
            </button>
          ))}
        </section>
      </section>
      <section className="lifeos-prayer-list">
        {DAILY_PRAYERS.map((prayer) => (
          <article className="lifeos-pathway" key={prayer.title}>
            <p className="mini-label">Original devotional prayer</p>
            <h3>{prayer.title}</h3>
            <p>{prayer.text}</p>
          </article>
        ))}
      </section>
      <section className="devotion-guide-links" aria-label="Guided devotions">
        <button className="secondary-btn" onClick={() => onNavigate('novena')}>Holy Spirit Novena</button>
        <button className="secondary-btn" onClick={() => onNavigate('rosary')}>Pray the Rosary</button>
        <button className="secondary-btn" onClick={() => onNavigate('chaplet')}>Divine Mercy Chaplet</button>
      </section>
    </main>
  );
}

export function NovenaPage() {
  const [selectedDay, setSelectedDay] = useState(0);
  const day = HOLY_SPIRIT_NOVENA[selectedDay];

  return (
    <main className="content-page lifeos-content-page">
      <section className="page-intro">
        <p className="eyebrow">Nine-day devotional guide</p>
        <h2>Novena to the Holy Spirit</h2>
        <p>This is an original prayer guide inspired by the traditional novena. It is not an official liturgical text; please seek pastoral review before publication.</p>
      </section>
      <div className="novena-day-picker" aria-label="Choose a novena day">
        {HOLY_SPIRIT_NOVENA.map((entry, index) => (
          <button className={selectedDay === index ? 'chapter-button active' : 'chapter-button'} key={entry.focus} onClick={() => setSelectedDay(index)} aria-pressed={selectedDay === index}>{index + 1}</button>
        ))}
      </div>
      <article className="devotional-reading" aria-live="polite">
        <p className="mini-label">Day {selectedDay + 1} of 9</p>
        <h3>{day.focus}</h3>
        <p>{day.prayer}</p>
        <p className="devotional-original-note">A short original prayer; not an approved or official Church formula.</p>
        <div className="devotional-actions">
          <button className="secondary-btn small" onClick={() => setSelectedDay((selectedDay + 8) % 9)}>Previous day</button>
          <button className="primary-btn small" onClick={() => setSelectedDay((selectedDay + 1) % 9)}>Next day</button>
        </div>
      </article>
    </main>
  );
}

export function PrayerGuidePage({ kind }) {
  const isRosary = kind === 'rosary';
  const [selectedMystery, setSelectedMystery] = useState(0);
  const [step, setStep] = useState(0);
  const steps = isRosary ? ROSARY_STEPS : CHAPLET_STEPS;
  const mystery = ROSARY_MYSTERIES[selectedMystery];
  const currentStep = Math.min(step, steps.length - 1);

  return (
    <main className="content-page lifeos-content-page">
      <section className="page-intro">
        <p className="eyebrow">Interactive prayer guide</p>
        <h2>{isRosary ? 'The Holy Rosary' : 'Divine Mercy Chaplet'}</h2>
        <p>Follow one step at a time. Traditional prayers are shown in full; confirm the wording your parish prefers. Original guide text is not an official liturgical book.</p>
      </section>
      {isRosary && (
        <section className="mystery-picker" aria-label="Choose Rosary mysteries">
          {ROSARY_MYSTERIES.map((entry, index) => (
            <button className={selectedMystery === index ? 'tab-pill active' : 'tab-pill'} key={entry.name} onClick={() => { setSelectedMystery(index); setStep(0); }} aria-pressed={selectedMystery === index}>{entry.name}</button>
          ))}
          <p className="subtle-label">Customarily prayed {mystery.days}.</p>
          <ol className="mystery-list">{mystery.mysteries.map((name, index) => <li key={name}>{name}{ROSARY_MYSTERY_REFERENCES[mystery.name]?.[index] ? ` (${ROSARY_MYSTERY_REFERENCES[mystery.name][index]})` : ''}</li>)}</ol>
        </section>
      )}
      <article className="devotional-reading guide-step" aria-live="polite">
        <p className="mini-label">Step {currentStep + 1} of {steps.length}</p>
        <p>{steps[currentStep]}</p>
        {(isRosary ? ROSARY_PRAYER_SETS : CHAPLET_PRAYER_SETS)[currentStep]?.map((key) => (
          <details className="prayer-text" key={key}>
            <summary>{PRAYER_LABELS[key]}</summary>
            <p>{PRAYER_TEXTS[key]}</p>
          </details>
        ))}
        <div className="devotional-actions">
          <button className="secondary-btn small" onClick={() => setStep((currentStep + steps.length - 1) % steps.length)}>Previous step</button>
          <button className="primary-btn small" onClick={() => setStep((currentStep + 1) % steps.length)}>Next step</button>
        </div>
      </article>
    </main>
  );
}

export function MinistriesPage() {
  return (
    <main className="content-page lifeos-content-page">
      <section className="page-intro">
        <p className="eyebrow">Serve with your parish</p>
        <h2>Ministries directory</h2>
        <p>These are general ministry descriptions. Participation, safeguarding, and pastoral guidance are determined by each parish and diocese.</p>
      </section>
      <section className="lifeos-card-grid">
        {MINISTRIES.map((ministry) => (
          <article className="lifeos-pathway" key={ministry.name}>
            <p className="mini-label">Ministry</p>
            <h3>{ministry.name}</h3>
            <p>{ministry.focus}</p>
            <p className="ministry-next-step"><strong>Getting started:</strong> {ministry.nextStep}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export function SongsPage() {
  const [query, setQuery] = useState('');
  const filteredSongs = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return SONGS.filter((song) => `${song.title} ${song.creator} ${song.type} ${song.language}`.toLowerCase().includes(normalizedQuery));
  }, [query]);

  return (
    <main className="content-page lifeos-content-page">
      <section className="page-intro">
        <p className="eyebrow">Searchable catalogue · no lyrics</p>
        <h2>Charismatic songs and hymns</h2>
        <p>Search song titles and creators. Lyrics and recordings are not included; confirm permissions before adding or sharing copyrighted material.</p>
      </section>
      <label className="song-search-label" htmlFor="song-search">Search catalogue</label>
      <input id="song-search" className="search-box" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title, creator, or style" />
      <p className="subtle-label" aria-live="polite">{filteredSongs.length} songs</p>
      <section className="song-catalogue">
        {filteredSongs.map((song) => (
          <article className="song-entry" key={song.title}>
            <div><p className="mini-label">{song.type} · {song.language}</p><h3>{song.title}</h3><p>{song.creator}</p></div>
            <p className="song-license-note">{song.usage}</p>
          </article>
        ))}
        {filteredSongs.length === 0 && <p className="empty-state">No catalogue entries match that search.</p>}
      </section>
    </main>
  );
}

export function TestimoniesPage({ reports, onAdd, onDelete, initialExperience = '', onPrefillConsumed }) {
  const [title, setTitle] = useState(() => initialExperience ? 'My experience' : '');
  const [story, setStory] = useState(initialExperience);
  const [category, setCategory] = useState('testimony');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [session, setSession] = useState(null);
  const [isModerator, setIsModerator] = useState(false);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [mySubmissions, setMySubmissions] = useState([]);
  const [pendingSubmissions, setPendingSubmissions] = useState([]);
  const [pendingComments, setPendingComments] = useState([]);
  const [moderationReports, setModerationReports] = useState([]);
  const [commentDrafts, setCommentDrafts] = useState({});
  const [isLoadingCommunity, setIsLoadingCommunity] = useState(false);
  const [reportingId, setReportingId] = useState('');
  const [reportReason, setReportReason] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (initialExperience) onPrefillConsumed?.('');
  }, [initialExperience, onPrefillConsumed]);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;
    let isCurrent = true;

    supabase.auth.getSession().then(({ data, error }) => {
      if (!isCurrent) return;
      if (error) setMessage('Could not restore your sign-in session. Please sign in again.');
      setSession(data?.session || null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setMessage('');
    });

    return () => {
      isCurrent = false;
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured) return undefined;
    let isCurrent = true;
    setIsLoadingCommunity(true);

    const loadCommunity = async () => {
      try {
        const publicResult = await supabase
          .from('testimonies')
          .select('id, title, body, category, created_at')
          .eq('status', 'approved')
          .order('created_at', { ascending: false })
          .limit(50);
        const ownResult = session
          ? await supabase
              .from('testimonies')
              .select('id, user_id, title, body, category, status, created_at')
              .eq('user_id', session.user.id)
              .order('created_at', { ascending: false })
              .limit(50)
          : { data: [], error: null };
        const moderatorResult = session
          ? await supabase.rpc('is_moderator')
          : { data: false, error: null };
        const postIds = (publicResult.data || []).map((post) => post.id);
        const commentsResult = publicResult.error || postIds.length === 0
          ? { data: [], error: null }
          : await supabase
              .from('testimony_comments')
              .select('id, testimony_id, body, created_at')
              .in('testimony_id', postIds)
              .eq('status', 'approved')
              .order('created_at', { ascending: true });

        if (!isCurrent) return;
        if (publicResult.error || ownResult.error || moderatorResult.error || commentsResult.error) {
          setMessage('The community feed is not available. Check all Supabase migrations and access policies.');
          setIsModerator(false);
          setPendingSubmissions([]);
          setPendingComments([]);
          setModerationReports([]);
        } else {
          const moderator = moderatorResult.data === true;
          const commentsByPost = new Map();
          for (const comment of commentsResult.data || []) {
            const group = commentsByPost.get(comment.testimony_id) || [];
            group.push(comment);
            commentsByPost.set(comment.testimony_id, group);
          }
          setCommunityPosts((publicResult.data || []).map((post) => ({
            ...post,
            comments: commentsByPost.get(post.id) || []
          })));
          setMySubmissions(ownResult.data || []);
          setIsModerator(moderator);

          if (moderator) {
            const [pendingResult, commentsPendingResult, reportsResult] = await Promise.all([
              supabase
                .from('testimonies')
                .select('id, user_id, title, body, category, created_at')
                .eq('status', 'pending')
                .order('created_at', { ascending: true })
                .limit(100),
              supabase
                .from('testimony_comments')
                .select('id, testimony_id, user_id, body, created_at')
                .eq('status', 'pending')
                .order('created_at', { ascending: true })
                .limit(100),
              supabase
                .from('testimony_reports')
                .select('id, testimony_id, reporter_id, reason, created_at, testimonies!inner(title)')
                .eq('status', 'open')
                .order('created_at', { ascending: true })
                .limit(100)
            ]);

            if (!isCurrent) return;
            if (pendingResult.error || commentsPendingResult.error || reportsResult.error) {
              setMessage('The moderator queue could not load. Confirm the moderation migration is applied.');
            } else {
              setPendingSubmissions(pendingResult.data || []);
              setPendingComments(commentsPendingResult.data || []);
              setModerationReports(reportsResult.data || []);
            }
          } else {
            setPendingSubmissions([]);
            setPendingComments([]);
            setModerationReports([]);
          }
        }
      } catch {
        if (!isCurrent) return;
        setMessage('The community service could not be reached. Check your connection and Supabase configuration.');
      } finally {
        if (isCurrent) setIsLoadingCommunity(false);
      }
    };

    loadCommunity();

    return () => {
      isCurrent = false;
    };
  }, [session]);

  const handleAuthentication = async (event) => {
    event.preventDefault();
    setMessage('');
    const result = isSigningUp
      ? await supabase.auth.signUp({ email: email.trim(), password })
      : await supabase.auth.signInWithPassword({ email: email.trim(), password });

    if (result.error) {
      setMessage(result.error.message);
    } else if (isSigningUp && !result.data.session) {
      setMessage('Check your email to confirm your account, then sign in.');
    } else {
      setSession(result.data.session);
      setPassword('');
      setMessage(isSigningUp ? 'Account created. You can now submit a testimony for review.' : 'You are signed in.');
    }
  };

  const submitCommunityPost = async (event) => {
    event.preventDefault();
    if (!session || !title.trim() || !story.trim()) return;
    setMessage('');
    const { error } = await supabase.from('testimonies').insert({
      user_id: session.user.id,
      title: title.trim(),
      body: story.trim(),
      category,
      status: 'pending'
    });

    if (error) {
      setMessage('Your testimony could not be submitted. Please try again.');
      return;
    }

    setTitle('');
    setStory('');
    setMySubmissions((previous) => [{
      id: `pending-${Date.now()}`,
      title: title.trim(),
      body: story.trim(),
      category,
      status: 'pending',
      created_at: new Date().toISOString()
    }, ...previous]);
    setMessage('Submitted for moderator review. It will appear publicly only if approved.');
  };

  const submitCommunityComment = async (event, testimonyId) => {
    event.preventDefault();
    const body = (commentDrafts[testimonyId] || '').trim();
    if (!session || !body) return;

    const { error } = await supabase.from('testimony_comments').insert({
      testimony_id: testimonyId,
      user_id: session.user.id,
      body,
      status: 'pending'
    });

    if (error) {
      setMessage('Your comment could not be submitted. Please try again.');
      return;
    }

    setCommentDrafts((previous) => ({ ...previous, [testimonyId]: '' }));
    setPendingComments((previous) => [{
      id: `pending-${Date.now()}`,
      testimony_id: testimonyId,
      user_id: session.user.id,
      body,
      created_at: new Date().toISOString()
    }, ...previous]);
    setMessage('Comment submitted for review. It will appear after a moderator approves it.');
  };

  const submitReport = async (event, testimonyId) => {
    event.preventDefault();
    if (!session || !reportReason.trim()) return;
    const { error } = await supabase.from('testimony_reports').insert({
      testimony_id: testimonyId,
      reporter_id: session.user.id,
      reason: reportReason.trim()
    });

    setMessage(error ? 'This report could not be submitted.' : 'Thank you. The report was sent to moderators.');
    setReportReason('');
    setReportingId('');
  };

  const moderateSubmission = async (submission, status) => {
    const { error } = await supabase
      .from('testimonies')
      .update({ status })
      .eq('id', submission.id);

    if (error) {
      setMessage('That moderation decision could not be saved.');
      return;
    }

    setPendingSubmissions((previous) => previous.filter((entry) => entry.id !== submission.id));
    setMySubmissions((previous) => previous.map((entry) => entry.id === submission.id ? { ...entry, status } : entry));
    if (status === 'approved') {
      setCommunityPosts((previous) => [{ ...submission, status, created_at: submission.created_at }, ...previous]);
    }
    setMessage(`Submission ${status}.`);
  };

  const moderateComment = async (comment, status) => {
    const { error } = await supabase
      .from('testimony_comments')
      .update({ status })
      .eq('id', comment.id);

    if (error) {
      setMessage('That comment moderation decision could not be saved.');
      return;
    }

    setPendingComments((previous) => previous.filter((entry) => entry.id !== comment.id));
    if (status === 'approved') {
      setCommunityPosts((previous) => previous.map((post) => post.id === comment.testimony_id
        ? { ...post, comments: [...(post.comments || []), { ...comment, status }] }
        : post));
    }
    setMessage(`Comment ${status}.`);
  };

  const resolveModerationReport = async (report) => {
    const { error } = await supabase
      .from('testimony_reports')
      .update({ status: 'resolved', resolved_by: session.user.id, resolved_at: new Date().toISOString() })
      .eq('id', report.id);

    if (error) {
      setMessage('That report could not be marked resolved.');
      return;
    }

    setModerationReports((previous) => previous.filter((entry) => entry.id !== report.id));
    setMessage('Report marked resolved.');
  };

  const savePrivateDraft = (event) => {
    event.preventDefault();
    if (!title.trim() || !story.trim()) return;
    onAdd({ id: `${Date.now()}`, title: title.trim(), text: story.trim(), category, date: new Date().toLocaleDateString(undefined, { dateStyle: 'medium' }) });
    setTitle('');
    setStory('');
    setMessage('Private draft saved on this device.');
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    setMessage(error ? 'Could not sign out. Please try again.' : 'You are signed out.');
  };

  return (
    <main className="content-page lifeos-content-page">
      <section className="page-intro">
        <p className="eyebrow">Praise reports and testimonies</p>
        <h2>Stories of faith</h2>
        <p>Community submissions are reviewed before publication. Do not include private details about yourself or another person without consent.</p>
      </section>
      {!isSupabaseConfigured ? (
        <section className="community-setup-notice" role="status">
          <h3>Community publishing is not configured</h3>
          <p>Set the Supabase URL and anon key, then apply the database migration to enable sign-in, reviewed submissions, and the community feed.</p>
        </section>
      ) : (
        <>
          <section className="community-panel">
            <div className="section-heading"><div><p className="mini-label">Community feed</p><h3>Approved stories</h3></div><span className="subtle-label">Reviewed before publishing</span></div>
            {isLoadingCommunity ? <p className="subtle-label">Loading community stories…</p> : communityPosts.length === 0 ? <p className="empty-state">No approved stories have been published yet.</p> : communityPosts.map((post) => (
              <article className="community-post" key={post.id}>
                <p className="mini-label">{post.category === 'praise_report' ? 'Praise report' : 'Testimony'} · {new Date(post.created_at).toLocaleDateString()}</p>
                <h4>{post.title}</h4><p>{post.body}</p>
                <div className="community-comment-thread">
                  <p className="mini-label">Conversation · {post.comments?.length || 0}</p>
                  {(post.comments || []).map((comment) => (
                    <div className="community-comment" key={comment.id}>
                      <span>Community member</span><p>{comment.body}</p>
                    </div>
                  ))}
                  {session ? (
                    <form className="community-comment-form" onSubmit={(event) => submitCommunityComment(event, post.id)}>
                      <label htmlFor={`comment-${post.id}`}>Add a comment</label>
                      <textarea id={`comment-${post.id}`} value={commentDrafts[post.id] || ''} onChange={(event) => setCommentDrafts((previous) => ({ ...previous, [post.id]: event.target.value }))} maxLength={2000} required />
                      <button className="secondary-btn small" type="submit">Comment for review</button>
                    </form>
                  ) : <p className="subtle-label">Sign in below to join the conversation. Comments are reviewed before appearing.</p>}
                </div>
                {session && <button className="text-button" onClick={() => { setReportingId(post.id); setReportReason(''); }}>Report this story</button>}
                {reportingId === post.id && (
                  <form className="report-form" onSubmit={(event) => submitReport(event, post.id)}>
                    <label htmlFor={`report-reason-${post.id}`}>Why are you reporting this?</label>
                    <textarea id={`report-reason-${post.id}`} value={reportReason} onChange={(event) => setReportReason(event.target.value)} maxLength={500} required />
                    <button className="secondary-btn small" type="submit">Send report</button>
                  </form>
                )}
              </article>
            ))}
          </section>

          {isModerator && (
            <>
              <section className="community-panel moderation-queue">
                <div className="section-heading"><div><p className="mini-label">Moderator tools</p><h3>Pending submissions</h3></div><span className="subtle-label">{pendingSubmissions.length} awaiting review</span></div>
                {pendingSubmissions.length === 0 ? <p className="empty-state">No submissions are waiting for review.</p> : pendingSubmissions.map((submission) => (
                  <article className="community-post moderation-item" key={submission.id}>
                    <p className="mini-label">{submission.category === 'praise_report' ? 'Praise report' : 'Testimony'} · {new Date(submission.created_at).toLocaleString()}</p>
                    <h4>{submission.title}</h4><p>{submission.body}</p>
                    <div className="moderation-actions">
                      <button className="primary-btn small" onClick={() => moderateSubmission(submission, 'approved')}>Approve</button>
                      <button className="secondary-btn small" onClick={() => moderateSubmission(submission, 'rejected')}>Reject</button>
                    </div>
                  </article>
                ))}
              </section>
              <section className="community-panel moderation-queue">
                <div className="section-heading"><div><p className="mini-label">Conversation review</p><h3>Pending comments</h3></div><span className="subtle-label">{pendingComments.length} awaiting review</span></div>
                {pendingComments.length === 0 ? <p className="empty-state">No comments are waiting for review.</p> : pendingComments.map((comment) => (
                  <article className="community-post moderation-item" key={comment.id}>
                    <p className="mini-label">Comment · {new Date(comment.created_at).toLocaleString()}</p>
                    <p>{comment.body}</p>
                    <div className="moderation-actions">
                      <button className="primary-btn small" onClick={() => moderateComment(comment, 'approved')}>Approve comment</button>
                      <button className="secondary-btn small" onClick={() => moderateComment(comment, 'rejected')}>Reject comment</button>
                    </div>
                  </article>
                ))}
              </section>
              <section className="community-panel moderation-queue">
                <div className="section-heading"><div><p className="mini-label">Safety</p><h3>Open reports</h3></div><span className="subtle-label">{moderationReports.length} open</span></div>
                {moderationReports.length === 0 ? <p className="empty-state">No open reports.</p> : moderationReports.map((report) => (
                  <article className="community-post moderation-item" key={report.id}>
                    <p className="mini-label">Report · {new Date(report.created_at).toLocaleString()}</p>
                    <h4>{report.testimonies?.title || 'Reported testimony'}</h4>
                    <p>{report.reason}</p>
                    <div className="moderation-actions">
                      <button className="secondary-btn small" onClick={() => resolveModerationReport(report)}>Mark resolved</button>
                      <button className="text-button" onClick={() => moderateSubmission({ id: report.testimony_id }, 'rejected')}>Reject reported story</button>
                    </div>
                  </article>
                ))}
              </section>
            </>
          )}

          {session ? (
            <>
              <section className="community-panel">
                <div className="section-heading"><div><p className="mini-label">Your account</p><h3>Signed in</h3></div><button className="secondary-btn small" onClick={handleSignOut}>Sign out</button></div>
                <p className="subtle-label">{session.user.email}</p>
              </section>
              <form className="journal-form panel" onSubmit={submitCommunityPost}>
                <h3>Submit for review</h3>
                <label htmlFor="testimony-category">Story type</label>
                <select id="testimony-category" value={category} onChange={(event) => setCategory(event.target.value)}>
                  <option value="testimony">Testimony</option><option value="praise_report">Praise report</option>
                </select>
                <label htmlFor="testimony-title">Title</label>
                <input id="testimony-title" className="search-box" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={120} required />
                <label htmlFor="testimony-story">Your story</label>
                <textarea id="testimony-story" value={story} onChange={(event) => setStory(event.target.value)} rows="6" maxLength={5000} required />
                <div className="journal-form-footer"><span className="subtle-label">New submissions are private until approved.</span><button className="primary-btn" type="submit">Submit for review</button></div>
              </form>
              <section className="testimony-list" aria-label="Your submissions">
                <h3>Your submissions</h3>
                {mySubmissions.length === 0 ? <p className="empty-state">You have no submissions yet.</p> : mySubmissions.map((post) => (
                  <article className="lifeos-pathway" key={post.id}>
                    <p className="mini-label">{post.category === 'praise_report' ? 'Praise report' : 'Testimony'} · {post.status}</p><h3>{post.title}</h3><p>{post.body}</p>
                  </article>
                ))}
              </section>
            </>
          ) : (
            <form className="journal-form panel" onSubmit={handleAuthentication}>
              <div className="section-heading"><div><p className="mini-label">Community account</p><h3>{isSigningUp ? 'Create an account' : 'Sign in to share'}</h3></div></div>
              <label htmlFor="community-email">Email</label>
              <input id="community-email" className="search-box" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
              <label htmlFor="community-password">Password</label>
              <input id="community-password" className="search-box" type="password" autoComplete={isSigningUp ? 'new-password' : 'current-password'} minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required />
              <div className="journal-form-footer"><button className="primary-btn" type="submit">{isSigningUp ? 'Create account' : 'Sign in'}</button><button className="text-button" type="button" onClick={() => setIsSigningUp((value) => !value)}>{isSigningUp ? 'I already have an account' : 'Create an account'}</button></div>
              <p className="subtle-label">Email confirmation may be required. Your email is not shown with public stories.</p>
            </form>
          )}
        </>
      )}

      {message && <p className="community-message" role="status">{message}</p>}

      <details className="private-drafts-details">
        <summary>Private drafts saved on this device ({reports.length})</summary>
        <form className="journal-form panel" onSubmit={savePrivateDraft}>
          <label htmlFor="private-testimony-title">Private draft title</label>
          <input id="private-testimony-title" className="search-box" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={120} required />
          <label htmlFor="private-testimony-story">Private praise report or testimony</label>
          <textarea id="private-testimony-story" value={story} onChange={(event) => setStory(event.target.value)} rows="6" maxLength={5000} required />
          <div className="journal-form-footer"><span className="subtle-label">Private on this device · not submitted</span><button className="secondary-btn" type="submit">Save private draft</button></div>
        </form>
        <section className="testimony-list" aria-label="Private testimony drafts">
          {reports.length === 0 ? <p className="empty-state">No private drafts saved on this device.</p> : reports.map((report) => (
            <article className="lifeos-pathway" key={report.id}>
              <p className="mini-label">Private draft · {report.date}</p><h3>{report.title}</h3><p>{report.text}</p>
              <button className="text-button" onClick={() => onDelete(report.id)}>Delete draft</button>
            </article>
          ))}
        </section>
      </details>
    </main>
  );
}
