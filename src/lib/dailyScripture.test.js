import test from 'node:test';
import assert from 'node:assert/strict';
import { DAILY_SCRIPTURES, extractPassageText, getDailyScripture } from './dailyScripture.js';

test('chooses the same scripture all day and a different one the next day', () => {
  const morning = getDailyScripture(new Date(2026, 9, 17, 0, 5));
  const night = getDailyScripture(new Date(2026, 9, 17, 23, 55));
  const tomorrow = getDailyScripture(new Date(2026, 9, 18, 9, 0));
  assert.equal(morning, night);
  assert.notEqual(morning, tomorrow);
});

test('rotates through every scripture before repeating', () => {
  const seen = new Set();
  for (let offset = 0; offset < DAILY_SCRIPTURES.length; offset += 1) {
    seen.add(getDailyScripture(new Date(2026, 0, 1 + offset)).label);
  }
  assert.equal(seen.size, DAILY_SCRIPTURES.length);
});

test('extracts only the requested verse range', () => {
  const verses = [1, 2, 3, 4].map((verse) => ({ verse, text: `v${verse}` }));
  assert.equal(extractPassageText(verses, { start: 2, end: 3 }), 'v2 v3');
  assert.equal(extractPassageText(verses, { start: 9, end: 9 }), '');
  assert.equal(extractPassageText(null, { start: 1, end: 1 }), '');
});
