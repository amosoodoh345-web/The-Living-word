export function matchesReadingIntent(intent, passage) {
  return Boolean(
    intent
    && passage
    && intent.book === passage.book
    && intent.chapter === passage.chapter
    && intent.verse === passage.verse
  );
}
