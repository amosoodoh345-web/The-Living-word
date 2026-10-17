import test from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_REMINDERS,
  getDueReminders,
  getNextReminder,
  normalizeReminders,
  reminderFiredKey
} from './reminders.js';

test('starts with the three enabled 6:30 PM weekly reminders', () => {
  assert.deepEqual(DEFAULT_REMINDERS.map(({ dayName, message, time, enabled }) => ({
    dayName, message, time, enabled
  })), [
      { dayName: 'Monday', message: "It's time to go to Prayer Meeting!", time: '18:30', enabled: true },
      { dayName: 'Wednesday', message: "It's time for Bible Study!", time: '18:30', enabled: true },
      { dayName: 'Saturday', message: "It's time to go to Prayer Meeting!", time: '18:30', enabled: true }
  ]);
});

test('matches only enabled reminders at their local weekday and time', () => {
  const mondayAt630 = new Date(2026, 9, 19, 18, 30);
  assert.deepEqual(getDueReminders(DEFAULT_REMINDERS, mondayAt630).map(({ id }) => id), ['monday-prayer']);
  assert.deepEqual(getDueReminders(DEFAULT_REMINDERS, new Date(2026, 9, 19, 18, 31)), []);
  assert.deepEqual(getDueReminders(
    normalizeReminders([{ id: 'monday-prayer', enabled: false }]),
    mondayAt630
  ), []);
});

test('preserves valid settings and falls back from invalid saved values', () => {
  const reminders = normalizeReminders([
    { id: 'monday-prayer', enabled: false, time: '19:15' },
    { id: 'wednesday-bible-study', enabled: true, time: '25:99' }
  ]);
  assert.deepEqual({ enabled: reminders[0].enabled, time: reminders[0].time }, { enabled: false, time: '19:15' });
  assert.deepEqual({ enabled: reminders[1].enabled, time: reminders[1].time }, { enabled: true, time: '18:30' });
});

test('creates a once-per-local-day delivery key', () => {
  assert.equal(reminderFiredKey(DEFAULT_REMINDERS[0], new Date(2026, 9, 19, 18, 30)), 'monday-prayer:2026-10-19');
});

test('finds the next enabled reminder using the device local time', () => {
  const next = getNextReminder(DEFAULT_REMINDERS, new Date(2026, 9, 19, 18, 30));
  assert.equal(next.reminder.id, 'wednesday-bible-study');
  assert.equal(next.at.getDay(), 3);
  assert.equal(next.at.getHours(), 18);
  assert.equal(next.at.getMinutes(), 30);
});
