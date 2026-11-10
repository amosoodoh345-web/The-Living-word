import test from 'node:test';
import assert from 'node:assert/strict';
import { PUBLIC_PAGES } from '../data/publicNavigation.js';

test('public navigation contains each intended section once and excludes admin', () => {
  const pages = PUBLIC_PAGES.map(({ page }) => page);
  assert.equal(new Set(pages).size, pages.length);
  assert.deepEqual(pages, [
    'home', 'bible', 'explore', 'seminar', 'devotional', 'wisdom', 'ministries',
    'songs', 'novena', 'rosary', 'chaplet', 'testimonies', 'prayer', 'journal',
    'saved', 'profile', 'reminders', 'growth', 'encouragement'
  ]);
  assert.ok(PUBLIC_PAGES.every(({ label }) => label.trim()));
});
