import test from 'node:test';
import assert from 'node:assert/strict';
import { getGrowthSummary, localDateKey, toggleDailyPractice } from './spiritualGrowth.js';

test('toggles a known practice for the local calendar date', () => {
  const monday = new Date(2026, 9, 19, 18, 30);
  const checked = toggleDailyPractice({}, 'scripture', monday);
  assert.deepEqual(checked[localDateKey(monday)], ['scripture']);
  assert.deepEqual(toggleDailyPractice(checked, 'scripture', monday)[localDateKey(monday)], []);
  assert.equal(toggleDailyPractice(checked, 'unknown', monday), checked);
});

test('summarizes practices, active days, and streaks across more than one week', () => {
  const monday = new Date(2026, 9, 19, 12);
  const activity = {};
  for (let offset = 0; offset < 9; offset += 1) {
    const day = new Date(monday);
    day.setDate(day.getDate() - offset);
    activity[localDateKey(day)] = ['scripture'];
  }

  assert.deepEqual(getGrowthSummary(activity, monday), {
    todayCompleted: 1,
    activeDaysThisWeek: 7,
    currentStreak: 9,
    totalPractices: 9
  });
});

test('keeps the previous day streak active when no practice has been recorded today', () => {
  const tuesday = new Date(2026, 9, 20, 12);
  const monday = new Date(2026, 9, 19, 12);
  const activity = { [localDateKey(monday)]: ['prayer'] };
  assert.equal(getGrowthSummary(activity, tuesday).currentStreak, 1);
});
