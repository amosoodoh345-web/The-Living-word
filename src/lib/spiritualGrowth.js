export const GROWTH_PRACTICES = [
  { id: 'scripture', label: 'Read Scripture' },
  { id: 'prayer', label: 'Spend time in prayer' },
  { id: 'reflection', label: 'Reflect or journal' }
];

export function localDateKey(date = new Date()) {
  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0')
  ].join('-');
}

export function toggleDailyPractice(activity, practiceId, date = new Date()) {
  if (!GROWTH_PRACTICES.some((practice) => practice.id === practiceId)) return activity;

  const safeActivity = activity && typeof activity === 'object' && !Array.isArray(activity)
    ? activity
    : {};
  const key = localDateKey(date);
  const day = Array.isArray(safeActivity[key]) ? safeActivity[key] : [];
  const nextDay = day.includes(practiceId)
    ? day.filter((id) => id !== practiceId)
    : [...day, practiceId];

  return { ...safeActivity, [key]: nextDay };
}

export function getGrowthSummary(activity, date = new Date()) {
  const safeActivity = activity && typeof activity === 'object' && !Array.isArray(activity)
    ? activity
    : {};
  const today = localDateKey(date);
  const validPracticeCount = (practices) => (
    Array.isArray(practices)
      ? new Set(practices.filter((id) => GROWTH_PRACTICES.some((practice) => practice.id === id))).size
      : 0
  );
  const todayCompleted = validPracticeCount(safeActivity[today]);
  const recentDateKeys = Array.from({ length: 7 }, (_, index) => {
    const day = new Date(date);
    day.setHours(12, 0, 0, 0);
    day.setDate(day.getDate() - index);
    return localDateKey(day);
  });

  const activeDateKeys = new Set(
    Object.entries(safeActivity)
      .filter(([, practices]) => validPracticeCount(practices) > 0)
      .map(([key]) => key)
  );
  let currentStreak = 0;
  const firstStreakDay = new Date(date);
  firstStreakDay.setHours(12, 0, 0, 0);
  if (!activeDateKeys.has(today)) firstStreakDay.setDate(firstStreakDay.getDate() - 1);
  for (let index = 0; index <= activeDateKeys.size; index += 1) {
    if (!activeDateKeys.has(localDateKey(firstStreakDay))) break;
    currentStreak += 1;
    firstStreakDay.setDate(firstStreakDay.getDate() - 1);
  }

  const totalPractices = Object.values(safeActivity).reduce(
    (total, practices) => total + validPracticeCount(practices),
    0
  );

  return {
    todayCompleted,
    activeDaysThisWeek: recentDateKeys.filter((key) => activeDateKeys.has(key)).length,
    currentStreak,
    totalPractices
  };
}
