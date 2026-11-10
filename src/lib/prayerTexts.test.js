import test from 'node:test';
import assert from 'node:assert/strict';
import { CHAPLET_PRAYER_SETS, PRAYER_LABELS, PRAYER_TEXTS, ROSARY_PRAYER_SETS } from '../data/prayerTexts.js';

test('the Marian litany appears in the fifth Rosary step only', () => {
  const key = 'litanyBlessedVirgin';
  assert.equal(ROSARY_PRAYER_SETS.length, 6);
  assert.ok(ROSARY_PRAYER_SETS[4].includes(key));
  assert.ok(!CHAPLET_PRAYER_SETS.some((set) => set.includes(key)));
  assert.match(PRAYER_LABELS[key], /Litany of the Blessed Virgin Mary/);
  assert.match(PRAYER_TEXTS[key], /Holy Mary, pray for us/);
  assert.match(PRAYER_TEXTS[key], /Lamb of God/);
  assert.match(PRAYER_TEXTS[key], /Amen\.$/);
});
