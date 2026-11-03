import React, { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from './lib/supabase';
import AdminDashboard from './AdminDashboard';

export default function AdminAccess() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [allowed, setAllowed] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) {
      setMessage('Supabase is not configured.');
      setChecking(false);
      return;
    }

    let active = true;

    const checkModerator = async (userSession) => {
      if (!active) return;

      setSession(userSession);
      setAllowed(false);

      if (!userSession) {
        setChecking(false);
        return;
      }

      const { data, error } = await supabase.rpc('is_moderator');

      if (!active) return;

      if (error || data !== true) {
        await supabase.auth.signOut();
        setSession(null);
        setMessage('Access denied. This account is not an administrator.');
        setChecking(false);
        return;
      }

      setAllowed(true);
      setMessage('');
      setChecking(false);
    };

    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        setMessage(error.message);
        setChecking(false);
        return;
      }

      checkModerator(data.session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, newSession) => {
        setTimeout(() => checkModerator(newSession), 0);
      }
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    setMessage('');
    setChecking(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
        console.error('LIFEOS LOGIN ERROR:', error);
    }

    if (error) {
      setMessage(error.message);
      setChecking(false);
    }

    setPassword('');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAllowed(false);
    setSession(null);
    setMessage('');
  };

  if (checking) {
    return (
      <main className="lifeos-admin-auth">
        <section className="lifeos-admin-auth-panel" aria-live="polite">
          <span className="lifeos-admin-auth-mark" aria-hidden="true">✦</span>
          <p>Checking administrator access...</p>
        </section>
      </main>
    );
  }

  if (!isSupabaseConfigured || !supabase) {
    return (
      <main className="lifeos-admin-auth">
        <section className="lifeos-admin-auth-panel">
          <span className="lifeos-admin-auth-mark" aria-hidden="true">✦</span>
          <p className="lifeos-admin-auth-eyebrow">THE LIVING WORD</p>
          <h1>LIFEOS Admin</h1>
          <p role="alert">{message}</p>
        </section>
      </main>
    );
  }

  if (!session || !allowed) {
    return (
      <main className="lifeos-admin-auth">
        <section className="lifeos-admin-auth-panel">
          <span className="lifeos-admin-auth-mark" aria-hidden="true">✦</span>
          <p className="lifeos-admin-auth-eyebrow">THE LIVING WORD</p>
          <h1>LIFEOS Admin</h1>
          <p>Sign in with an authorized administrator account.</p>

          <form className="lifeos-admin-auth-form" onSubmit={handleLogin}>
            <label htmlFor="admin-email">Email</label>
            <input
              id="admin-email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />

            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button type="submit" disabled={checking}>
              {checking ? 'Checking access...' : 'Sign in'}
            </button>
          </form>

          {message && <p className="lifeos-admin-auth-message" role="alert">{message}</p>}
        </section>
      </main>
    );
  }

  return (
    <>
      <button
        className="admin-signout-button"
        onClick={handleLogout}
      >
        Sign out
      </button>

      <AdminDashboard />
    </>
  );
}