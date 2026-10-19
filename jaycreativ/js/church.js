const welcomeModal = document.querySelector('#welcome-modal');
const closeModalButtons = document.querySelectorAll('[data-close-modal]');
const seminarButtons = document.querySelectorAll('[data-message]');

function closeWelcome() {
    welcomeModal.hidden = true;
    document.body.classList.remove('modal-open');
    localStorage.setItem('abide-welcomed', 'true');
}

closeModalButtons.forEach((button) => button.addEventListener('click', closeWelcome));
seminarButtons.forEach((button) => button.addEventListener('click', () => {
    document.querySelector('#daily-caption').textContent = button.dataset.message;
    document.querySelector('#scripture').scrollIntoView({ behavior: 'smooth' });
}));

if (!localStorage.getItem('abide-welcomed')) {
    welcomeModal.hidden = false;
    document.body.classList.add('modal-open');
}

document.querySelectorAll('[data-close-verse-modal]').forEach((button) => button.addEventListener('click', () => {
    verseModal.hidden = true;
    document.body.classList.remove('modal-open');
}));
function showNextVerse() {
    if (!welcomeModal.hidden) return;
    verseIndex = (verseIndex + 1) % verses.length;
    showVerse();
}
setTimeout(showNextVerse, 12000);
setInterval(showNextVerse, 45000);

const experienceNote = document.querySelector('#experience-note');
const experienceStatus = document.querySelector('#experience-status');
experienceNote.value = localStorage.getItem('living-word-experience') || '';
document.querySelector('#save-experience').addEventListener('click', () => {
    localStorage.setItem('living-word-experience', experienceNote.value);
    experienceStatus.textContent = 'Experience saved privately on this device';
    setTimeout(() => experienceStatus.textContent = '', 3000);
});

document.querySelector('#share-experience').addEventListener('click', () => {
    const experience = experienceNote.value.trim();
    if (!experience) {
        experienceStatus.textContent = 'Write your experience before sharing it.';
        return;
    }
    try {
        sessionStorage.setItem('living-word-experience-to-share', experience);
        window.location.href = 'index.html?view=testimonies';
    } catch {
        experienceStatus.textContent = 'Unable to prepare your story for sharing in this browser.';
    }
});

const bibleBooks = [
    ['Old Testament', [['Genesis', 50], ['Exodus', 40], ['Leviticus', 27], ['Numbers', 36], ['Deuteronomy', 34], ['Joshua', 24], ['Judges', 21], ['Ruth', 4], ['1 Samuel', 31], ['2 Samuel', 24], ['1 Kings', 22], ['2 Kings', 25], ['1 Chronicles', 29], ['2 Chronicles', 36], ['Ezra', 10], ['Nehemiah', 13], ['Esther', 10], ['Job', 42], ['Psalms', 150], ['Proverbs', 31], ['Ecclesiastes', 12], ['Song of Solomon', 8], ['Isaiah', 66], ['Jeremiah', 52], ['Lamentations', 5], ['Ezekiel', 48], ['Daniel', 12], ['Hosea', 14], ['Joel', 3], ['Amos', 9], ['Obadiah', 1], ['Jonah', 4], ['Micah', 7], ['Nahum', 3], ['Habakkuk', 3], ['Zephaniah', 3], ['Haggai', 2], ['Zechariah', 14], ['Malachi', 4]]],
    ['Deuterocanonical', [['Tobit', 14], ['Judith', 16], ['Wisdom of Solomon', 19], ['Sirach', 51], ['Baruch', 6], ['1 Maccabees', 16], ['2 Maccabees', 15]]],
    ['New Testament', [['Matthew', 28], ['Mark', 16], ['Luke', 24], ['John', 21], ['Acts', 28], ['Romans', 16], ['1 Corinthians', 16], ['2 Corinthians', 13], ['Galatians', 6], ['Ephesians', 6], ['Philippians', 4], ['Colossians', 4], ['1 Thessalonians', 5], ['2 Thessalonians', 3], ['1 Timothy', 6], ['2 Timothy', 4], ['Titus', 3], ['Philemon', 1], ['Hebrews', 13], ['James', 5], ['1 Peter', 5], ['2 Peter', 3], ['1 John', 5], ['2 John', 1], ['3 John', 1], ['Jude', 1], ['Revelation', 22]]]
];
const allBibleBooks = bibleBooks.flatMap((testament) => testament[1]);
const bibleBook = document.querySelector('#bible-book');
const bibleChapter = document.querySelector('#bible-chapter');
const bibleVerse = document.querySelector('#bible-verse');
const chapterGrid = document.querySelector('#chapter-grid');
const referenceResult = document.querySelector('#reference-result');
const verseList = document.querySelector('#verse-list');
const genesisVerseCounts = [31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 55, 32, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26];
const bibleBookStrip = document.querySelector('#bible-book-strip');

