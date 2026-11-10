import { useState } from 'react';
import { supabase } from './lib/supabase';
import { validateAccount } from './lib/authValidation';
import { accountDestination } from './lib/authNavigation';
import './AuthPage.css';

const headings = {
  signin: 'Welcome back',
  signup: 'Create your account',
  forgot: 'Reset your password',
  reset: 'Choose a new password',
};

function authRedirect(type) {
  const url = new URL(window.location.href);
  url.search = '';
  url.hash = '';
  url.searchParams.set('auth', type);
  return url.toString();
}

export default function AuthPage({ mode, session, onNavigate }) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  async function submit(event) {
    event.preventDefault();
    setError('');
    setMessage('');
    const invalid = validateAccount({ mode, fullName, email, password, confirmPassword });
    if (invalid) {
      setError(invalid);
      return;
    }
    if (!supabase) {
      setError('Account access is not configured. Please contact the site administrator.');
      return;
    }
    setBusy(true);
    try {
      if (mode === 'signup') {
        const { data, error: authError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { full_name: fullName.trim() }, emailRedirectTo: authRedirect('confirmed') },
        });
        if (authError) throw authError;
        setPassword('');
        setConfirmPassword('');
        const destination = accountDestination(data.session);
        if (destination) {
          onNavigate(destination);
        } else {
          setMessage('You are not signed in yet. If email confirmation is required, check your inbox for a confirmation link, then sign in. You can also explore LIFEOS without an account.');
        }
      } else if (mode === 'signin') {
        const { data, error: authError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (authError) throw authError;
        const destination = accountDestination(data.session);
        if (!destination) throw new Error('Sign-in did not create a session. Please try again.');
        setPassword('');
        onNavigate(destination);
      } else if (mode === 'forgot') {
        const { error: authError } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: authRedirect('recovery') });
        if (authError) throw authError;
        setMessage('If an account exists for this email, check your inbox for a password reset link.');
      } else {
        if (!session) throw new Error('This reset link is invalid or expired. Request a new one.');
        const { error: authError } = await supabase.auth.updateUser({ password });
        if (authError) throw authError;
        setPassword('');
        setConfirmPassword('');
        setMessage('Your password has been updated. You can continue to your profile.');
      }
    } catch (authError) {
      setError(authError.message || 'The account request could not be completed. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="account-page">
      <section className="account-card">
        <button className="account-back" type="button" onClick={() => onNavigate('welcome')}>← Back to welcome</button>
        <p className="account-eyebrow">LIFEOS · THE LIVING WORD</p>
        <h1>{headings[mode]}</h1>
        <p className="account-intro">Your account is for community features. Personal reflections and saved verses remain on this device.</p>
        {error && <p className="account-error" role="alert">{error}</p>}
        {message && <p className="account-success" role="status">{message}</p>}
        {mode === 'reset' && !session ? (
          <p className="account-error" role="alert">This reset link is invalid or expired. Request a new one.</p>
        ) : (
          <form onSubmit={submit} className="account-form">
            {mode === 'signup' && <>
              <label htmlFor="account-name">Full name</label>
              <input id="account-name" autoComplete="name" value={fullName} onChange={(event) => setFullName(event.target.value)} maxLength={120} required />
            </>}
            {mode !== 'reset' && <>
              <label htmlFor="account-email">Email address</label>
              <input id="account-email" type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </>}
            {mode !== 'forgot' && <>
              <label htmlFor="account-password">{mode === 'reset' ? 'New password' : 'Password'}</label>
              <div className="account-password">
                <input id="account-password" type={showPassword ? 'text' : 'password'} autoComplete={mode === 'signin' ? 'current-password' : 'new-password'} value={password} onChange={(event) => setPassword(event.target.value)} required />
                <button type="button" onClick={() => setShowPassword((value) => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? 'Hide' : 'Show'}</button>
              </div>
              {(mode === 'signup' || mode === 'reset') && <>
                <label htmlFor="account-confirm">Confirm password</label>
                <input id="account-confirm" type={showPassword ? 'text' : 'password'} autoComplete="new-password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} required />
                <small>Use at least 8 characters.</small>
              </>}
            </>}
            <button className="account-submit" type="submit" disabled={busy}>
              {busy ? 'Please wait...' : mode === 'signup' ? 'Create account' : mode === 'signin' ? 'Sign in' : mode === 'forgot' ? 'Send reset link' : 'Update password'}
            </button>
          </form>
        )}
        <div className="account-links">
          {mode === 'signin' && <button type="button" onClick={() => onNavigate('forgot')}>Forgot password?</button>}
          {mode !== 'signup' && <button type="button" onClick={() => onNavigate('signup')}>Create an account</button>}
          {mode !== 'signin' && <button type="button" onClick={() => onNavigate('signin')}>Already have an account? Sign in</button>}
          <button type="button" onClick={() => onNavigate('home')}>Explore LIFEOS without signing in</button>
          {session && <button type="button" onClick={() => onNavigate('profile')}>Continue to profile</button>}
        </div>
      </section>
    </main>
  );
}
