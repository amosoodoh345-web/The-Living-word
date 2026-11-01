import test from 'node:test';
import assert from 'node:assert/strict';
import { getDailyDevotionalIndex } from './dailyDevotional.js';

test('keeps the devotional index for a local calendar day and advances the next day', () => {
  const count = 14;
  const morning = getDailyDevotionalIndex(count, new Date(2026, 9, 17, 0, 5));
  const night = getDailyDevotionalIndex(count, new Date(2026, 9, 17, 23, 55));
  const tomorrow = getDailyDevotionalIndex(count, new Date(2026, 9, 18, 9, 0));

  assert.equal(morning, night);
  assert.equal(tomorrow, (morning + 1) % count);
});
