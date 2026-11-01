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
        checkModerator(newSession);
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
    return <p style={{ padding: 30 }}>Checking administrator access...</p>;
  }

  if (!isSupabaseConfigured || !supabase) {
    return <p style={{ padding: 30 }}>{message}</p>;
  }

  if (!session || !allowed) {
    return (
      <main style={{ maxWidth: 420, margin: '80px auto', padding: 24 }}>
        <h1>LIFEOS Admin</h1>
        <p>Private administrator access</p>

        <form onSubmit={handleLogin}>
          <label htmlFor="admin-email">Email</label>
          <input
            id="admin-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            style={{ display: 'block', width: '100%', padding: 12, margin: '8px 0 16px' }}
          />

          <label htmlFor="admin-password">Password</label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            style={{ display: 'block', width: '100%', padding: 12, margin: '8px 0 16px' }}
          />

          <button type="submit" disabled={checking}>
            Sign in
          </button>
        </form>

        {message && <p role="alert">{message}</p>}
      </main>
    );
  }

  return (
    <>
      <button
        onClick={handleLogout}
        style={{ position: 'fixed', top: 12, right: 12, zIndex: 1000 }}
      >
        Sign out
      </button>

      <AdminDashboard />
    </>
  );
}