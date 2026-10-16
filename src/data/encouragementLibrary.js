const themes = [
  {
    name: 'Courage',
    references: ['Joshua 1:9', 'Deuteronomy 31:8', 'Psalm 27:1', 'Psalm 56:3', 'Isaiah 41:10', 'John 16:33', 'Romans 8:31', '1 Corinthians 16:13', '2 Timothy 1:7', 'Hebrews 13:6'],
    reflections: [
      'You do not have to feel fearless to take a faithful next step.',
      'Courage can be quiet: it is choosing what is right while your hands still tremble.',
      'The unknown is not proof that you have been abandoned.',
      'You have made it through hard chapters before, one day at a time.',
      'Your worth is not measured by how quickly you overcome a challenge.',
      'A small beginning still counts as movement.',
      'You can ask for help and still be brave.',
      'Fear may speak loudly, but it does not get to make every decision.',
      'You are allowed to pause, gather strength, and begin again.',
      'There is room for hope even before you can see the whole way forward.'
    ],
    practices: [
      'Name one next step you can take today, then make it small enough to begin.',
      'Reach out to someone trustworthy and let them stand with you.',
      'Write down what you know to be true when worry starts filling in the blanks.',
      'Take three slow breaths before answering the thing that feels urgent.',
      'Choose one boundary that protects the good work in front of you.',
      'Celebrate one brave choice you have already made this week.',
      'Ask God for steady courage, not a perfect plan.',
      'Do the next kind and honest thing within your reach.',
      'Give yourself permission to try again without insulting yourself.',
      'Read the Scripture reference slowly and notice the word that meets you.'
    ]
  },
  {
    name: 'Peace',
    references: ['Psalm 4:8', 'Psalm 29:11', 'Psalm 46:10', 'Isaiah 26:3', 'Isaiah 32:17', 'Matthew 11:28', 'John 14:27', 'John 16:33', 'Philippians 4:6-7', 'Colossians 3:15'],
    reflections: [
      'Peace is not pretending everything is easy; it is finding a place to breathe in the middle of it.',
      'You are more than the list of things demanding your attention.',
      'A quiet moment can be a faithful beginning, not a delay.',
      'You do not need to solve tomorrow before you care for today.',
      'Rest is not a reward for finishing everything; it is part of being human.',
      'It is okay to set down what was never yours to carry alone.',
      'Your mind can return to the present one gentle breath at a time.',
      'God can meet you in an unfinished, ordinary day.',
      'You can move at a human pace and still make meaningful progress.',
      'Stillness can make room for wisdom you could not hear in the rush.'
    ],
    practices: [
      'Put both feet on the floor and take five unhurried breaths.',
      'Write down one concern and one thing you can release for now.',
      'Turn off one notification for the next hour.',
      'Step outside or look out a window and notice three quiet details.',
      'Pray with one honest sentence, without trying to make it sound polished.',
      'Take a short break before returning to your next task.',
      'Ask someone to share the load instead of carrying it silently.',
      'Read the Scripture reference, then sit quietly for one minute.',
      'Choose one priority and let the rest wait until later.',
      'Offer yourself the same patience you would offer a dear friend.'
    ]
  },
  {
    name: 'Healing',
    references: ['Psalm 34:18', 'Psalm 147:3', 'Isaiah 40:29', 'Isaiah 53:5', 'Jeremiah 17:14', 'Matthew 11:28', 'Mark 5:34', 'Luke 8:48', '2 Corinthians 12:9', 'Revelation 21:4'],
    reflections: [
      'Healing can be a process, and needing time does not mean you are failing.',
      'Your pain deserves care, not comparison.',
      'You can hold hope and honest grief in the same heart.',
      'A difficult season does not erase your dignity or your future.',
      'Rest, wise support, and professional care can all be part of healing.',
      'You do not have to explain your pain perfectly to deserve compassion.',
      'Progress may be gentle and still be real.',
      'You are not a burden for needing comfort.',
      'The next chapter does not have to look like the last one.',
      'There is strength in receiving care as well as in giving it.'
    ],
    practices: [
      'Tell one trusted person what kind of support would help today.',
      'Make space for a meal, water, medication, movement, or rest that your body needs.',
      'Write a compassionate note to yourself as if you were comforting a friend.',
      'Consider contacting a qualified health professional for support.',
      'Let one task wait while you tend to what is most important.',
      'Pray for comfort while also accepting practical help.',
      'Notice one small sign of strength without demanding that you feel fully well.',
      'Set a gentle boundary around a conversation that leaves you depleted.',
      'Read the Scripture reference as encouragement, not as pressure to recover on a schedule.',
      'Choose one nurturing thing you can do in the next ten minutes.'
    ]
  },
  {
    name: 'Purpose',
    references: ['Psalm 37:23', 'Proverbs 3:5-6', 'Isaiah 43:1', 'Jeremiah 29:11', 'Micah 6:8', 'Matthew 5:16', 'Ephesians 2:10', 'Philippians 1:6', 'Colossians 3:23', '1 Peter 4:10'],
    reflections: [
      'Purpose is often practiced in ordinary acts of love, not only discovered in grand moments.',
      'Your gifts can serve people right where you are.',
      'A meaningful life is built through many small faithful choices.',
      'You are allowed to learn your way into the next season.',
      'Your path does not need to match someone else’s timeline.',
      'The work in front of you can matter even when it goes unseen.',
      'You can change direction without deciding that the past was wasted.',
      'A calling can grow clearer through service, patience, and community.',
      'Your contribution does not have to be famous to be valuable.',
      'You were made for connection as well as accomplishment.'
    ],
    practices: [
      'Use one strength today to make another person’s day a little lighter.',
      'List three activities that leave you feeling useful and alive.',
      'Ask a trusted person where they see your gifts making a difference.',
      'Choose one small task that aligns with the person you want to become.',
      'Make room for a responsibility that matters more than it looks.',
      'Try one new step, then learn from what happens instead of demanding certainty.',
      'Offer your skill to a community or person who could use it.',
      'Write down what you value before deciding what deserves your time.',
      'Let go of one comparison that is distracting you from your own work.',
      'Read the Scripture reference and reflect on how service might look today.'
    ]
  },
  {
    name: 'Renewal',
    references: ['Psalm 51:10', 'Psalm 103:5', 'Isaiah 40:31', 'Isaiah 43:19', 'Lamentations 3:22-23', 'Ezekiel 36:26', 'Romans 12:2', '2 Corinthians 4:16', '2 Corinthians 5:17', 'Titus 3:5'],
    reflections: [
      'A fresh start can begin with one honest choice, not a perfect reset.',
      'You are not required to stay the person you were in your hardest moment.',
      'Small routines can become gentle paths back to steadiness.',
      'A setback can be part of the story without becoming the whole story.',
      'New growth often begins where no one else can see it yet.',
      'You can begin again without denying what you have been through.',
      'Hope can return slowly and still be real.',
      'You deserve a future not governed by yesterday’s mistakes.',
      'Change is easier to sustain when it is kind and specific.',
      'There is grace in taking the next step from exactly where you are.'
    ],
    practices: [
      'Pick one routine you can restart gently, even for five minutes.',
      'Clear one small space that would make tomorrow easier.',
      'Name something you learned from a recent disappointment.',
      'Replace one harsh thought with a truthful, compassionate sentence.',
      'Make a simple plan for the next 24 hours, not the whole year.',
      'Reach out to someone who helps you remember what is possible.',
      'Take a walk or stretch as a way of welcoming your body into a new day.',
      'Celebrate the first step rather than waiting to celebrate the finish.',
      'Ask God to renew your perspective as you read the Scripture reference.',
      'Choose one thing to stop carrying into the next hour.'
    ]
  },
  {
    name: 'Faith',
    references: ['Psalm 9:10', 'Psalm 23:1', 'Proverbs 3:5-6', 'Isaiah 40:31', 'Matthew 17:20', 'Mark 9:24', 'Romans 10:17', '2 Corinthians 5:7', 'Hebrews 11:1', 'Hebrews 12:2'],
    reflections: [
      'Faith can make room for questions while still choosing to keep seeking.',
      'You do not need certainty about every detail to take a faithful step.',
      'Trust can grow through honest prayer and patient practice.',
      'A small faithfulness today is worth more than a perfect plan you never begin.',
      'Doubt is a reason to bring your questions into the light, not to hide them.',
      'You can lean on community when your own hope feels tired.',
      'God’s care is not measured by how easy this week feels.',
      'Faithfulness includes asking for wisdom before acting.',
      'You can keep hope without pretending you control the outcome.',
      'A searching heart is still a heart moving toward God.'
    ],
    practices: [
      'Pray one honest question and give yourself time to listen.',
      'Read the Scripture reference and write down what you notice.',
      'Talk with a trusted faith leader or friend about what feels uncertain.',
      'Take one action that reflects the value you want to live by.',
      'Remember a time when support arrived from an unexpected place.',
      'Make a short gratitude list to ground your attention in what is present.',
      'Ask for wisdom before making a decision that can wait.',
      'Choose a practice of worship that feels sincere to you today.',
      'Let a trusted person pray with you instead of going through this alone.',
      'Do the next right thing and leave the parts outside your control open.'
    ]
  },
  {
    name: 'Wisdom',
    references: ['1 Kings 3:9', 'Job 12:12', 'Psalm 90:12', 'Proverbs 2:6', 'Proverbs 3:5-6', 'Proverbs 4:7', 'Ecclesiastes 7:12', 'James 1:5', 'James 3:17', 'Colossians 1:9'],
    reflections: [
      'Wisdom often starts with admitting what you do not yet know.',
      'You can pause before reacting; a thoughtful response is still a strong one.',
      'Good counsel can help you see what urgency has hidden.',
      'A wise choice considers both truth and compassion.',
      'You are allowed to gather information before you commit.',
      'Listening carefully is an active form of love.',
      'Not every open door is yours to walk through.',
      'A boundary can be wise even when someone dislikes it.',
      'The best next step may be smaller and clearer than the whole solution.',
      'Wisdom grows when reflection turns into practice.'
    ],
    practices: [
      'Write down the decision, what you know, and what you still need to learn.',
      'Ask someone with relevant experience for a thoughtful perspective.',
      'Wait one night before sending a message written in frustration.',
      'Name the values you want your decision to honor.',
      'Consider who else will be affected and listen to their needs.',
      'Read the Scripture reference and ask for discernment.',
      'Separate what is urgent from what is genuinely important.',
      'Set a limit that protects your responsibilities and wellbeing.',
      'Look for a choice that is both honest and kind.',
      'Take the smallest reversible step that will teach you something.'
    ]
  },
  {
    name: 'Perseverance',
    references: ['Psalm 30:5', 'Psalm 126:5', 'Isaiah 40:31', 'Romans 5:3-4', 'Romans 12:12', 'Galatians 6:9', 'Philippians 3:13-14', '2 Thessalonians 3:13', 'Hebrews 10:36', 'James 1:12'],
    reflections: [
      'Steady effort matters even when progress is hard to measure.',
      'You can be tired and still be committed to what matters.',
      'Rest is part of perseverance, not its opposite.',
      'A slow season does not make your effort meaningless.',
      'You only need enough strength for the next step right now.',
      'Asking for support can help good work continue.',
      'You can adjust your pace without abandoning your purpose.',
      'Progress is allowed to look different from what you expected.',
      'You have permission to celebrate how far you have already come.',
      'A pause can protect your ability to keep going tomorrow.'
    ],
    practices: [
      'Break the challenge into one action you can finish in fifteen minutes.',
      'Schedule a real pause before you reach the point of exhaustion.',
      'Tell someone what you are working toward and ask them to check in.',
      'Write down one sign of progress that you might otherwise overlook.',
      'Return to the reason this work matters, then choose today’s portion.',
      'Remove one unnecessary obstacle from your path.',
      'Ask for help with a task that does not need to be yours alone.',
      'Use the Scripture reference as a prompt for patient hope.',
      'Choose a sustainable pace for the week ahead.',
      'When you stumble, restart with the next available step.'
    ]
  },
  {
    name: 'Gratitude',
    references: ['Psalm 9:1', 'Psalm 100:4', 'Psalm 107:1', 'Psalm 118:24', 'Daniel 2:23', 'Luke 17:15-16', 'Ephesians 5:20', 'Philippians 4:6', 'Colossians 3:15', '1 Thessalonians 5:18'],
    reflections: [
      'Gratitude does not erase hardship; it helps you notice what hardship has not taken.',
      'Ordinary kindness is worth noticing.',
      'Joy can be present in small moments without solving every problem.',
      'You can be thankful and still ask for change.',
      'Naming what sustains you can make a difficult day feel less lonely.',
      'The people who show up in quiet ways deserve to be remembered.',
      'A small pleasure is not too small to receive with thanks.',
      'Your life contains gifts that are not achievements.',
      'Gratitude can make room for connection, not just positive thinking.',
      'There is meaning in paying attention to the good that is here.'
    ],
    practices: [
      'Write down three specific things that helped you get through today.',
      'Send a short thank-you message to someone who made a difference.',
      'Notice one thing your body helped you do today.',
      'Name one beautiful or comforting detail you encountered.',
      'Share a meal or a moment of conversation with someone you value.',
      'Thank God for one ordinary provision without minimizing what is hard.',
      'Keep a note of small kindnesses you receive this week.',
      'Offer appreciation directly instead of assuming the person knows.',
      'Read the Scripture reference and consider what gratitude makes visible.',
      'Pause before bed to remember one moment you would like to carry forward.'
    ]
  },
  {
    name: 'Holy Spirit',
    references: ['Ezekiel 36:26-27', 'Joel 2:28-29', 'John 14:26', 'John 15:26', 'Acts 1:8', 'Acts 2:4', 'Romans 8:14', 'Romans 8:26', '1 Corinthians 12:4-7', 'Galatians 5:22-23'],
    reflections: [
      'The Spirit’s work can be recognized in love, courage, wisdom, and care for others.',
      'You can seek God’s guidance while staying open to wise counsel.',
      'A spiritual gift is for serving people, not proving your worth.',
      'You do not have to manufacture an experience to be attentive to God.',
      'Prayer can be honest even when you do not have the right words.',
      'The fruit of the Spirit grows through daily choices and relationships.',
      'A sense of calling should be held with humility and discernment.',
      'You can make room for worship in a way that is sincere and grounded.',
      'God’s presence can strengthen you to love your neighbor well.',
      'Spiritual growth includes character, community, and compassionate action.'
    ],
    practices: [
      'Ask for guidance, then compare what you sense with Scripture and wise counsel.',
      'Choose one fruit of the Spirit to practice in a real conversation today.',
      'Use a skill you have to encourage or serve someone else.',
      'Take a few quiet minutes for prayer without demanding a particular feeling.',
      'Join a trusted community for worship, learning, and mutual care.',
      'Write down what you are discerning and revisit it after some time has passed.',
      'Make room for someone else’s perspective before reaching a conclusion.',
      'Pray for courage to act with patience and integrity.',
      'Read the Scripture reference in context and note what it says about community.',
      'Let compassion be the evidence of what you are practicing today.'
    ]
  }
];

const parseReference = (reference) => {
  const match = reference.match(/^(.+?) (\d+):(\d+)/);
  const book = match && match[1] === 'Psalm' ? 'Psalms' : match?.[1];
  return match ? { book, chapter: Number(match[2]), verse: Number(match[3]) } : {};
};

export const ENCOURAGEMENT_THEMES = ['All themes', ...themes.map((theme) => theme.name)];

export const ENCOURAGEMENTS = themes.flatMap((theme) =>
  theme.reflections.flatMap((reflection, reflectionIndex) =>
    theme.practices.map((practice, practiceIndex) => {
      const reference = theme.references[(reflectionIndex * 7 + practiceIndex * 3) % theme.references.length];
      return {
        id: `${theme.name.toLowerCase().replaceAll(' ', '-')}-${reflectionIndex}-${practiceIndex}`,
        theme: theme.name,
        reference,
        ...parseReference(reference),
        text: `${reflection} ${practice}`
      };
    })
  )
);
