import test from 'node:test';
import assert from 'node:assert/strict';
import { accountDestination, confirmationDestination } from './authNavigation.js';

test('only an authenticated sign-in or registration proceeds to LIFEOS', () => {
  assert.equal(accountDestination({ user: { id: 'test' } }), 'home');
  assert.equal(accountDestination(null), null);
});

test('confirmation returns signed-in users home and others to sign-in', () => {
  assert.equal(confirmationDestination({ user: { id: 'test' } }), 'home');
  assert.equal(confirmationDestination(null), 'signin');
});
