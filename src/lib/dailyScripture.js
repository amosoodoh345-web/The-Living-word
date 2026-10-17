export const DAILY_SCRIPTURES = [
  { book: 'Psalms', chapter: 23, start: 1, end: 3, label: 'Psalm 23:1-3' },
  { book: 'John', chapter: 3, start: 16, end: 16, label: 'John 3:16' },
  { book: 'Romans', chapter: 8, start: 28, end: 28, label: 'Romans 8:28' },
  { book: 'Philippians', chapter: 4, start: 6, end: 7, label: 'Philippians 4:6-7' },
  { book: 'Isaiah', chapter: 41, start: 10, end: 10, label: 'Isaiah 41:10' },
  { book: 'Proverbs', chapter: 3, start: 5, end: 6, label: 'Proverbs 3:5-6' },
  { book: 'Joshua', chapter: 1, start: 9, end: 9, label: 'Joshua 1:9' },
  { book: 'Matthew', chapter: 11, start: 28, end: 30, label: 'Matthew 11:28-30' },
  { book: 'Galatians', chapter: 5, start: 22, end: 23, label: 'Galatians 5:22-23' },
  { book: 'Romans', chapter: 12, start: 2, end: 2, label: 'Romans 12:2' },
  { book: '2 Timothy', chapter: 1, start: 7, end: 7, label: '2 Timothy 1:7' },
  { book: 'Psalms', chapter: 119, start: 105, end: 105, label: 'Psalm 119:105' },
  { book: 'Lamentations', chapter: 3, start: 22, end: 23, label: 'Lamentations 3:22-23' },
  { book: 'John', chapter: 14, start: 27, end: 27, label: 'John 14:27' },
  { book: 'Acts', chapter: 1, start: 8, end: 8, label: 'Acts 1:8' },
  { book: 'Ephesians', chapter: 2, start: 8, end: 10, label: 'Ephesians 2:8-10' },
  { book: 'Psalms', chapter: 121, start: 1, end: 2, label: 'Psalm 121:1-2' },
  { book: 'Romans', chapter: 5, start: 5, end: 5, label: 'Romans 5:5' }
];

// Counts local calendar days so the verse changes at local midnight.
export function localDayNumber(date = new Date()) {
  return Math.floor(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86400000);
}

export function getDailyScripture(date = new Date()) {
  return DAILY_SCRIPTURES[localDayNumber(date) % DAILY_SCRIPTURES.length];
}

export function extractPassageText(verses, scripture) {
  if (!Array.isArray(verses)) return '';
  return verses
    .filter((entry) => entry.verse >= scripture.start && entry.verse <= scripture.end)
    .map((entry) => entry.text)
    .join(' ')
    .trim();
}