if (bibleBook) {
    allBibleBooks.forEach(([name]) => bibleBook.add(new Option(name, name)));
    allBibleBooks.forEach(([name]) => {
        const bookButton = document.createElement('button');
        bookButton.className = 'bible-book-button';
        bookButton.type = 'button';
        bookButton.textContent = name;
        bookButton.addEventListener('click', () => { bibleBook.value = name; showBibleChapters(); });
        bibleBookStrip.append(bookButton);
    });
    function updateBibleReference() {
        const selectedBook = allBibleBooks.find(([name]) => name === bibleBook.value);
        const chapter = bibleChapter.value || 1;
        const verseNumber = Math.max(1, Number(bibleVerse.value) || 1);
        referenceResult.textContent = `${selectedBook[0]} ${chapter}:${verseNumber}`;
        document.querySelectorAll('.chapter-button').forEach((button) => button.classList.toggle('active', button.textContent === String(chapter)));
        document.querySelectorAll('.bible-book-button').forEach((button) => button.classList.toggle('active', button.textContent === selectedBook[0]));
        loadChapterVerses(selectedBook[0], chapter);
    }
    async function loadChapterVerses(bookName, chapter) {
        verseList.replaceChildren();
        const loadingMessage = document.createElement('p');
        loadingMessage.className = 'verse-loading';
        loadingMessage.textContent = 'Loading all verses in this chapter...';
        verseList.append(loadingMessage);
        try {
            const response = await fetch(`https://bible-api.com/${encodeURIComponent(`${bookName} ${chapter}`)}?translation=kjv`);
            if (!response.ok) throw new Error('Verse service unavailable');
            const chapterData = await response.json();
            verseList.replaceChildren();
            chapterData.verses.forEach((verseData) => {
                const verseButton = document.createElement('button');
                verseButton.className = 'verse-button';
                verseButton.type = 'button';
                verseButton.innerHTML = `<strong>${verseData.verse}</strong> ${verseData.text.trim()}`;
                verseButton.addEventListener('click', () => { bibleVerse.value = verseData.verse; referenceResult.textContent = `${bookName} ${chapter}:${verseData.verse}`; });
                verseList.append(verseButton);
            });
        } catch (error) {
            verseList.replaceChildren();
            const errorMessage = document.createElement('p');
            errorMessage.className = 'verse-loading';
            errorMessage.textContent = 'Verse text needs an internet connection. Use the chapter and verse fields above for the reference.';
            verseList.append(errorMessage);
        }
    }
    function showBibleChapters() {
        const selectedBook = allBibleBooks.find(([name]) => name === bibleBook.value);
        bibleChapter.replaceChildren();
        chapterGrid.replaceChildren();
        for (let chapter = 1; chapter <= selectedBook[1]; chapter += 1) {
            bibleChapter.add(new Option(String(chapter), String(chapter)));
            const chapterButton = document.createElement('button');
            chapterButton.className = 'chapter-button';
            chapterButton.type = 'button';
            chapterButton.textContent = chapter;
            chapterButton.addEventListener('click', () => {
                if (selectedBook[0] === 'Genesis' && chapter === 1) {
                    window.location.href = 'genesis-1.html';
                    return;
                }
                bibleChapter.value = chapter;
                updateBibleReference();
            });
            chapterGrid.append(chapterButton);
        }
        updateBibleReference();
    }
    const requestedBook = new URLSearchParams(window.location.search).get('book');
    if (allBibleBooks.some(([name]) => name === requestedBook)) bibleBook.value = requestedBook;
    bibleBook.addEventListener('change', showBibleChapters);
    bibleChapter.addEventListener('change', updateBibleReference);
    bibleVerse.addEventListener('input', updateBibleReference);
    showBibleChapters();
}