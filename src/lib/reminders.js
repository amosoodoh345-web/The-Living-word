export const DEFAULT_REMINDERS = [
  {
    id: 'monday-prayer',
    day: 1,
    dayName: 'Monday',
    message: "It's time to go to Prayer Meeting!",
    time: '18:30',
    enabled: true
  },
  {
    id: 'wednesday-bible-study',
    day: 3,
    dayName: 'Wednesday',
    message: "It's time for Bible Study!",
    time: '18:30',
    enabled: true
  },
  {
    id: 'saturday-prayer',
    day: 6,
    dayName: 'Saturday',
    message: "It's time to go to Prayer Meeting!",
    time: '18:30',
    enabled: true
  }
];

const validTime = (value) => typeof value === 'string'
  && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);

export function normalizeReminders(savedReminders) {
  if (!Array.isArray(savedReminders)) return DEFAULT_REMINDERS;

  return DEFAULT_REMINDERS.map((reminder) => {
    const saved = savedReminders.find((entry) => entry?.id === reminder.id);
    if (!saved) return reminder;
    return {
      ...reminder,
      enabled: typeof saved.enabled === 'boolean' ? saved.enabled : reminder.enabled,
      time: validTime(saved.time) ? saved.time : reminder.time
    };
  });
}

export function getDueReminders(reminders, date) {
  const time = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  return reminders.filter((reminder) => (
    reminder.enabled && reminder.day === date.getDay() && reminder.time === time
  ));
}

export function getNextReminder(reminders, date) {
  return reminders
    .filter((reminder) => reminder.enabled)
    .map((reminder) => {
      const [hours, minutes] = reminder.time.split(':').map(Number);
      const occurrence = new Date(date);
      const daysUntil = (reminder.day - date.getDay() + 7) % 7;
      occurrence.setDate(occurrence.getDate() + daysUntil);
      occurrence.setHours(hours, minutes, 0, 0);
      if (occurrence <= date) occurrence.setDate(occurrence.getDate() + 7);
      return { reminder, at: occurrence };
    })
    .sort((a, b) => a.at - b.at)[0] || null;
}

export function reminderFiredKey(reminder, date) {
  const localDate = [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-');
  return `${reminder.id}:${localDate}`;
}
