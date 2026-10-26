import { EXTRA_DEVOTIONALS } from './extraDevotionals';

export const SEMINAR_SESSIONS = [
  { id: 'gods-love', title: "God's Love", scripture: '1 John 4:7-12', focus: 'Consider the Christian belief that God loves first and invites a response of faith and love.', question: 'Where do you see love expressed in this passage?' },
  { id: 'salvation', title: 'Salvation', scripture: 'Ephesians 2:4-10', focus: 'Read about grace, faith, and the good works Christians are invited to practice.', question: 'What does this passage say is gift, and what response follows?' },
  { id: 'new-life', title: 'New Life', scripture: 'Romans 6:3-11', focus: 'Reflect on baptism and the call to live in Christ.', question: 'What is one habit that could help you live this new life?' },
  { id: 'charisms', title: "Receiving God's Gifts (Charisms)", scripture: '1 Corinthians 12:4-11', focus: 'Notice the variety of gifts and their connection to service and the common good.', question: 'What gifts might you offer in service to others?' },
  { id: 'baptism-holy-spirit', title: 'Baptism in the Holy Spirit', scripture: 'Acts 1:4-8', focus: 'Study the disciples’ prayerful waiting and their mission to witness.', question: 'How might prayer and community support your witness?' },
  { id: 'growth', title: 'Growth', scripture: 'Galatians 5:16-25', focus: 'Reflect on spiritual growth through the fruit of the Spirit.', question: 'Which fruit would you like to practice intentionally this week?' },
  { id: 'transformation', title: 'Transformation', scripture: 'Romans 12:1-2', focus: 'Consider renewal of the mind and the daily practice of discerning what is good.', question: 'What thought or routine could use a fresh perspective?' }
];

export const DEVOTIONALS = [
  { title: 'Be still', scripture: 'Psalm 46:10', reflection: 'Create a small pause before the day fills with demands. Stillness can make space for honest prayer.', prompt: 'What can wait while you take one quiet minute?' },
  { title: 'Remain in love', scripture: 'John 15:9-12', reflection: 'The Gospel connects abiding in Christ with loving one another. Let love shape one ordinary choice today.', prompt: 'Who could receive your patient attention today?' },
  { title: 'Choose peace', scripture: 'Matthew 5:9', reflection: 'Peace-making begins close to home: listening carefully, speaking truthfully, and refusing to inflame conflict.', prompt: 'What is one peaceful response available to you?' },
  { title: 'Serve with your gifts', scripture: '1 Corinthians 12:4-7', reflection: 'Different gifts can serve one community. Your contribution need not look like someone else’s.', prompt: 'What ability could you offer for another person’s good?' },
  { title: 'Practice the fruit', scripture: 'Galatians 5:22-23', reflection: 'Spiritual growth becomes visible through qualities practiced in daily relationships.', prompt: 'Which fruit of the Spirit will guide one interaction today?' },
  { title: 'Renew your mind', scripture: 'Romans 12:1-2', reflection: 'A renewed mind learns to notice what is good and choose it with care.', prompt: 'What habit helps you recognize the good?' },
  { title: 'Keep unity', scripture: 'Ephesians 4:1-6', reflection: 'Unity does not require sameness. Patience and humility help people remain connected through difference.', prompt: 'Where could you make room for another person’s perspective?' },
  ...EXTRA_DEVOTIONALS
];

export const DAILY_PRAYERS = [
  { title: 'Prayer for today', text: 'God of mercy, guide my choices today. Help me to notice those who need care, to act with patience, and to return to you when I feel distracted. Amen.' },
  { title: 'Prayer to the Holy Spirit', text: 'Holy Spirit, enlighten my understanding, strengthen me in what is good, and help me use my gifts in service of others. Lead me in truth, humility, and love. Amen.' }
];

export const HOLY_SPIRIT_NOVENA = [
  { focus: 'Come, Holy Spirit', prayer: 'Holy Spirit, make my heart attentive to God and ready to serve with love. Amen.' },
  { focus: 'Wisdom', prayer: 'Spirit of Wisdom, help me seek what is true and choose what serves the good of all. Amen.' },
  { focus: 'Understanding', prayer: 'Spirit of Understanding, help me listen patiently and grow in understanding of the faith. Amen.' },
  { focus: 'Counsel', prayer: 'Spirit of Counsel, guide my decisions toward honesty, justice, and compassion. Amen.' },
  { focus: 'Fortitude', prayer: 'Spirit of Fortitude, strengthen me to do what is right with courage and gentleness. Amen.' },
  { focus: 'Knowledge', prayer: 'Spirit of Knowledge, help me recognize the gifts of creation and use them responsibly. Amen.' },
  { focus: 'Piety', prayer: 'Spirit of Reverence, deepen my prayer and help me honor God in the people I meet. Amen.' },
  { focus: 'Wonder and awe', prayer: 'Spirit of Wonder, keep my heart grateful, humble, and attentive to God’s presence. Amen.' },
  { focus: 'For the Church and the world', prayer: 'Holy Spirit, renew the Church in holiness and guide all people toward peace, dignity, and unity. Amen.' }
];

