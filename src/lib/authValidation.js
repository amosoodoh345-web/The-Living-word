export function validateAccount({ mode, fullName, email, password, confirmPassword }) {
  if (mode === 'signup' && !fullName.trim()) return 'Enter your full name.';
  if (mode !== 'reset' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return 'Enter a valid email address.';
  if (mode !== 'forgot' && !password) return 'Enter your password.';
  if ((mode === 'signup' || mode === 'reset') && password.length < 8) return 'Use a password of at least 8 characters.';
  if ((mode === 'signup' || mode === 'reset') && password !== confirmPassword) return 'Passwords do not match.';
  return '';
}
