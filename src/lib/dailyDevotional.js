import { localDayNumber } from './dailyScripture.js';

export function getDailyDevotionalIndex(devotionalCount, date = new Date()) {
  return localDayNumber(date) % devotionalCount;
}