export const ROSARY_MYSTERIES = [
  { name: 'Joyful Mysteries', days: 'Monday and Saturday', mysteries: ['The Annunciation', 'The Visitation', 'The Nativity', 'The Presentation', 'The Finding of Jesus in the Temple'] },
  { name: 'Luminous Mysteries', days: 'Thursday', mysteries: ['The Baptism of Jesus', 'The Wedding at Cana', 'The Proclamation of the Kingdom', 'The Transfiguration', 'The Institution of the Eucharist'] },
  { name: 'Sorrowful Mysteries', days: 'Tuesday and Friday', mysteries: ['The Agony in the Garden', 'The Scourging at the Pillar', 'The Crowning with Thorns', 'The Carrying of the Cross', 'The Crucifixion'] },
  { name: 'Glorious Mysteries', days: 'Wednesday and Sunday', mysteries: ['The Resurrection', 'The Ascension', 'The Descent of the Holy Spirit', 'The Assumption of Mary', 'The Coronation of Mary'] }
];

export const ROSARY_STEPS = [
  'Begin with the Sign of the Cross. Hold the crucifix and pray the Apostles’ Creed.',
  'On the first bead, pray the Our Father. On the next three beads, pray three Hail Marys. Conclude with the Glory Be.',
  'Announce the first mystery and take a moment to reflect on it. Pray the Our Father.',
  'On each of the next ten beads, pray a Hail Mary while reflecting on the mystery. Conclude the decade with the Glory Be and the Fatima Prayer if customary.',
  'Repeat the mystery and decade pattern for the remaining four mysteries.',
  'Conclude with the Hail, Holy Queen and the Sign of the Cross, according to your custom.'
];

export const CHAPLET_STEPS = [
  'Begin with the Sign of the Cross. Pray the Our Father, the Hail Mary, and the Apostles’ Creed.',
  'On the large bead before each decade, pray: “Eternal Father…”',
  'On each of the ten small beads, pray: “For the sake of his sorrowful Passion, have mercy on us and on the whole world.”',
  'Repeat the large-bead and ten-small-bead pattern for all five decades.',
  'Conclude with “Holy God…” prayed three times, then the Sign of the Cross.'
];

export const MINISTRIES = [
  { name: 'Praise and Worship', focus: 'Help the community pray through music, song, and attentive participation in worship.', nextStep: 'Ask the parish coordinator about rehearsal times, safeguarding expectations, and the music schedule.' },
  { name: 'Intercession', focus: 'Pray for the needs of the Church, the parish, and the wider community with humility and discretion.', nextStep: 'Learn the parish process for receiving and handling prayer intentions privately.' },
  { name: 'Healing and Deliverance', focus: 'Offer pastoral prayer in coordination with parish leadership and appropriate professional care.', nextStep: 'Speak with a priest or ministry lead about diocesan guidance, safeguarding, and referral practices.' },
  { name: 'Teaching and Evangelization', focus: 'Support faith formation and share the Gospel in a way that respects people and Catholic teaching.', nextStep: 'Ask about formation requirements, approved materials, and opportunities to serve.' }
];

export const SONGS = [
  { title: 'Veni Creator Spiritus', creator: 'Traditionally attributed to Rabanus Maurus', type: 'Hymn', language: 'Latin', usage: 'Verify the specific translation and arrangement license before reproducing lyrics or audio.' },
  { title: 'Come, Holy Ghost, Creator Blest', creator: 'Latin hymn; English translation by John Cosin', type: 'Hymn', language: 'English', usage: 'Verify the specific translation and arrangement license before reproducing lyrics or audio.' },
  { title: 'Come Thou Fount of Every Blessing', creator: 'Robert Robinson', type: 'Hymn', language: 'English', usage: 'Verify the specific arrangement license before reproducing lyrics or audio.' },
  { title: 'Let All Mortal Flesh Keep Silence', creator: 'Ancient liturgical text; translation by Gerard Moultrie', type: 'Hymn', language: 'English', usage: 'Verify the specific translation and arrangement license before reproducing lyrics or audio.' },
  { title: 'Holy God, We Praise Thy Name', creator: 'Ignaz Franz; English translation by Clarence Walworth', type: 'Hymn', language: 'English', usage: 'Verify the specific translation and arrangement license before reproducing lyrics or audio.' },
  { title: 'All Creatures of Our God and King', creator: 'Francis of Assisi; English paraphrase by William Draper', type: 'Hymn', language: 'English', usage: 'Verify the specific translation and arrangement license before reproducing lyrics or audio.' },
  { title: 'As the Deer', creator: 'Martin J. Nystrom', type: 'Charismatic worship', language: 'English', usage: 'Copyrighted work; obtain permission for lyrics, recordings, or distribution.' },
  { title: 'Shine, Jesus, Shine', creator: 'Graham Kendrick', type: 'Charismatic worship', language: 'English', usage: 'Copyrighted work; obtain permission for lyrics, recordings, or distribution.' },
  { title: 'Lord, I Lift Your Name on High', creator: 'Rick Founds', type: 'Charismatic worship', language: 'English', usage: 'Copyrighted work; obtain permission for lyrics, recordings, or distribution.' },
  { title: 'Open the Eyes of My Heart', creator: 'Paul Baloche', type: 'Charismatic worship', language: 'English', usage: 'Copyrighted work; obtain permission for lyrics, recordings, or distribution.' }
];
