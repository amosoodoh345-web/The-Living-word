import test from 'node:test';
import assert from 'node:assert/strict';
import { matchesReadingIntent } from './readingHistory.js';

test('does not record a passage when there is no user reading intent', () => {
  assert.equal(matchesReadingIntent(null, { book: 'Genesis', chapter: 1, verse: 1 }), false);
});

test('records only the passage matching an explicit reading intent', () => {
  const intent = { book: 'John', chapter: 3, verse: 16 };

  assert.equal(matchesReadingIntent(intent, { ...intent }), true);
  assert.equal(matchesReadingIntent(intent, { ...intent, verse: 17 }), false);
  assert.equal(matchesReadingIntent(intent, { ...intent, book: 'Genesis' }), false);
});
