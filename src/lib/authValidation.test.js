import test from 'node:test';
import assert from 'node:assert/strict';
import { validateAccount } from './authValidation.js';

const valid = { mode: 'signup', fullName: 'Community Member', email: 'person@example.test', password: 'password123', confirmPassword: 'password123' };

test('requires a name, valid email and matching strong-enough registration passwords', () => {
  assert.equal(validateAccount(valid), '');
  assert.match(validateAccount({ ...valid, fullName: '   ' }), /full name/i);
  assert.match(validateAccount({ ...valid, email: 'invalid' }), /email/i);
  assert.match(validateAccount({ ...valid, password: 'short' }), /8 characters/i);
  assert.match(validateAccount({ ...valid, confirmPassword: 'different' }), /match/i);
});

test('sign-in accepts existing passwords without imposing registration policy', () => {
  assert.equal(validateAccount({ ...valid, mode: 'signin', password: 'short' }), '');
  assert.match(validateAccount({ ...valid, mode: 'signin', password: '' }), /password/i);
});

test('password recovery validates email or new matching passwords as appropriate', () => {
  assert.equal(validateAccount({ ...valid, mode: 'forgot', password: '' }), '');
  assert.match(validateAccount({ ...valid, mode: 'forgot', email: '' }), /email/i);
  assert.equal(validateAccount({ ...valid, mode: 'reset', email: '' }), '');
  assert.match(validateAccount({ ...valid, mode: 'reset', confirmPassword: 'different' }), /match/i);
});
