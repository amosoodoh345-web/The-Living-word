export function accountDestination(session) {
  return session ? 'home' : null;
}

export function confirmationDestination(session) {
  return session ? 'home' : 'signin';
}
