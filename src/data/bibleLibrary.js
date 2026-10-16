// Comprehensive Bible Library with 73 Books (OT, Deuterocanon / Apocrypha, NT)
// Includes offline bundled chapters and dynamic full-bible API retrieval with automatic offline caching.

export const BIBLE_BOOKS = [
  {
    "name": "Genesis",
    "apiName": "Genesis",
    "testament": "OT",
    "category": "Pentateuch",
    "chapters": 50
  },
  {
    "name": "Exodus",
    "apiName": "Exodus",
    "testament": "OT",
    "category": "Pentateuch",
    "chapters": 40
  },
  {
    "name": "Leviticus",
    "apiName": "Leviticus",
    "testament": "OT",
    "category": "Pentateuch",
    "chapters": 27
  },
  {
    "name": "Numbers",
    "apiName": "Numbers",
    "testament": "OT",
    "category": "Pentateuch",
    "chapters": 36
  },
  {
    "name": "Deuteronomy",
    "apiName": "Deuteronomy",
    "testament": "OT",
    "category": "Pentateuch",
    "chapters": 34
  },
  {
    "name": "Joshua",
    "apiName": "Joshua",
    "testament": "OT",
    "category": "Historical",
    "chapters": 24
  },
  {
    "name": "Judges",
    "apiName": "Judges",
    "testament": "OT",
    "category": "Historical",
    "chapters": 21
  },
  {
    "name": "Ruth",
    "apiName": "Ruth",
    "testament": "OT",
    "category": "Historical",
    "chapters": 4
  },
  {
    "name": "1 Samuel",
    "apiName": "1 Samuel",
    "testament": "OT",
    "category": "Historical",
    "chapters": 31
  },
  {
    "name": "2 Samuel",
    "apiName": "2 Samuel",
    "testament": "OT",
    "category": "Historical",
    "chapters": 24
  },
  {
    "name": "1 Kings",
    "apiName": "1 Kings",
    "testament": "OT",
    "category": "Historical",
    "chapters": 22
  },
  {
    "name": "2 Kings",
    "apiName": "2 Kings",
    "testament": "OT",
    "category": "Historical",
    "chapters": 25
  },
  {
    "name": "1 Chronicles",
    "apiName": "1 Chronicles",
    "testament": "OT",
    "category": "Historical",
    "chapters": 29
  },
  {
    "name": "2 Chronicles",
    "apiName": "2 Chronicles",
    "testament": "OT",
    "category": "Historical",
    "chapters": 36
  },
  {
    "name": "Ezra",
    "apiName": "Ezra",
    "testament": "OT",
    "category": "Historical",
    "chapters": 10
  },
  {
    "name": "Nehemiah",
    "apiName": "Nehemiah",
    "testament": "OT",
    "category": "Historical",
    "chapters": 13
  },
  {
    "name": "Esther",
    "apiName": "Esther",
    "testament": "OT",
    "category": "Historical",
    "chapters": 10
  },
  {
    "name": "Job",
    "apiName": "Job",
    "testament": "OT",
    "category": "Wisdom & Poetry",
    "chapters": 42
  },
  {
    "name": "Psalms",
    "apiName": "Psalms",
    "testament": "OT",
    "category": "Wisdom & Poetry",
    "chapters": 150
  },
  {
    "name": "Proverbs",
    "apiName": "Proverbs",
    "testament": "OT",
    "category": "Wisdom & Poetry",
    "chapters": 31
  },
  {
    "name": "Ecclesiastes",
    "apiName": "Ecclesiastes",
    "testament": "OT",
    "category": "Wisdom & Poetry",
    "chapters": 12
  },
  {
    "name": "Song of Solomon",
    "apiName": "Song of Solomon",
    "testament": "OT",
    "category": "Wisdom & Poetry",
    "chapters": 8
  },
  {
    "name": "Isaiah",
    "apiName": "Isaiah",
    "testament": "OT",
    "category": "Major Prophets",
    "chapters": 66
  },
  {
    "name": "Jeremiah",
    "apiName": "Jeremiah",
    "testament": "OT",
    "category": "Major Prophets",
    "chapters": 52
  },
  {
    "name": "Lamentations",
    "apiName": "Lamentations",
    "testament": "OT",
    "category": "Major Prophets",
    "chapters": 5
  },
  {
    "name": "Ezekiel",
    "apiName": "Ezekiel",
    "testament": "OT",
    "category": "Major Prophets",
    "chapters": 48
  },
  {
    "name": "Daniel",
    "apiName": "Daniel",
    "testament": "OT",
    "category": "Major Prophets",
    "chapters": 12
  },
  {
    "name": "Hosea",
    "apiName": "Hosea",
    "testament": "OT",
    "category": "Minor Prophets",
    "chapters": 14
  },
  {
    "name": "Joel",
    "apiName": "Joel",
    "testament": "OT",
    "category": "Minor Prophets",
    "chapters": 3
  },
  {
    "name": "Amos",
    "apiName": "Amos",
    "testament": "OT",
    "category": "Minor Prophets",
    "chapters": 9
  },
  {
    "name": "Obadiah",
    "apiName": "Obadiah",
    "testament": "OT",
    "category": "Minor Prophets",
    "chapters": 1
  },
  {
    "name": "Jonah",
    "apiName": "Jonah",
    "testament": "OT",
    "category": "Minor Prophets",
    "chapters": 4
  },
  {
    "name": "Micah",
    "apiName": "Micah",
    "testament": "OT",
    "category": "Minor Prophets",
    "chapters": 7
  },
  {
    "name": "Nahum",
    "apiName": "Nahum",
    "testament": "OT",
    "category": "Minor Prophets",
    "chapters": 3
  },
  {
    "name": "Habakkuk",
    "apiName": "Habakkuk",
    "testament": "OT",
    "category": "Minor Prophets",
    "chapters": 3
  },
  {
    "name": "Zephaniah",
    "apiName": "Zephaniah",
    "testament": "OT",
    "category": "Minor Prophets",
    "chapters": 3
  },
  {
    "name": "Haggai",
    "apiName": "Haggai",
    "testament": "OT",
    "category": "Minor Prophets",
    "chapters": 2
  },
  {
    "name": "Zechariah",
    "apiName": "Zechariah",
    "testament": "OT",
    "category": "Minor Prophets",
    "chapters": 14
  },
  {
    "name": "Malachi",
    "apiName": "Malachi",
    "testament": "OT",
    "category": "Minor Prophets",
    "chapters": 4
  },
  {
    "name": "Tobit",
    "apiName": "Tobit",
    "testament": "DC",
    "category": "Deuterocanon",
    "chapters": 14
  },
  {
    "name": "Judith",
    "apiName": "Judith",
    "testament": "DC",
    "category": "Deuterocanon",
    "chapters": 16
  },
  {
    "name": "Wisdom of Solomon",
    "apiName": "Wisdom of Solomon",
    "testament": "DC",
    "category": "Deuterocanon",
    "chapters": 19
  },
  {
    "name": "Sirach",
    "apiName": "Sirach",
    "testament": "DC",
    "category": "Deuterocanon",
    "chapters": 51
  },
  {
    "name": "Baruch",
    "apiName": "Baruch",
    "testament": "DC",
    "category": "Deuterocanon",
    "chapters": 6
  },
  {
    "name": "1 Maccabees",
    "apiName": "1 Maccabees",
    "testament": "DC",
    "category": "Deuterocanon",
    "chapters": 16
  },
  {
    "name": "2 Maccabees",
    "apiName": "2 Maccabees",
    "testament": "DC",
    "category": "Deuterocanon",
    "chapters": 15
  },
  {
    "name": "Matthew",
    "apiName": "Matthew",
    "testament": "NT",
    "category": "Gospels",
    "chapters": 28
  },
  {
    "name": "Mark",
    "apiName": "Mark",
    "testament": "NT",
    "category": "Gospels",
    "chapters": 16
  },
  {
    "name": "Luke",
    "apiName": "Luke",
    "testament": "NT",
    "category": "Gospels",
    "chapters": 24
  },
  {
    "name": "John",
    "apiName": "John",
    "testament": "NT",
    "category": "Gospels",
    "chapters": 21
  },
  {
    "name": "Acts",
    "apiName": "Acts",
    "testament": "NT",
    "category": "Apostolic History",
    "chapters": 28
  },
  {
    "name": "Romans",
    "apiName": "Romans",
    "testament": "NT",
    "category": "Epistles",
    "chapters": 16
  },
  {
    "name": "1 Corinthians",
    "apiName": "1 Corinthians",
    "testament": "NT",
    "category": "Epistles",
    "chapters": 16
  },
  {
    "name": "2 Corinthians",
    "apiName": "2 Corinthians",
    "testament": "NT",
    "category": "Epistles",
    "chapters": 13
  },
  {
    "name": "Galatians",
    "apiName": "Galatians",
    "testament": "NT",
    "category": "Epistles",
    "chapters": 6
  },
  {
    "name": "Ephesians",
    "apiName": "Ephesians",
    "testament": "NT",
    "category": "Epistles",
    "chapters": 6
  },
  {
    "name": "Philippians",
    "apiName": "Philippians",
    "testament": "NT",
    "category": "Epistles",
    "chapters": 4
  },
  {
    "name": "Colossians",
    "apiName": "Colossians",
    "testament": "NT",
    "category": "Epistles",
    "chapters": 4
  },
  {
    "name": "1 Thessalonians",
    "apiName": "1 Thessalonians",
    "testament": "NT",
    "category": "Epistles",
    "chapters": 5
  },
  {
    "name": "2 Thessalonians",
    "apiName": "2 Thessalonians",
    "testament": "NT",
    "category": "Epistles",
    "chapters": 3
  },
  {
    "name": "1 Timothy",
    "apiName": "1 Timothy",
    "testament": "NT",
    "category": "Epistles",
    "chapters": 6
  },
  {
    "name": "2 Timothy",
    "apiName": "2 Timothy",
    "testament": "NT",
    "category": "Epistles",
    "chapters": 4
  },
  {
    "name": "Titus",
    "apiName": "Titus",
    "testament": "NT",
    "category": "Epistles",
    "chapters": 3
  },
  {
    "name": "Philemon",
    "apiName": "Philemon",
    "testament": "NT",
    "category": "Epistles",
    "chapters": 1
  },
  {
    "name": "Hebrews",
    "apiName": "Hebrews",
    "testament": "NT",
    "category": "Epistles",
    "chapters": 13
  },
  {
    "name": "James",
    "apiName": "James",
    "testament": "NT",
    "category": "General Epistles",
    "chapters": 5
  },
  {
    "name": "1 Peter",
    "apiName": "1 Peter",
    "testament": "NT",
    "category": "General Epistles",
    "chapters": 5
  },
  {
    "name": "2 Peter",
    "apiName": "2 Peter",
    "testament": "NT",
    "category": "General Epistles",
    "chapters": 3
  },
  {
    "name": "1 John",
    "apiName": "1 John",
    "testament": "NT",
    "category": "General Epistles",
    "chapters": 5
  },
  {
    "name": "2 John",
    "apiName": "2 John",
    "testament": "NT",
    "category": "General Epistles",
    "chapters": 1
  },
  {
    "name": "3 John",
    "apiName": "3 John",
    "testament": "NT",
    "category": "General Epistles",
    "chapters": 1
  },
  {
    "name": "Jude",
    "apiName": "Jude",
    "testament": "NT",
    "category": "General Epistles",
    "chapters": 1
  },
  {
    "name": "Revelation",
    "apiName": "Revelation",
    "testament": "NT",
    "category": "Prophecy",
    "chapters": 22
  }
];

export const bibleBooks = BIBLE_BOOKS.map(b => b.name);

export const bundledLibrary = {
  "Genesis": {
    "1": {
      "kjv": [
        {
          "verse": 1,
          "text": "In the beginning God created the heaven and the earth."
        },
        {
          "verse": 2,
          "text": "And the earth was without form, and void; and darkness was  upon the face of the deep. And the Spirit of God moved upon the face of the waters."
        },
        {
          "verse": 3,
          "text": "And God said, Let there be light: and there was light."
        },
        {
          "verse": 4,
          "text": "And God saw the light, that it was good: and God divided the light from the darkness."
        },
        {
          "verse": 5,
          "text": "And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day."
        },
        {
          "verse": 6,
          "text": "And God said, Let there be a firmament in the midst of the waters, and let it divide the waters from the waters."
        },
        {
          "verse": 7,
          "text": "And God made the firmament, and divided the waters which were  under the firmament from the waters which were above the firmament: and it was so."
        },
        {
          "verse": 8,
          "text": "And God called the firmament Heaven. And the evening and the morning were the second day."
        },
        {
          "verse": 9,
          "text": "And God said, Let the waters under the heaven be gathered together unto one place, and let the dry land appear: and it was so."
        },
        {
          "verse": 10,
          "text": "And God called the dry land Earth; and the gathering together of the waters called he Seas: and God saw that it was good."
        },
        {
          "verse": 11,
          "text": "And God said, Let the earth bring forth grass, the herb yielding seed, and the fruit tree yielding fruit after his kind, whose seed is in itself, upon the earth: and it was so."
        },
        {
          "verse": 12,
          "text": "And the earth brought forth grass, and herb yielding seed after his kind, and the tree yielding fruit, whose seed was in itself, after his kind: and God saw that it was good."
        },
        {
          "verse": 13,
          "text": "And the evening and the morning were the third day."
        },
        {
          "verse": 14,
          "text": "And God said, Let there be lights in the firmament of the heaven to divide the day from the night; and let them be for signs, and for seasons, and for days, and years:"
        },
        {
          "verse": 15,
          "text": "And let them be for lights in the firmament of the heaven to give light upon the earth: and it was so."
        },
        {
          "verse": 16,
          "text": "And God made two great lights; the greater light to rule the day, and the lesser light to rule the night: he made the stars also."
        },
        {
          "verse": 17,
          "text": "And God set them in the firmament of the heaven to give light upon the earth,"
        },
        {
          "verse": 18,
          "text": "And to rule over the day and over the night, and to divide the light from the darkness: and God saw that it was good."
        },
        {
          "verse": 19,
          "text": "And the evening and the morning were the fourth day."
        },
        {
          "verse": 20,
          "text": "And God said, Let the waters bring forth abundantly the moving creature that hath life, and fowl that may fly above the earth in the open firmament of heaven."
        },
        {
          "verse": 21,
          "text": "And God created great whales, and every living creature that moveth, which the waters brought forth abundantly, after their kind, and every winged fowl after his kind: and God saw that it was good."
        },
        {
          "verse": 22,
          "text": "And God blessed them, saying, Be fruitful, and multiply, and fill the waters in the seas, and let fowl multiply in the earth."
        },
        {
          "verse": 23,
          "text": "And the evening and the morning were the fifth day."
        },
        {
          "verse": 24,
          "text": "And God said, Let the earth bring forth the living creature after his kind, cattle, and creeping thing, and beast of the earth after his kind: and it was so."
        },
        {
          "verse": 25,
          "text": "And God made the beast of the earth after his kind, and cattle after their kind, and every thing that creepeth upon the earth after his kind: and God saw that it was good."
        },
        {
          "verse": 26,
          "text": "And God said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth."
        },
        {
          "verse": 27,
          "text": "So God created man in his own image, in the image of God created he him; male and female created he them."
        },
        {
          "verse": 28,
          "text": "And God blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it: and have dominion over the fish of the sea, and over the fowl of the air, and over every living thing that moveth upon the earth."
        },
        {
          "verse": 29,
          "text": "And God said, Behold, I have given you every herb bearing seed, which is upon the face of all the earth, and every tree, in the which is the fruit of a tree yielding seed; to you it shall be for meat."
        },
        {
          "verse": 30,
          "text": "And to every beast of the earth, and to every fowl of the air, and to every thing that creepeth upon the earth, wherein there is life, I have given every green herb for meat: and it was so."
        },
        {
          "verse": 31,
          "text": "And God saw every thing that he had made, and, behold, it was  very good. And the evening and the morning were the sixth day."
        }
      ],
      "web": [
        {
          "verse": 1,
          "text": "In the beginning, God created the heavens and the earth."
        },
        {
          "verse": 2,
          "text": "The earth was formless and empty. Darkness was on the surface of the deep and God’s Spirit was hovering over the surface of the waters."
        },
        {
          "verse": 3,
          "text": "God said, “Let there be light,” and there was light."
        },
        {
          "verse": 4,
          "text": "God saw the light, and saw that it was good. God divided the light from the darkness."
        },
        {
          "verse": 5,
          "text": "God called the light “day”, and the darkness he called “night”. There was evening and there was morning, the first day."
        },
        {
          "verse": 6,
          "text": "God said, “Let there be an expanse in the middle of the waters, and let it divide the waters from the waters.”"
        },
        {
          "verse": 7,
          "text": "God made the expanse, and divided the waters which were under the expanse from the waters which were above the expanse; and it was so."
        },
        {
          "verse": 8,
          "text": "God called the expanse “sky”. There was evening and there was morning, a second day."
        },
        {
          "verse": 9,
          "text": "God said, “Let the waters under the sky be gathered together to one place, and let the dry land appear”; and it was so."
        },
        {
          "verse": 10,
          "text": "God called the dry land “earth”, and the gathering together of the waters he called “seas”. God saw that it was good."
        },
        {
          "verse": 11,
          "text": "God said, “Let the earth yield grass, herbs yielding seeds, and fruit trees bearing fruit after their kind, with their seeds in it, on the earth”; and it was so."
        },
        {
          "verse": 12,
          "text": "The earth yielded grass, herbs yielding seed after their kind, and trees bearing fruit, with their seeds in it, after their kind; and God saw that it was good."
        },
        {
          "verse": 13,
          "text": "There was evening and there was morning, a third day."
        },
        {
          "verse": 14,
          "text": "God said, “Let there be lights in the expanse of the sky to divide the day from the night; and let them be for signs to mark seasons, days, and years;"
        },
        {
          "verse": 15,
          "text": "and let them be for lights in the expanse of the sky to give light on the earth”; and it was so."
        },
        {
          "verse": 16,
          "text": "God made the two great lights: the greater light to rule the day, and the lesser light to rule the night. He also made the stars."
        },
        {
          "verse": 17,
          "text": "God set them in the expanse of the sky to give light to the earth,"
        },
        {
          "verse": 18,
          "text": "and to rule over the day and over the night, and to divide the light from the darkness. God saw that it was good."
        },
        {
          "verse": 19,
          "text": "There was evening and there was morning, a fourth day."
        },
        {
          "verse": 20,
          "text": "God said, “Let the waters abound with living creatures, and let birds fly above the earth in the open expanse of the sky.”"
        },
        {
          "verse": 21,
          "text": "God created the large sea creatures and every living creature that moves, with which the waters swarmed, after their kind, and every winged bird after its kind. God saw that it was good."
        },
        {
          "verse": 22,
          "text": "God blessed them, saying, “Be fruitful, and multiply, and fill the waters in the seas, and let birds multiply on the earth.”"
        },
        {
          "verse": 23,
          "text": "There was evening and there was morning, a fifth day."
        },
        {
          "verse": 24,
          "text": "God said, “Let the earth produce living creatures after their kind, livestock, creeping things, and animals of the earth after their kind”; and it was so."
        },
        {
          "verse": 25,
          "text": "God made the animals of the earth after their kind, and the livestock after their kind, and everything that creeps on the ground after its kind. God saw that it was good."
        },
        {
          "verse": 26,
          "text": "God said, “Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the birds of the sky, and over the livestock, and over all the earth, and over every creeping thing that creeps on the earth.”"
        },
        {
          "verse": 27,
          "text": "God created man in his own image. In God’s image he created him; male and female he created them."
        },
        {
          "verse": 28,
          "text": "God blessed them. God said to them, “Be fruitful, multiply, fill the earth, and subdue it. Have dominion over the fish of the sea, over the birds of the sky, and over every living thing that moves on the earth.”"
        },
        {
          "verse": 29,
          "text": "God said, “Behold, I have given you every herb yielding seed, which is on the surface of all the earth, and every tree, which bears fruit yielding seed. It will be your food."
        },
        {
          "verse": 30,
          "text": "To every animal of the earth, and to every bird of the sky, and to everything that creeps on the earth, in which there is life, I have given every green herb for food;” and it was so."
        },
        {
          "verse": 31,
          "text": "God saw everything that he had made, and, behold, it was very good. There was evening and there was morning, a sixth day."
        }
      ]
    }
  },
  "Exodus": {
    "20": {
      "kjv": [
        {
          "verse": 1,
          "text": "And God spake all these words, saying,"
        },
        {
          "verse": 2,
          "text": "I am the LORD thy God, which have brought thee out of the land of Egypt, out of the house of bondage."
        },
        {
          "verse": 3,
          "text": "Thou shalt have no other gods before me."
        },
        {
          "verse": 4,
          "text": "Thou shalt not make unto thee any graven image, or any likeness of any thing that is in heaven above, or that is  in the earth beneath, or that is in the water under the earth:"
        },
        {
          "verse": 5,
          "text": "Thou shalt not bow down thyself to them, nor serve them: for I the LORD thy God am a jealous God, visiting the iniquity of the fathers upon the children unto the third and fourth generation of them that hate me;"
        },
        {
          "verse": 6,
          "text": "And shewing mercy unto thousands of them that love me, and keep my commandments."
        },
        {
          "verse": 7,
          "text": "Thou shalt not take the name of the LORD thy God in vain; for the LORD will not hold him guiltless that taketh his name in vain."
        },
        {
          "verse": 8,
          "text": "Remember the sabbath day, to keep it holy."
        },
        {
          "verse": 9,
          "text": "Six days shalt thou labour, and do all thy work:"
        },
        {
          "verse": 10,
          "text": "But the seventh day is the sabbath of the LORD thy God: in it thou shalt not do any work, thou, nor thy son, nor thy daughter, thy manservant, nor thy maidservant, nor thy cattle, nor thy stranger that is within thy gates:"
        },
        {
          "verse": 11,
          "text": "For in six days the LORD made heaven and earth, the sea, and all that in them is, and rested the seventh day: wherefore the LORD blessed the sabbath day, and hallowed it."
        },
        {
          "verse": 12,
          "text": "Honour thy father and thy mother: that thy days may be long upon the land which the LORD thy God giveth thee."
        },
        {
          "verse": 13,
          "text": "Thou shalt not kill."
        },
        {
          "verse": 14,
          "text": "Thou shalt not commit adultery."
        },
        {
          "verse": 15,
          "text": "Thou shalt not steal."
        },
        {
          "verse": 16,
          "text": "Thou shalt not bear false witness against thy neighbour."
        },
        {
          "verse": 17,
          "text": "Thou shalt not covet thy neighbour’s house, thou shalt not covet thy neighbour’s wife, nor his manservant, nor his maidservant, nor his ox, nor his ass, nor any thing that is thy neighbour’s."
        },
        {
          "verse": 18,
          "text": "And all the people saw the thunderings, and the lightnings, and the noise of the trumpet, and the mountain smoking: and when the people saw it, they removed, and stood afar off."
        },
        {
          "verse": 19,
          "text": "And they said unto Moses, Speak thou with us, and we will hear: but let not God speak with us, lest we die."
        },
        {
          "verse": 20,
          "text": "And Moses said unto the people, Fear not: for God is come to prove you, and that his fear may be before your faces, that ye sin not."
        },
        {
          "verse": 21,
          "text": "And the people stood afar off, and Moses drew near unto the thick darkness where God was."
        },
        {
          "verse": 22,
          "text": "And the LORD said unto Moses, Thus thou shalt say unto the children of Israel, Ye have seen that I have talked with you from heaven."
        },
        {
          "verse": 23,
          "text": "Ye shall not make with me gods of silver, neither shall ye make unto you gods of gold."
        },
        {
          "verse": 24,
          "text": "An altar of earth thou shalt make unto me, and shalt sacrifice thereon thy burnt offerings, and thy peace offerings, thy sheep, and thine oxen: in all places where I record my name I will come unto thee, and I will bless thee."
        },
        {
          "verse": 25,
          "text": "And if thou wilt make me an altar of stone, thou shalt not build it of hewn stone: for if thou lift up thy tool upon it, thou hast polluted it."
        },
        {
          "verse": 26,
          "text": "Neither shalt thou go up by steps unto mine altar, that thy nakedness be not discovered thereon."
        }
      ],
      "web": [
        {
          "verse": 1,
          "text": "God spoke all these words, saying,"
        },
        {
          "verse": 2,
          "text": "“I am Yahweh your God, who brought you out of the land of Egypt, out of the house of bondage."
        },
        {
          "verse": 3,
          "text": "“You shall have no other gods before me."
        },
        {
          "verse": 4,
          "text": "“You shall not make for yourselves an idol, nor any image of anything that is in the heavens above, or that is in the earth beneath, or that is in the water under the earth:"
        },
        {
          "verse": 5,
          "text": "you shall not bow yourself down to them, nor serve them, for I, Yahweh your God, am a jealous God, visiting the iniquity of the fathers on the children, on the third and on the fourth generation of those who hate me,"
        },
        {
          "verse": 6,
          "text": "and showing loving kindness to thousands of those who love me and keep my commandments."
        },
        {
          "verse": 7,
          "text": "“You shall not take the name of Yahweh your God in vain, for Yahweh will not hold him guiltless who takes his name in vain."
        },
        {
          "verse": 8,
          "text": "“Remember the Sabbath day, to keep it holy."
        },
        {
          "verse": 9,
          "text": "You shall labor six days, and do all your work,"
        },
        {
          "verse": 10,
          "text": "but the seventh day is a Sabbath to Yahweh your God. You shall not do any work in it, you, nor your son, nor your daughter, your male servant, nor your female servant, nor your livestock, nor your stranger who is within your gates;"
        },
        {
          "verse": 11,
          "text": "for in six days Yahweh made heaven and earth, the sea, and all that is in them, and rested the seventh day; therefore Yahweh blessed the Sabbath day, and made it holy."
        },
        {
          "verse": 12,
          "text": "“Honor your father and your mother, that your days may be long in the land which Yahweh your God gives you."
        },
        {
          "verse": 13,
          "text": "“You shall not murder."
        },
        {
          "verse": 14,
          "text": "“You shall not commit adultery."
        },
        {
          "verse": 15,
          "text": "“You shall not steal."
        },
        {
          "verse": 16,
          "text": "“You shall not give false testimony against your neighbor."
        },
        {
          "verse": 17,
          "text": "“You shall not covet your neighbor’s house. You shall not covet your neighbor’s wife, nor his male servant, nor his female servant, nor his ox, nor his donkey, nor anything that is your neighbor’s.”"
        },
        {
          "verse": 18,
          "text": "All the people perceived the thunderings, the lightnings, the sound of the trumpet, and the mountain smoking. When the people saw it, they trembled, and stayed at a distance."
        },
        {
          "verse": 19,
          "text": "They said to Moses, “Speak with us yourself, and we will listen; but don’t let God speak with us, lest we die.”"
        },
        {
          "verse": 20,
          "text": "Moses said to the people, “Don’t be afraid, for God has come to test you, and that his fear may be before you, that you won’t sin.”"
        },
        {
          "verse": 21,
          "text": "The people stayed at a distance, and Moses came near to the thick darkness where God was."
        },
        {
          "verse": 22,
          "text": "Yahweh said to Moses, “This is what you shall tell the children of Israel: ‘You yourselves have seen that I have talked with you from heaven."
        },
        {
          "verse": 23,
          "text": "You shall most certainly not make gods of silver or gods of gold for yourselves to be alongside me."
        },
        {
          "verse": 24,
          "text": "You shall make an altar of earth for me, and shall sacrifice on it your burnt offerings and your peace offerings, your sheep and your cattle. In every place where I record my name I will come to you and I will bless you."
        },
        {
          "verse": 25,
          "text": "If you make me an altar of stone, you shall not build it of cut stones; for if you lift up your tool on it, you have polluted it."
        },
        {
          "verse": 26,
          "text": "You shall not go up by steps to my altar, that your nakedness may not be exposed to it.’"
        }
      ]
    }
  },
  "Psalms": {
    "23": {
      "kjv": [
        {
          "verse": 1,
          "text": "The LORD is my shepherd; I shall not want."
        },
        {
          "verse": 2,
          "text": "He maketh me to lie down in green pastures: he leadeth me beside the still waters."
        },
        {
          "verse": 3,
          "text": "He restoreth my soul: he leadeth me in the paths of righteousness for his name’s sake."
        },
        {
          "verse": 4,
          "text": "Yea, though I walk through the valley of the shadow of death, I will fear no evil: for thou art with me; thy rod and thy staff they comfort me."
        },
        {
          "verse": 5,
          "text": "Thou preparest a table before me in the presence of mine enemies: thou anointest my head with oil; my cup runneth over."
        },
        {
          "verse": 6,
          "text": "Surely goodness and mercy shall follow me all the days of my life: and I will dwell in the house of the LORD for ever."
        }
      ],
      "web": [
        {
          "verse": 1,
          "text": "Yahweh is my shepherd: I shall lack nothing."
        },
        {
          "verse": 2,
          "text": "He makes me lie down in green pastures. He leads me beside still waters."
        },
        {
          "verse": 3,
          "text": "He restores my soul. He guides me in the paths of righteousness for his name’s sake."
        },
        {
          "verse": 4,
          "text": "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me."
        },
        {
          "verse": 5,
          "text": "You prepare a table before me in the presence of my enemies. You anoint my head with oil. My cup runs over."
        },
        {
          "verse": 6,
          "text": "Surely goodness and loving kindness shall follow me all the days of my life, and I will dwell in Yahweh’s house forever."
        }
      ]
    }
  },
  "Proverbs": {
    "3": {
      "kjv": [
        {
          "verse": 1,
          "text": "My son, forget not my law; but let thine heart keep my commandments:"
        },
        {
          "verse": 2,
          "text": "For length of days, and long life, and peace, shall they add to thee."
        },
        {
          "verse": 3,
          "text": "Let not mercy and truth forsake thee: bind them about thy neck; write them upon the table of thine heart:"
        },
        {
          "verse": 4,
          "text": "So shalt thou find favour and good understanding in the sight of God and man."
        },
        {
          "verse": 5,
          "text": "Trust in the LORD with all thine heart; and lean not unto thine own understanding."
        },
        {
          "verse": 6,
          "text": "In all thy ways acknowledge him, and he shall direct thy paths."
        },
        {
          "verse": 7,
          "text": "Be not wise in thine own eyes: fear the LORD, and depart from evil."
        },
        {
          "verse": 8,
          "text": "It shall be health to thy navel, and marrow to thy bones."
        },
        {
          "verse": 9,
          "text": "Honour the LORD with thy substance, and with the firstfruits of all thine increase:"
        },
        {
          "verse": 10,
          "text": "So shall thy barns be filled with plenty, and thy presses shall burst out with new wine."
        },
        {
          "verse": 11,
          "text": "My son, despise not the chastening of the LORD; neither be weary of his correction:"
        },
        {
          "verse": 12,
          "text": "For whom the LORD loveth he correcteth; even as a father the son in whom he delighteth."
        },
        {
          "verse": 13,
          "text": "Happy is the man that findeth wisdom, and the man that getteth understanding."
        },
        {
          "verse": 14,
          "text": "For the merchandise of it is better than the merchandise of silver, and the gain thereof than fine gold."
        },
        {
          "verse": 15,
          "text": "She is more precious than rubies: and all the things thou canst desire are not to be compared unto her."
        },
        {
          "verse": 16,
          "text": "Length of days is in her right hand; and in her left hand riches and honour."
        },
        {
          "verse": 17,
          "text": "Her ways are ways of pleasantness, and all her paths are peace."
        },
        {
          "verse": 18,
          "text": "She is a tree of life to them that lay hold upon her: and happy is every one that retaineth her."
        },
        {
          "verse": 19,
          "text": "The LORD by wisdom hath founded the earth; by understanding hath he established the heavens."
        },
        {
          "verse": 20,
          "text": "By his knowledge the depths are broken up, and the clouds drop down the dew."
        },
        {
          "verse": 21,
          "text": "My son, let not them depart from thine eyes: keep sound wisdom and discretion:"
        },
        {
          "verse": 22,
          "text": "So shall they be life unto thy soul, and grace to thy neck."
        },
        {
          "verse": 23,
          "text": "Then shalt thou walk in thy way safely, and thy foot shall not stumble."
        },
        {
          "verse": 24,
          "text": "When thou liest down, thou shalt not be afraid: yea, thou shalt lie down, and thy sleep shall be sweet."
        },
        {
          "verse": 25,
          "text": "Be not afraid of sudden fear, neither of the desolation of the wicked, when it cometh."
        },
        {
          "verse": 26,
          "text": "For the LORD shall be thy confidence, and shall keep thy foot from being taken."
        },
        {
          "verse": 27,
          "text": "Withhold not good from them to whom it is due, when it is in the power of thine hand to do it."
        },
        {
          "verse": 28,
          "text": "Say not unto thy neighbour, Go, and come again, and to morrow I will give; when thou hast it by thee."
        },
        {
          "verse": 29,
          "text": "Devise not evil against thy neighbour, seeing he dwelleth securely by thee."
        },
        {
          "verse": 30,
          "text": "Strive not with a man without cause, if he have done thee no harm."
        },
        {
          "verse": 31,
          "text": "Envy thou not the oppressor, and choose none of his ways."
        },
        {
          "verse": 32,
          "text": "For the froward is abomination to the LORD: but his secret is with the righteous."
        },
        {
          "verse": 33,
          "text": "The curse of the LORD is in the house of the wicked: but he blesseth the habitation of the just."
        },
        {
          "verse": 34,
          "text": "Surely he scorneth the scorners: but he giveth grace unto the lowly."
        },
        {
          "verse": 35,
          "text": "The wise shall inherit glory: but shame shall be the promotion of fools."
        }
      ],
      "web": [
        {
          "verse": 1,
          "text": "My son, don’t forget my teaching; but let your heart keep my commandments:"
        },
        {
          "verse": 2,
          "text": "for length of days, and years of life, and peace, will they add to you."
        },
        {
          "verse": 3,
          "text": "Don’t let kindness and truth forsake you. Bind them around your neck. Write them on the tablet of your heart."
        },
        {
          "verse": 4,
          "text": "So you will find favor, and good understanding in the sight of God and man."
        },
        {
          "verse": 5,
          "text": "Trust in Yahweh with all your heart, and don’t lean on your own understanding."
        },
        {
          "verse": 6,
          "text": "In all your ways acknowledge him, and he will make your paths straight."
        },
        {
          "verse": 7,
          "text": "Don’t be wise in your own eyes. Fear Yahweh, and depart from evil."
        },
        {
          "verse": 8,
          "text": "It will be health to your body, and nourishment to your bones."
        },
        {
          "verse": 9,
          "text": "Honor Yahweh with your substance, with the first fruits of all your increase:"
        },
        {
          "verse": 10,
          "text": "so your barns will be filled with plenty, and your vats will overflow with new wine."
        },
        {
          "verse": 11,
          "text": "My son, don’t despise Yahweh’s discipline, neither be weary of his reproof:"
        },
        {
          "verse": 12,
          "text": "for whom Yahweh loves, he reproves; even as a father reproves the son in whom he delights."
        },
        {
          "verse": 13,
          "text": "Happy is the man who finds wisdom, the man who gets understanding."
        },
        {
          "verse": 14,
          "text": "For her good profit is better than getting silver, and her return is better than fine gold."
        },
        {
          "verse": 15,
          "text": "She is more precious than rubies. None of the things you can desire are to be compared to her."
        },
        {
          "verse": 16,
          "text": "Length of days is in her right hand. In her left hand are riches and honor."
        },
        {
          "verse": 17,
          "text": "Her ways are ways of pleasantness. All her paths are peace."
        },
        {
          "verse": 18,
          "text": "She is a tree of life to those who lay hold of her. Happy is everyone who retains her."
        },
        {
          "verse": 19,
          "text": "By wisdom Yahweh founded the earth. By understanding, he established the heavens."
        },
        {
          "verse": 20,
          "text": "By his knowledge, the depths were broken up, and the skies drop down the dew."
        },
        {
          "verse": 21,
          "text": "My son, let them not depart from your eyes. Keep sound wisdom and discretion:"
        },
        {
          "verse": 22,
          "text": "so they will be life to your soul, and grace for your neck."
        },
        {
          "verse": 23,
          "text": "Then you shall walk in your way securely. Your foot won’t stumble."
        },
        {
          "verse": 24,
          "text": "When you lie down, you will not be afraid. Yes, you will lie down, and your sleep will be sweet."
        },
        {
          "verse": 25,
          "text": "Don’t be afraid of sudden fear, neither of the desolation of the wicked, when it comes:"
        },
        {
          "verse": 26,
          "text": "for Yahweh will be your confidence, and will keep your foot from being taken."
        },
        {
          "verse": 27,
          "text": "Don’t withhold good from those to whom it is due, when it is in the power of your hand to do it."
        },
        {
          "verse": 28,
          "text": "Don’t say to your neighbor, “Go, and come again; tomorrow I will give it to you,” when you have it by you."
        },
        {
          "verse": 29,
          "text": "Don’t devise evil against your neighbor, since he dwells securely by you."
        },
        {
          "verse": 30,
          "text": "Don’t strive with a man without cause, if he has done you no harm."
        },
        {
          "verse": 31,
          "text": "Don’t envy the man of violence. Choose none of his ways."
        },
        {
          "verse": 32,
          "text": "For the perverse is an abomination to Yahweh, but his friendship is with the upright."
        },
        {
          "verse": 33,
          "text": "Yahweh’s curse is in the house of the wicked, but he blesses the habitation of the righteous."
        },
        {
          "verse": 34,
          "text": "Surely he mocks the mockers, but he gives grace to the humble."
        },
        {
          "verse": 35,
          "text": "The wise will inherit glory, but shame will be the promotion of fools."
        }
      ]
    }
  },
  "Tobit": {
    "1": {
      "kjv": [
        {
          "verse": 1,
          "text": "The book of the words of Tobit, son of Tobiel, the son of Ananiel, the son of Aduel, the son of Gabael, of the seed of Asael, of the tribe of Nephthali;"
        },
        {
          "verse": 2,
          "text": "Who in the time of Enemessar king of the Assyrians was led captive out of Thisbe, which is at the right hand of that city, which is called properly Nephthali in Galilee above Aser."
        },
        {
          "verse": 3,
          "text": "I Tobit have walked all the days of my life in the ways of truth and justice, and I did many almsdeeds to my brethren, and my nation, who came with me to Nineve, into the land of the Assyrians."
        },
        {
          "verse": 4,
          "text": "And when I was in mine own country, in the land of Israel being but young, all the tribe of Nephthali my father fell from the house of Jerusalem, which was chosen out of all the tribes of Israel, that all the tribes should sacrifice there, where the temple of the habitation of the most High was consecrated and built for all ages."
        },
        {
          "verse": 5,
          "text": "Now all the tribes which together revolted, and the house of my father Nephthali, sacrificed unto the heifer Baal."
        },
        {
          "verse": 6,
          "text": "But I alone went often to Jerusalem at the feasts, as it was ordained unto all the people of Israel by an everlasting decree, having the firstfruits and tenths of increase, with that which was first shorn; and them gave I at the altar to the priests the children of Aaron."
        },
        {
          "verse": 7,
          "text": "The first tenth part of all increase I gave to the sons of Aaron, who ministered at Jerusalem: another tenth part I sold away, and went, and spent it every year at Jerusalem:"
        },
        {
          "verse": 8,
          "text": "And the third I gave unto them to whom it was meet, as Debora my father’s mother had commanded me, because I was left an orphan by my father."
        },
        {
          "verse": 9,
          "text": "Furthermore, when I was come to the age of a man, I married Anna of mine own kindred, and of her I begat Tobias."
        },
        {
          "verse": 10,
          "text": "And when we were carried away captives to Nineve, all my brethren and those that were of my kindred did eat of the bread of the Gentiles."
        },
        {
          "verse": 11,
          "text": "But I kept myself from eating;"
        },
        {
          "verse": 12,
          "text": "Because I remembered God with all my heart."
        },
        {
          "verse": 13,
          "text": "And the most High gave me grace and favour before Enemessar, so that I was his purveyor."
        },
        {
          "verse": 14,
          "text": "And I went into Media, and left in trust with Gabael, the brother of Gabrias, at Rages a city of Media ten talents of silver."
        },
        {
          "verse": 15,
          "text": "Now when Enemessar was dead, Sennacherib his son reigned in his stead; whose estate was troubled, that I could not go into Media."
        },
        {
          "verse": 16,
          "text": "And in the time of Enemessar I gave many alms to my brethren, and gave my bread to the hungry,"
        },
        {
          "verse": 17,
          "text": "And my clothes to the naked: and if I saw any of my nation dead, or cast about the walls of Nineve, I buried him."
        },
        {
          "verse": 18,
          "text": "And if the king Sennacherib had slain any, when he was come, and fled from Judea, I buried them privily; for in his wrath he killed many; but the bodies were not found, when they were sought for of the king."
        },
        {
          "verse": 19,
          "text": "And when one of the Ninevites went and complained of me to the king, that I buried them, and hid myself; understanding that I was sought for to be put to death, I withdrew myself for fear."
        },
        {
          "verse": 20,
          "text": "Then all my goods were forcibly taken away, neither was there any thing left me, beside my wife Anna and my son Tobias."
        },
        {
          "verse": 21,
          "text": "And there passed not five and fifty days, before two of his sons killed him, and they fled into the mountains of Ararath; and Sarchedonus his son reigned in his stead; who appointed over his father’s accounts, and over all his affairs, Achiacharus my brother Anael’s son."
        },
        {
          "verse": 22,
          "text": "And Achiacharus intreating for me, I returned to Nineve. Now Achiacharus was cupbearer, and keeper of the signet, and steward, and overseer of the accounts: and Sarchedonus appointed him next unto him: and he was my brother’s son."
        }
      ],
      "web": [
        {
          "verse": 1,
          "text": "The book of the words of Tobit, the son of Tobiel, the son of Ananiel, the son of Aduel, the son of Gabael, of the seed of Asiel, of the tribe of Naphtali;"
        },
        {
          "verse": 2,
          "text": "who in the days of  Enemessar king of the Assyrians was carried away captive out of Thisbe, which is on the right hand of Kedesh Naphtali in Galilee above Asher."
        },
        {
          "verse": 3,
          "text": "I, Tobit walked in the ways of truth and righteousness all the days of my life, and I did many alms deeds to my kindred and my nation, who went with me into the land of the Assyrians, to Nineveh."
        },
        {
          "verse": 4,
          "text": "When I was in my own country, in the land of Israel, while I was yet young, all the tribe of Naphtali my father fell away from the house of Jerusalem, which was chosen out of all the tribes of Israel, that all the tribes should sacrifice there, and the temple of the habitation of the Most High was hallowed and built therein for all ages."
        },
        {
          "verse": 5,
          "text": "All the tribes which fell away together sacrificed to the heifer Baal, and so did the house of Naphtali my father."
        },
        {
          "verse": 6,
          "text": "I alone went often to Jerusalem at the feasts, as it has been ordained to all Israel by an everlasting decree, having the first fruits and the tenths of my increase, and that which was first shorn; and I gave them at the altar to the priests the sons of Aaron."
        },
        {
          "verse": 7,
          "text": "I gave a tenth part of all my increase to the sons of Levi, who ministered at Jerusalem. A second tenth part I sold away, and went, and spent it each year at Jerusalem."
        },
        {
          "verse": 8,
          "text": "A third tenth I gave to them to whom it was appropriate, as Deborah my father’s mother had commanded me, because I was left an orphan by my father."
        },
        {
          "verse": 9,
          "text": "When I became a man, I took as wife Anna of the seed of our own family. With her, I became the father of Tobias."
        },
        {
          "verse": 10,
          "text": "When I was carried away captive to Nineveh, all my kindred and my relatives ate of the bread of the Gentiles;"
        },
        {
          "verse": 11,
          "text": "but I kept myself from eating,"
        },
        {
          "verse": 12,
          "text": "because I remembered God with all my soul."
        },
        {
          "verse": 13,
          "text": "So the Most High gave me grace and  favor in the sight of Enemessar, and I was his purveyor."
        },
        {
          "verse": 14,
          "text": "And I went into Media, and left ten talents of silver in trust with Gabael, the brother of Gabrias, at Rages of Media."
        },
        {
          "verse": 15,
          "text": "And when Enemessar was dead, Sennacherib his son reigned in his place.  In his time, the highways were troubled, and I could no longer go into Media."
        },
        {
          "verse": 16,
          "text": "In the days of Enemessar, I did many alms deeds to my kindred: I gave my bread to the hungry,"
        },
        {
          "verse": 17,
          "text": "and my garments to the naked. If I saw any of my race dead, and cast forth  on the wall of Ninevah, I buried him."
        },
        {
          "verse": 18,
          "text": "If Sennacherib the king killed any, when he came fleeing from Judea, I buried them privately; for in his wrath he killed many; and the bodies were sought for by the king, and were not found."
        },
        {
          "verse": 19,
          "text": "But one of the Ninevites went and showed to the king concerning me, how I buried them, and hid myself; and when I knew that I was sought for to be put to death, I withdrew myself for fear."
        },
        {
          "verse": 20,
          "text": "And all my goods were forcibly taken away, and there was nothing left to me, save my wife Anna and my son Tobias."
        },
        {
          "verse": 21,
          "text": "No more than fifty five days passed before two of his sons killed him, and they fled into the mountains of Ararat. And  Sarchedonus his son reigned in his place; and he appointed Achiacharus my brother Anael’s son over all the accounts of his kingdom, and over all his affairs."
        },
        {
          "verse": 22,
          "text": "Achiacharus requested me, and I came to Nineveh. Now Achiacharus was cupbearer, keeper of the signet, steward, and overseer of the accounts. Sarchedonus appointed him next to himself, but he was my brother’s son."
        }
      ]
    }
  },
  "Wisdom of Solomon": {
    "1": {
      "kjv": [
        {
          "verse": 1,
          "text": "Love righteousness, ye that be judges of the earth: think of the Lord with a good (heart,) and in simplicity of heart seek him."
        },
        {
          "verse": 2,
          "text": "For he will be found of them that tempt him not; and sheweth himself unto such as do not distrust him."
        },
        {
          "verse": 3,
          "text": "For froward thoughts separate from God: and his power, when it is tried, reproveth the unwise."
        },
        {
          "verse": 4,
          "text": "For into a malicious soul wisdom shall not enter; nor dwell in the body that is subject unto sin."
        },
        {
          "verse": 5,
          "text": "For the holy spirit of discipline will flee deceit, and remove from thoughts that are without understanding, and will not abide when unrighteousness cometh in."
        },
        {
          "verse": 6,
          "text": "For wisdom is a loving spirit; and will not acquit a blasphemer of his words: for God is witness of his reins, and a true beholder of his heart, and a hearer of his tongue."
        },
        {
          "verse": 7,
          "text": "For the Spirit of the Lord filleth the world: and that which containeth all things hath knowledge of the voice."
        },
        {
          "verse": 8,
          "text": "Therefore he that speaketh unrighteous things cannot be hid: neither shall vengeance, when it punisheth, pass by him."
        },
        {
          "verse": 9,
          "text": "For inquisition shall be made into the counsels of the ungodly: and the sound of his words shall come unto the Lord for the manifestation of his wicked deeds."
        },
        {
          "verse": 10,
          "text": "For the ear of jealousy heareth all things: and the noise of murmurings is not hid."
        },
        {
          "verse": 11,
          "text": "Therefore beware of murmuring, which is unprofitable; and refrain your tongue from backbiting: for there is no word so secret, that shall go for nought: and the mouth that belieth slayeth the soul."
        },
        {
          "verse": 12,
          "text": "Seek not death in the error of your life: and pull not upon yourselves destruction with the works of your hands."
        },
        {
          "verse": 13,
          "text": "For God made not death: neither hath he pleasure in the destruction of the living."
        },
        {
          "verse": 14,
          "text": "For he created all things, that they might have their being: and the generations of the world were healthful; and there is no poison of destruction in them, nor the kingdom of death upon the earth:"
        },
        {
          "verse": 15,
          "text": "(For righteousness is immortal:)"
        },
        {
          "verse": 16,
          "text": "But ungodly men with their works and words called it to them: for when they thought to have it their friend, they consumed to nought, and made a covenant with it, because they are worthy to take part with it."
        }
      ],
      "web": []
    }
  },
  "Sirach": {
    "1": {
      "kjv": [
        {
          "verse": 1,
          "text": "All wisdom cometh from the Lord, and is with him for ever."
        },
        {
          "verse": 2,
          "text": "Who can number the sand of the sea, and the drops of rain, and the days of eternity?"
        },
        {
          "verse": 3,
          "text": "Who can find out the height of heaven, and the breadth of the earth, and the deep, and wisdom?"
        },
        {
          "verse": 4,
          "text": "Wisdom hath been created before all things, and the understanding of prudence from everlasting."
        },
        {
          "verse": 5,
          "text": "The word of God most high is the fountain of wisdom; and her ways are everlasting commandments."
        },
        {
          "verse": 6,
          "text": "To whom hath the root of wisdom been revealed? or who hath known her wise counsels?"
        },
        {
          "verse": 7,
          "text": "Unto whom hath the knowledge of wisdom been made manifest? and who hath understood her great experience?"
        },
        {
          "verse": 8,
          "text": "There is one wise and greatly to be feared, the Lord sitting upon his throne."
        },
        {
          "verse": 9,
          "text": "He created her, and saw her, and numbered her, and poured her out upon all his works."
        },
        {
          "verse": 10,
          "text": "She is with all flesh according to his gift, and he hath given her to them that love him."
        },
        {
          "verse": 11,
          "text": "The fear of the Lord is honour, and glory, and gladness, and a crown of rejoicing."
        },
        {
          "verse": 12,
          "text": "The fear of the Lord maketh a merry heart, and giveth joy, and gladness, and a long life."
        },
        {
          "verse": 13,
          "text": "Whoso feareth the Lord, it shall go well with him at the last, and he shall find favour in the day of his death."
        },
        {
          "verse": 14,
          "text": "To fear the Lord is the beginning of wisdom: and it was created with the faithful in the womb."
        },
        {
          "verse": 15,
          "text": "She hath built an everlasting foundation with men, and she shall continue with their seed."
        },
        {
          "verse": 16,
          "text": "To fear the Lord is fulness of wisdom, and filleth men with her fruits."
        },
        {
          "verse": 17,
          "text": "She filleth all their house with things desirable, and the garners with her increase."
        },
        {
          "verse": 18,
          "text": "The fear of the Lord is a crown of wisdom, making peace and perfect health to flourish; both which are the gifts of God: and it enlargeth their rejoicing that love him."
        },
        {
          "verse": 19,
          "text": "Wisdom raineth down skill and knowledge of understanding standing, and exalteth them to honour that hold her fast."
        },
        {
          "verse": 20,
          "text": "The root of wisdom is to fear the Lord, and the branches thereof are long life."
        },
        {
          "verse": 21,
          "text": "The fear of the Lord driveth away sins: and where it is present, it turneth away wrath."
        },
        {
          "verse": 22,
          "text": "A furious man cannot be justified; for the sway of his fury shall be his destruction."
        },
        {
          "verse": 23,
          "text": "A patient man will tear for a time, and afterward joy shall spring up unto him."
        },
        {
          "verse": 24,
          "text": "He will hide his words for a time, and the lips of many shall declare his wisdom."
        },
        {
          "verse": 25,
          "text": "The parables of knowledge are in the treasures of wisdom: but godliness is an abomination to a sinner."
        },
        {
          "verse": 26,
          "text": "If thou desire wisdom, keep the commandments, and the Lord shall give her unto thee."
        },
        {
          "verse": 27,
          "text": "For the fear of the Lord is wisdom and instruction: and faith and meekness are his delight."
        },
        {
          "verse": 28,
          "text": "Distrust not the fear of the Lord when thou art poor: and come not unto him with a double heart."
        },
        {
          "verse": 29,
          "text": "Be not an hypocrite in the sight of men, and take good heed what thou speakest."
        },
        {
          "verse": 30,
          "text": "Exalt not thyself, lest thou fall, and bring dishonour upon thy soul, and so God discover thy secrets, and cast thee down in the midst of the congregation, because thou camest not in truth to the fear of the Lord, but thy heart is full of deceit."
        }
      ],
      "web": []
    }
  },
  "Matthew": {
    "5": {
      "kjv": [
        {
          "verse": 1,
          "text": "And seeing the multitudes, he went up into a mountain: and when he was set, his disciples came unto him:"
        },
        {
          "verse": 2,
          "text": "And he opened his mouth, and taught them, saying,"
        },
        {
          "verse": 3,
          "text": "Blessed are the poor in spirit: for theirs is the kingdom of heaven."
        },
        {
          "verse": 4,
          "text": "Blessed are they that mourn: for they shall be comforted."
        },
        {
          "verse": 5,
          "text": "Blessed are the meek: for they shall inherit the earth."
        },
        {
          "verse": 6,
          "text": "Blessed are they which do hunger and thirst after righteousness: for they shall be filled."
        },
        {
          "verse": 7,
          "text": "Blessed are the merciful: for they shall obtain mercy."
        },
        {
          "verse": 8,
          "text": "Blessed are the pure in heart: for they shall see God."
        },
        {
          "verse": 9,
          "text": "Blessed are the peacemakers: for they shall be called the children of God."
        },
        {
          "verse": 10,
          "text": "Blessed are they which are persecuted for righteousness sake: for theirs is the kingdom of heaven."
        },
        {
          "verse": 11,
          "text": "Blessed are ye, when men shall revile you, and persecute you, and shall say all manner of evil against you falsely, for my sake."
        },
        {
          "verse": 12,
          "text": "Rejoice, and be exceeding glad: for great is your reward in heaven: for so persecuted they the prophets which were before you."
        },
        {
          "verse": 13,
          "text": "Ye are the salt of the earth: but if the salt have lost his savour, wherewith shall it be salted? it is thenceforth good for nothing, but to be cast out, and to be trodden under foot of men."
        },
        {
          "verse": 14,
          "text": "Ye are the light of the world. A city that is set on an hill cannot be hid."
        },
        {
          "verse": 15,
          "text": "Neither do men light a candle, and put it under a bushel, but on a candlestick; and it giveth light unto all that are in the house."
        },
        {
          "verse": 16,
          "text": "Let your light so shine before men, that they may see your good works, and glorify your Father which is in heaven."
        },
        {
          "verse": 17,
          "text": "Think not that I am come to destroy the law, or the prophets: I am not come to destroy, but to fulfil."
        },
        {
          "verse": 18,
          "text": "For verily I say unto you, Till heaven and earth pass, one jot or one tittle shall in no wise pass from the law, till all be fulfilled."
        },
        {
          "verse": 19,
          "text": "Whosoever therefore shall break one of these least commandments, and shall teach men so, he shall be called the least in the kingdom of heaven: but whosoever shall do and teach them, the same shall be called great in the kingdom of heaven."
        },
        {
          "verse": 20,
          "text": "For I say unto you, That except your righteousness shall exceed the righteousness of the scribes and Pharisees, ye shall in no case enter into the kingdom of heaven."
        },
        {
          "verse": 21,
          "text": "Ye have heard that it was said by them of old time, Thou shalt not kill; and whosoever shall kill shall be in danger of the judgment:"
        },
        {
          "verse": 22,
          "text": "But I say unto you, That whosoever is angry with his brother without a cause shall be in danger of the judgment: and whosoever shall say to his brother, Raca, shall be in danger of the council: but whosoever shall say, Thou fool, shall be in danger of hell fire."
        },
        {
          "verse": 23,
          "text": "Therefore if thou bring thy gift to the altar, and there rememberest that thy brother hath ought against thee;"
        },
        {
          "verse": 24,
          "text": "Leave there thy gift before the altar, and go thy way; first be reconciled to thy brother, and then come and offer thy gift."
        },
        {
          "verse": 25,
          "text": "Agree with thine adversary quickly, whiles thou art in the way with him; lest at any time the adversary deliver thee to the judge, and the judge deliver thee to the officer, and thou be cast into prison."
        },
        {
          "verse": 26,
          "text": "Verily I say unto thee, Thou shalt by no means come out thence, till thou hast paid the uttermost farthing."
        },
        {
          "verse": 27,
          "text": "Ye have heard that it was said by them of old time, Thou shalt not commit adultery:"
        },
        {
          "verse": 28,
          "text": "But I say unto you, That whosoever looketh on a woman to lust after her hath committed adultery with her already in his heart."
        },
        {
          "verse": 29,
          "text": "And if thy right eye offend thee, pluck it out, and cast it  from thee: for it is profitable for thee that one of thy members should perish, and not that thy whole body should be cast into hell."
        },
        {
          "verse": 30,
          "text": "And if thy right hand offend thee, cut if off, and cast it from thee: for it is profitable for thee that one of thy members should perish, and not that thy whole body should be cast into hell."
        },
        {
          "verse": 31,
          "text": "It hath been said, Whosoever shall put away his wife, let him give her a writing of divorcement:"
        },
        {
          "verse": 32,
          "text": "But I say unto you, That whosoever shall put away his wife, saving for the cause of fornication, causeth her to commit adultery: and whosoever shall marry her that is divorced committeth adultery."
        },
        {
          "verse": 33,
          "text": "Again, ye have heard that it hath been said by them of old time, Thou shalt not forswear thyself, but shalt perform unto the Lord thine oaths:"
        },
        {
          "verse": 34,
          "text": "But I say unto you, Swear not at all; neither by heaven; for it is God’s throne:"
        },
        {
          "verse": 35,
          "text": "Nor by the earth; for it is his footstool: neither by Jerusalem; for it is the city of the great King."
        },
        {
          "verse": 36,
          "text": "Neither shalt thou swear by thy head, because thou canst not make one hair white or black."
        },
        {
          "verse": 37,
          "text": "But let your communication be, Yea, yea; Nay, nay: for whatsoever is more than these cometh of evil."
        },
        {
          "verse": 38,
          "text": "Ye have heard that it hath been said, An eye for an eye, and a tooth for a tooth:"
        },
        {
          "verse": 39,
          "text": "But I say unto you, That ye resist not evil: but whosoever shall smite thee on thy right cheek, turn to him the other also."
        },
        {
          "verse": 40,
          "text": "And if any man will sue thee at the law, and take away thy coat, let him have thy cloke also."
        },
        {
          "verse": 41,
          "text": "And whosoever shall compel thee to go a mile, go with him twain."
        },
        {
          "verse": 42,
          "text": "Give to him that asketh thee, and from him that would borrow of thee turn not thou away."
        },
        {
          "verse": 43,
          "text": "Ye have heard that it hath been said, Thou shalt love thy neighbour, and hate thine enemy."
        },
        {
          "verse": 44,
          "text": "But I say unto you, Love your enemies, bless them that curse you, do good to them that hate you, and pray for them which despitefully use you, and persecute you;"
        },
        {
          "verse": 45,
          "text": "That ye may be the children of your Father which is in heaven: for he maketh his sun to rise on the evil and on the good, and sendeth rain on the just and on the unjust."
        },
        {
          "verse": 46,
          "text": "For if ye love them which love you, what reward have ye? do not even the publicans the same?"
        },
        {
          "verse": 47,
          "text": "And if ye salute your brethren only, what do ye more than others? do not even the publicans so?"
        },
        {
          "verse": 48,
          "text": "Be ye therefore perfect, even as your Father which is in heaven is perfect."
        }
      ],
      "web": []
    }
  },
  "John": {
    "1": {
      "kjv": [
        {
          "verse": 1,
          "text": "In the beginning was the Word, and the Word was with God, and the Word was God."
        },
        {
          "verse": 2,
          "text": "The same was in the beginning with God."
        },
        {
          "verse": 3,
          "text": "All things were made by him; and without him was not any thing made that was made."
        },
        {
          "verse": 4,
          "text": "In him was life; and the life was the light of men."
        },
        {
          "verse": 5,
          "text": "And the light shineth in darkness; and the darkness comprehended it not."
        },
        {
          "verse": 6,
          "text": "There was a man sent from God, whose name was John."
        },
        {
          "verse": 7,
          "text": "The same came for a witness, to bear witness of the Light, that all men through him might believe."
        },
        {
          "verse": 8,
          "text": "He was not that Light, but was sent to bear witness of that Light."
        },
        {
          "verse": 9,
          "text": "That was the true Light, which lighteth every man that cometh into the world."
        },
        {
          "verse": 10,
          "text": "He was in the world, and the world was made by him, and the world knew him not."
        },
        {
          "verse": 11,
          "text": "He came unto his own, and his own received him not."
        },
        {
          "verse": 12,
          "text": "But as many as received him, to them gave he power to become the sons of God, even to them that believe on his name:"
        },
        {
          "verse": 13,
          "text": "Which were born, not of blood, nor of the will of the flesh, nor of the will of man, but of God."
        },
        {
          "verse": 14,
          "text": "And the Word was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten of the Father,) full of grace and truth."
        },
        {
          "verse": 15,
          "text": "John bare witness of him, and cried, saying, This was he of whom I spake, He that cometh after me is preferred before me: for he was before me."
        },
        {
          "verse": 16,
          "text": "And of his fulness have all we received, and grace for grace."
        },
        {
          "verse": 17,
          "text": "For the law was given by Moses, but grace and truth came by Jesus Christ."
        },
        {
          "verse": 18,
          "text": "No man hath seen God at any time; the only begotten Son, which is in the bosom of the Father, he hath declared him."
        },
        {
          "verse": 19,
          "text": "And this is the record of John, when the Jews sent priests and Levites from Jerusalem to ask him, Who art thou?"
        },
        {
          "verse": 20,
          "text": "And he confessed, and denied not; but confessed, I am not the Christ."
        },
        {
          "verse": 21,
          "text": "And they asked him, What then? Art thou Elias? And he saith, I am not. Art thou that prophet? And he answered, No."
        },
        {
          "verse": 22,
          "text": "Then said they unto him, Who art thou? that we may give an answer to them that sent us. What sayest thou of thyself?"
        },
        {
          "verse": 23,
          "text": "He said, I am the voice of one crying in the wilderness, Make straight the way of the Lord, as said the prophet Esaias."
        },
        {
          "verse": 24,
          "text": "And they which were sent were of the Pharisees."
        },
        {
          "verse": 25,
          "text": "And they asked him, and said unto him, Why baptizest thou then, if thou be not that Christ, nor Elias, neither that prophet?"
        },
        {
          "verse": 26,
          "text": "John answered them, saying, I baptize with water: but there standeth one among you, whom ye know not;"
        },
        {
          "verse": 27,
          "text": "He it is, who coming after me is preferred before me, whose shoe’s latchet I am not worthy to unloose."
        },
        {
          "verse": 28,
          "text": "These things were done in Bethabara beyond Jordan, where John was baptizing."
        },
        {
          "verse": 29,
          "text": "The next day John seeth Jesus coming unto him, and saith, Behold the Lamb of God, which taketh away the sin of the world."
        },
        {
          "verse": 30,
          "text": "This is he of whom I said, After me cometh a man which is preferred before me: for he was before me."
        },
        {
          "verse": 31,
          "text": "And I knew him not: but that he should be made manifest to Israel, therefore am I come baptizing with water."
        },
        {
          "verse": 32,
          "text": "And John bare record, saying, I saw the Spirit descending from heaven like a dove, and it abode upon him."
        },
        {
          "verse": 33,
          "text": "And I knew him not: but he that sent me to baptize with water, the same said unto me, Upon whom thou shalt see the Spirit descending, and remaining on him, the same is he which baptizeth with the Holy Ghost."
        },
        {
          "verse": 34,
          "text": "And I saw, and bare record that this is the Son of God."
        },
        {
          "verse": 35,
          "text": "Again the next day after John stood, and two of his disciples;"
        },
        {
          "verse": 36,
          "text": "And looking upon Jesus as he walked, he saith, Behold the Lamb of God!"
        },
        {
          "verse": 37,
          "text": "And the two disciples heard him speak, and they followed Jesus."
        },
        {
          "verse": 38,
          "text": "Then Jesus turned, and saw them following, and saith unto them, What seek ye? They said unto him, Rabbi, (which is to say, being interpreted, Master,) where dwellest thou?"
        },
        {
          "verse": 39,
          "text": "He saith unto them, Come and see. They came and saw where he dwelt, and abode with him that day: for it was about the tenth hour."
        },
        {
          "verse": 40,
          "text": "One of the two which heard John speak, and followed him, was Andrew, Simon Peter’s brother."
        },
        {
          "verse": 41,
          "text": "He first findeth his own brother Simon, and saith unto him, We have found the Messias, which is, being interpreted, the Christ."
        },
        {
          "verse": 42,
          "text": "And he brought him to Jesus. And when Jesus beheld him, he said, Thou art Simon the son of Jona: thou shalt be called Cephas, which is by interpretation, A stone."
        },
        {
          "verse": 43,
          "text": "The day following Jesus would go forth into Galilee, and findeth Philip, and saith unto him, Follow me."
        },
        {
          "verse": 44,
          "text": "Now Philip was of Bethsaida, the city of Andrew and Peter."
        },
        {
          "verse": 45,
          "text": "Philip findeth Nathanael, and saith unto him, We have found him, of whom Moses in the law, and the prophets, did write, Jesus of Nazareth, the son of Joseph."
        },
        {
          "verse": 46,
          "text": "And Nathanael said unto him, Can there any good thing come out of Nazareth? Philip saith unto him, Come and see."
        },
        {
          "verse": 47,
          "text": "Jesus saw Nathanael coming to him, and saith of him, Behold an Israelite indeed, in whom is no guile!"
        },
        {
          "verse": 48,
          "text": "Nathanael saith unto him, Whence knowest thou me? Jesus answered and said unto him, Before that Philip called thee, when thou wast under the fig tree, I saw thee."
        },
        {
          "verse": 49,
          "text": "Nathanael answered and saith unto him, Rabbi, thou art the Son of God; thou art the King of Israel."
        },
        {
          "verse": 50,
          "text": "Jesus answered and said unto him, Because I said unto thee, I saw thee under the fig tree, believest thou? thou shalt see greater things than these."
        },
        {
          "verse": 51,
          "text": "And he saith unto him, Verily, verily, I say unto you, Hereafter ye shall see heaven open, and the angels of God ascending and descending upon the Son of man."
        }
      ],
      "web": [
        {
          "verse": 1,
          "text": "In the beginning was the Word, and the Word was with God, and the Word was God."
        },
        {
          "verse": 2,
          "text": "The same was in the beginning with God."
        },
        {
          "verse": 3,
          "text": "All things were made through him. Without him was not anything made that has been made."
        },
        {
          "verse": 4,
          "text": "In him was life, and the life was the light of men."
        },
        {
          "verse": 5,
          "text": "The light shines in the darkness, and the darkness hasn’t overcome  it."
        },
        {
          "verse": 6,
          "text": "There came a man, sent from God, whose name was John."
        },
        {
          "verse": 7,
          "text": "The same came as a witness, that he might testify about the light, that all might believe through him."
        },
        {
          "verse": 8,
          "text": "He was not the light, but was sent that he might testify about the light."
        },
        {
          "verse": 9,
          "text": "The true light that enlightens everyone was coming into the world."
        },
        {
          "verse": 10,
          "text": "He was in the world, and the world was made through him, and the world didn’t recognize him."
        },
        {
          "verse": 11,
          "text": "He came to his own, and those who were his own didn’t receive him."
        },
        {
          "verse": 12,
          "text": "But as many as received him, to them he gave the right to become God’s children, to those who believe in his name:"
        },
        {
          "verse": 13,
          "text": "who were born not of blood, nor of the will of the flesh, nor of the will of man, but of God."
        },
        {
          "verse": 14,
          "text": "The Word became flesh, and lived among us. We saw his glory, such glory as of the one and only Son of the Father, full of grace and truth."
        },
        {
          "verse": 15,
          "text": "John testified about him. He cried out, saying, “This was he of whom I said, ‘He who comes after me has surpassed me, for he was before me.’”"
        },
        {
          "verse": 16,
          "text": "From his fullness we all received grace upon grace."
        },
        {
          "verse": 17,
          "text": "For the law was given through Moses. Grace and truth were realized through Jesus Christ."
        },
        {
          "verse": 18,
          "text": "No one has seen God at any time. The one and only Son, who is in the bosom of the Father, he has declared him."
        },
        {
          "verse": 19,
          "text": "This is John’s testimony, when the Jews sent priests and Levites from Jerusalem to ask him, “Who are you?”"
        },
        {
          "verse": 20,
          "text": "He declared, and didn’t deny, but he declared, “I am not the Christ.”"
        },
        {
          "verse": 21,
          "text": "They asked him, “What then? Are you Elijah?” He said, “I am not.” “Are you the prophet?” He answered, “No.”"
        },
        {
          "verse": 22,
          "text": "They said therefore to him, “Who are you? Give us an answer to take back to those who sent us. What do you say about yourself?”"
        },
        {
          "verse": 23,
          "text": "He said, “I am the voice of one crying in the wilderness, ‘Make straight the way of the Lord,’ as Isaiah the prophet said.”"
        },
        {
          "verse": 24,
          "text": "The ones who had been sent were from the Pharisees."
        },
        {
          "verse": 25,
          "text": "They asked him, “Why then do you baptize, if you are not the Christ, nor Elijah, nor the prophet?”"
        },
        {
          "verse": 26,
          "text": "John answered them, “I baptize in water, but among you stands one whom you don’t know."
        },
        {
          "verse": 27,
          "text": "He is the one who comes after me, who is preferred before me, whose sandal strap I’m not worthy to loosen.”"
        },
        {
          "verse": 28,
          "text": "These things were done in Bethany beyond the Jordan, where John was baptizing."
        },
        {
          "verse": 29,
          "text": "The next day, he saw Jesus coming to him, and said, “Behold, the Lamb of God, who takes away the sin of the world!"
        },
        {
          "verse": 30,
          "text": "This is he of whom I said, ‘After me comes a man who is preferred before me, for he was before me.’"
        },
        {
          "verse": 31,
          "text": "I didn’t know him, but for this reason I came baptizing in water: that he would be revealed to Israel.”"
        },
        {
          "verse": 32,
          "text": "John testified, saying, “I have seen the Spirit descending like a dove out of heaven, and it remained on him."
        },
        {
          "verse": 33,
          "text": "I didn’t recognize him, but he who sent me to baptize in water, he said to me, ‘On whomever you will see the Spirit descending, and remaining on him, the same is he who baptizes in the Holy Spirit.’"
        },
        {
          "verse": 34,
          "text": "I have seen, and have testified that this is the Son of God.”"
        },
        {
          "verse": 35,
          "text": "Again, the next day, John was standing with two of his disciples,"
        },
        {
          "verse": 36,
          "text": "and he looked at Jesus as he walked, and said, “Behold, the Lamb of God!”"
        },
        {
          "verse": 37,
          "text": "The two disciples heard him speak, and they followed Jesus."
        },
        {
          "verse": 38,
          "text": "Jesus turned, and saw them following, and said to them, “What are you looking for?” They said to him, “Rabbi” (which is to say, being interpreted, Teacher), “where are you staying?”"
        },
        {
          "verse": 39,
          "text": "He said to them, “Come, and see.” They came and saw where he was staying, and they stayed with him that day. It was about the tenth hour."
        },
        {
          "verse": 40,
          "text": "One of the two who heard John, and followed him, was Andrew, Simon Peter’s brother."
        },
        {
          "verse": 41,
          "text": "He first found his own brother, Simon, and said to him, “We have found the Messiah!” (which is, being interpreted, Christ)."
        },
        {
          "verse": 42,
          "text": "He brought him to Jesus. Jesus looked at him, and said, “You are Simon the son of Jonah. You shall be called Cephas” (which is by interpretation, Peter)."
        },
        {
          "verse": 43,
          "text": "On the next day, he was determined to go out into Galilee, and he found Philip. Jesus said to him, “Follow me.”"
        },
        {
          "verse": 44,
          "text": "Now Philip was from Bethsaida, of the city of Andrew and Peter."
        },
        {
          "verse": 45,
          "text": "Philip found Nathanael, and said to him, “We have found him, of whom Moses in the law, and the prophets, wrote: Jesus of Nazareth, the son of Joseph.”"
        },
        {
          "verse": 46,
          "text": "Nathanael said to him, “Can any good thing come out of Nazareth?” Philip said to him, “Come and see.”"
        },
        {
          "verse": 47,
          "text": "Jesus saw Nathanael coming to him, and said about him, “Behold, an Israelite indeed, in whom is no deceit!”"
        },
        {
          "verse": 48,
          "text": "Nathanael said to him, “How do you know me?” Jesus answered him, “Before Philip called you, when you were under the fig tree, I saw you.”"
        },
        {
          "verse": 49,
          "text": "Nathanael answered him, “Rabbi, you are the Son of God! You are King of Israel!”"
        },
        {
          "verse": 50,
          "text": "Jesus answered him, “Because I told you, ‘I saw you underneath the fig tree,’ do you believe? You will see greater things than these!”"
        },
        {
          "verse": 51,
          "text": "He said to him, “Most certainly, I tell you all, hereafter you will see heaven opened, and the angels of God ascending and descending on the Son of Man.”"
        }
      ]
    }
  },
  "Romans": {
    "8": {
      "kjv": [
        {
          "verse": 1,
          "text": "There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit."
        },
        {
          "verse": 2,
          "text": "For the law of the Spirit of life in Christ Jesus hath made me free from the law of sin and death."
        },
        {
          "verse": 3,
          "text": "For what the law could not do, in that it was weak through the flesh, God sending his own Son in the likeness of sinful flesh, and for sin, condemned sin in the flesh:"
        },
        {
          "verse": 4,
          "text": "That the righteousness of the law might be fulfilled in us, who walk not after the flesh, but after the Spirit."
        },
        {
          "verse": 5,
          "text": "For they that are after the flesh do mind the things of the flesh; but they that are after the Spirit the things of the Spirit."
        },
        {
          "verse": 6,
          "text": "For to be carnally minded is death; but to be spiritually minded is life and peace."
        },
        {
          "verse": 7,
          "text": "Because the carnal mind is enmity against God: for it is not subject to the law of God, neither indeed can be."
        },
        {
          "verse": 8,
          "text": "So then they that are in the flesh cannot please God."
        },
        {
          "verse": 9,
          "text": "But ye are not in the flesh, but in the Spirit, if so be that the Spirit of God dwell in you. Now if any man have not the Spirit of Christ, he is none of his."
        },
        {
          "verse": 10,
          "text": "And if Christ be in you, the body is dead because of sin; but the Spirit is life because of righteousness."
        },
        {
          "verse": 11,
          "text": "But if the Spirit of him that raised up Jesus from the dead dwell in you, he that raised up Christ from the dead shall also quicken your mortal bodies by his Spirit that dwelleth in you."
        },
        {
          "verse": 12,
          "text": "Therefore, brethren, we are debtors, not to the flesh, to live after the flesh."
        },
        {
          "verse": 13,
          "text": "For if ye live after the flesh, ye shall die: but if ye through the Spirit do mortify the deeds of the body, ye shall live."
        },
        {
          "verse": 14,
          "text": "For as many as are led by the Spirit of God, they are the sons of God."
        },
        {
          "verse": 15,
          "text": "For ye have not received the spirit of bondage again to fear; but ye have received the Spirit of adoption, whereby we cry, Abba, Father."
        },
        {
          "verse": 16,
          "text": "The Spirit itself beareth witness with our spirit, that we are the children of God:"
        },
        {
          "verse": 17,
          "text": "And if children, then heirs; heirs of God, and joint-heirs with Christ; if so be that we suffer with him, that we may be also glorified together."
        },
        {
          "verse": 18,
          "text": "For I reckon that the sufferings of this present time are  not worthy to be compared with the glory which shall be revealed in us."
        },
        {
          "verse": 19,
          "text": "For the earnest expectation of the creature waiteth for the manifestation of the sons of God."
        },
        {
          "verse": 20,
          "text": "For the creature was made subject to vanity, not willingly, but by reason of him who hath subjected the same in hope,"
        },
        {
          "verse": 21,
          "text": "Because the creature itself also shall be delivered from the bondage of corruption into the glorious liberty of the children of God."
        },
        {
          "verse": 22,
          "text": "For we know that the whole creation groaneth and travaileth in pain together until now."
        },
        {
          "verse": 23,
          "text": "And not only they, but ourselves also, which have the firstfruits of the Spirit, even we ourselves groan within ourselves, waiting for the adoption, to wit, the redemption of our body."
        },
        {
          "verse": 24,
          "text": "For we are saved by hope: but hope that is seen is not hope: for what a man seeth, why doth he yet hope for?"
        },
        {
          "verse": 25,
          "text": "But if we hope for that we see not, then do we with patience wait for it."
        },
        {
          "verse": 26,
          "text": "Likewise the Spirit also helpeth our infirmities: for we know not what we should pray for as we ought: but the Spirit itself maketh intercession for us with groanings which cannot be uttered."
        },
        {
          "verse": 27,
          "text": "And he that searcheth the hearts knoweth what is the mind of the Spirit, because he maketh intercession for the saints according to the will of God."
        },
        {
          "verse": 28,
          "text": "And we know that all things work together for good to them that love God, to them who are the called according to his purpose."
        },
        {
          "verse": 29,
          "text": "For whom he did foreknow, he also did predestinate to be  conformed to the image of his Son, that he might be the firstborn among many brethren."
        },
        {
          "verse": 30,
          "text": "Moreover whom he did predestinate, them he also called: and whom he called, them he also justified: and whom he justified, them he also glorified."
        },
        {
          "verse": 31,
          "text": "What shall we then say to these things? If God be for us, who can be against us?"
        },
        {
          "verse": 32,
          "text": "He that spared not his own Son, but delivered him up for us all, how shall he not with him also freely give us all things?"
        },
        {
          "verse": 33,
          "text": "Who shall lay any thing to the charge of God’s elect? It is  God that justifieth."
        },
        {
          "verse": 34,
          "text": "Who is he that condemneth? It is Christ that died, yea rather, that is risen again, who is even at the right hand of God, who also maketh intercession for us."
        },
        {
          "verse": 35,
          "text": "Who shall separate us from the love of Christ? shall tribulation, or distress, or persecution, or famine, or nakedness, or peril, or sword?"
        },
        {
          "verse": 36,
          "text": "As it is written, For thy sake we are killed all the day long; we are accounted as sheep for the slaughter."
        },
        {
          "verse": 37,
          "text": "Nay, in all these things we are more than conquerors through him that loved us."
        },
        {
          "verse": 38,
          "text": "For I am persuaded, that neither death, nor life, nor angels, nor principalities, nor powers, nor things present, nor things to come,"
        },
        {
          "verse": 39,
          "text": "Nor height, nor depth, nor any other creature, shall be able to separate us from the love of God, which is in Christ Jesus our Lord."
        }
      ],
      "web": [
        {
          "verse": 1,
          "text": "There is therefore now no condemnation to those who are in Christ Jesus, who don’t walk according to the flesh, but according to the Spirit."
        },
        {
          "verse": 2,
          "text": "For the law of the Spirit of life in Christ Jesus made me free from the law of sin and of death."
        },
        {
          "verse": 3,
          "text": "For what the law couldn’t do, in that it was weak through the flesh, God did, sending his own Son in the likeness of sinful flesh and for sin, he condemned sin in the flesh;"
        },
        {
          "verse": 4,
          "text": "that the ordinance of the law might be fulfilled in us, who walk not after the flesh, but after the Spirit."
        },
        {
          "verse": 5,
          "text": "For those who live according to the flesh set their minds on the things of the flesh, but those who live according to the Spirit, the things of the Spirit."
        },
        {
          "verse": 6,
          "text": "For the mind of the flesh is death, but the mind of the Spirit is life and peace;"
        },
        {
          "verse": 7,
          "text": "because the mind of the flesh is hostile towards God; for it is not subject to God’s law, neither indeed can it be."
        },
        {
          "verse": 8,
          "text": "Those who are in the flesh can’t please God."
        },
        {
          "verse": 9,
          "text": "But you are not in the flesh but in the Spirit, if it is so that the Spirit of God dwells in you. But if any man doesn’t have the Spirit of Christ, he is not his."
        },
        {
          "verse": 10,
          "text": "If Christ is in you, the body is dead because of sin, but the spirit is alive because of righteousness."
        },
        {
          "verse": 11,
          "text": "But if the Spirit of him who raised up Jesus from the dead dwells in you, he who raised up Christ Jesus from the dead will also give life to your mortal bodies through his Spirit who dwells in you."
        },
        {
          "verse": 12,
          "text": "So then, brothers, we are debtors, not to the flesh, to live after the flesh."
        },
        {
          "verse": 13,
          "text": "For if you live after the flesh, you must die; but if by the Spirit you put to death the deeds of the body, you will live."
        },
        {
          "verse": 14,
          "text": "For as many as are led by the Spirit of God, these are children of God."
        },
        {
          "verse": 15,
          "text": "For you didn’t receive the spirit of bondage again to fear, but you received the Spirit of adoption, by whom we cry, “Abba! Father!”"
        },
        {
          "verse": 16,
          "text": "The Spirit himself testifies with our spirit that we are children of God;"
        },
        {
          "verse": 17,
          "text": "and if children, then heirs; heirs of God, and joint heirs with Christ; if indeed we suffer with him, that we may also be glorified with him."
        },
        {
          "verse": 18,
          "text": "For I consider that the sufferings of this present time are not worthy to be compared with the glory which will be revealed toward us."
        },
        {
          "verse": 19,
          "text": "For the creation waits with eager expectation for the children of God to be revealed."
        },
        {
          "verse": 20,
          "text": "For the creation was subjected to vanity, not of its own will, but because of him who subjected it, in hope"
        },
        {
          "verse": 21,
          "text": "that the creation itself also will be delivered from the bondage of decay into the liberty of the glory of the children of God."
        },
        {
          "verse": 22,
          "text": "For we know that the whole creation groans and travails in pain together until now."
        },
        {
          "verse": 23,
          "text": "Not only so, but ourselves also, who have the first fruits of the Spirit, even we ourselves groan within ourselves, waiting for adoption, the redemption of our body."
        },
        {
          "verse": 24,
          "text": "For we were saved in hope, but hope that is seen is not hope. For who hopes for that which he sees?"
        },
        {
          "verse": 25,
          "text": "But if we hope for that which we don’t see, we wait for it with patience."
        },
        {
          "verse": 26,
          "text": "In the same way, the Spirit also helps our weaknesses, for we don’t know how to pray as we ought. But the Spirit himself makes intercession for us with groanings which can’t be uttered."
        },
        {
          "verse": 27,
          "text": "He who searches the hearts knows what is on the Spirit’s mind, because he makes intercession for the saints according to God."
        },
        {
          "verse": 28,
          "text": "We know that all things work together for good for those who love God, to those who are called according to his purpose."
        },
        {
          "verse": 29,
          "text": "For whom he foreknew, he also predestined to be conformed to the image of his Son, that he might be the firstborn among many brothers."
        },
        {
          "verse": 30,
          "text": "Whom he predestined, those he also called. Whom he called, those he also justified. Whom he justified, those he also glorified."
        },
        {
          "verse": 31,
          "text": "What then shall we say about these things? If God is for us, who can be against us?"
        },
        {
          "verse": 32,
          "text": "He who didn’t spare his own Son, but delivered him up for us all, how would he not also with him freely give us all things?"
        },
        {
          "verse": 33,
          "text": "Who could bring a charge against God’s chosen ones? It is God who justifies."
        },
        {
          "verse": 34,
          "text": "Who is he who condemns? It is Christ who died, yes rather, who was raised from the dead, who is at the right hand of God, who also makes intercession for us."
        },
        {
          "verse": 35,
          "text": "Who shall separate us from the love of Christ? Could oppression, or anguish, or persecution, or famine, or nakedness, or peril, or sword?"
        },
        {
          "verse": 36,
          "text": "Even as it is written, “For your sake we are killed all day long. We were accounted as sheep for the slaughter.”"
        },
        {
          "verse": 37,
          "text": "No, in all these things, we are more than conquerors through him who loved us."
        },
        {
          "verse": 38,
          "text": "For I am persuaded that neither death, nor life, nor angels, nor principalities, nor things present, nor things to come, nor powers,"
        },
        {
          "verse": 39,
          "text": "nor height, nor depth, nor any other created thing, will be able to separate us from God’s love, which is in Christ Jesus our Lord."
        }
      ]
    }
  },
  "Revelation": {
    "21": {
      "kjv": [
        {
          "verse": 1,
          "text": "And I saw a new heaven and a new earth: for the first heaven and the first earth were passed away; and there was no more sea."
        },
        {
          "verse": 2,
          "text": "And I John saw the holy city, new Jerusalem, coming down from God out of heaven, prepared as a bride adorned for her husband."
        },
        {
          "verse": 3,
          "text": "And I heard a great voice out of heaven saying, Behold, the tabernacle of God is with men, and he will dwell with them, and they shall be his people, and God himself shall be with them, and be their God."
        },
        {
          "verse": 4,
          "text": "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away."
        },
        {
          "verse": 5,
          "text": "And he that sat upon the throne said, Behold, I make all things new. And he said unto me, Write: for these words are true and faithful."
        },
        {
          "verse": 6,
          "text": "And he said unto me, It is done. I am Alpha and Omega, the beginning and the end. I will give unto him that is athirst of the fountain of the water of life freely."
        },
        {
          "verse": 7,
          "text": "He that overcometh shall inherit all things; and I will be his God, and he shall be my son."
        },
        {
          "verse": 8,
          "text": "But the fearful, and unbelieving, and the abominable, and murderers, and whoremongers, and sorcerers, and idolaters, and all liars, shall have their part in the lake which burneth with fire and brimstone: which is the second death."
        },
        {
          "verse": 9,
          "text": "And there came unto me one of the seven angels which had the seven vials full of the seven last plagues, and talked with me, saying, Come hither, I will shew thee the bride, the Lamb’s wife."
        },
        {
          "verse": 10,
          "text": "And he carried me away in the spirit to a great and high mountain, and shewed me that great city, the holy Jerusalem, descending out of heaven from God,"
        },
        {
          "verse": 11,
          "text": "Having the glory of God: and her light was like unto a stone most precious, even like a jasper stone, clear as crystal;"
        },
        {
          "verse": 12,
          "text": "And had a wall great and high, and had twelve gates, and at the gates twelve angels, and names written thereon, which are the names  of the twelve tribes of the children of Israel:"
        },
        {
          "verse": 13,
          "text": "On the east three gates; on the north three gates; on the south three gates; and on the west three gates."
        },
        {
          "verse": 14,
          "text": "And the wall of the city had twelve foundations, and in them the names of the twelve apostles of the Lamb."
        },
        {
          "verse": 15,
          "text": "And he that talked with me had a golden reed to measure the city, and the gates thereof, and the wall thereof."
        },
        {
          "verse": 16,
          "text": "And the city lieth foursquare, and the length is as large as the breadth: and he measured the city with the reed, twelve thousand furlongs. The length and the breadth and the height of it are equal."
        },
        {
          "verse": 17,
          "text": "And he measured the wall thereof, an hundred and forty and four cubits, according to the measure of a man, that is, of the angel."
        },
        {
          "verse": 18,
          "text": "And the building of the wall of it was of jasper: and the city was pure gold, like unto clear glass."
        },
        {
          "verse": 19,
          "text": "And the foundations of the wall of the city were garnished with all manner of precious stones. The first foundation was jasper; the second, sapphire; the third, a chalcedony; the fourth, an emerald;"
        },
        {
          "verse": 20,
          "text": "The fifth, sardonyx; the sixth, sardius; the seventh, chrysolite; the eighth, beryl; the ninth, a topaz; the tenth, a chrysoprasus; the eleventh, a jacinth; the twelfth, an amethyst."
        },
        {
          "verse": 21,
          "text": "And the twelve gates were twelve pearls; every several gate was of one pearl: and the street of the city was pure gold, as it were transparent glass."
        },
        {
          "verse": 22,
          "text": "And I saw no temple therein: for the Lord God Almighty and the Lamb are the temple of it."
        },
        {
          "verse": 23,
          "text": "And the city had no need of the sun, neither of the moon, to shine in it: for the glory of God did lighten it, and the Lamb is the light thereof."
        },
        {
          "verse": 24,
          "text": "And the nations of them which are saved shall walk in the light of it: and the kings of the earth do bring their glory and honour into it."
        },
        {
          "verse": 25,
          "text": "And the gates of it shall not be shut at all by day: for there shall be no night there."
        },
        {
          "verse": 26,
          "text": "And they shall bring the glory and honour of the nations into it."
        },
        {
          "verse": 27,
          "text": "And there shall in no wise enter into it any thing that defileth, neither whatsoever worketh abomination, or maketh a lie: but they which are written in the Lamb’s book of life."
        }
      ],
      "web": [
        {
          "verse": 1,
          "text": "I saw a new heaven and a new earth: for the first heaven and the first earth have passed away, and the sea is no more."
        },
        {
          "verse": 2,
          "text": "I saw the holy city, New Jerusalem, coming down out of heaven from God, prepared like a bride adorned for her husband."
        },
        {
          "verse": 3,
          "text": "I heard a loud voice out of heaven saying, “Behold, God’s dwelling is with people, and he will dwell with them, and they will be his people, and God himself will be with them as their God."
        },
        {
          "verse": 4,
          "text": "He will wipe away every tear from their eyes. Death will be no more; neither will there be mourning, nor crying, nor pain, any more. The first things have passed away.”"
        },
        {
          "verse": 5,
          "text": "He who sits on the throne said, “Behold, I am making all things new.” He said, “Write, for these words of God are faithful and true.”"
        },
        {
          "verse": 6,
          "text": "He said to me, “I have become the Alpha and the Omega, the Beginning and the End. I will give freely to him who is thirsty from the spring of the water of life."
        },
        {
          "verse": 7,
          "text": "He who overcomes, I will give him these things. I will be his God, and he will be my son."
        },
        {
          "verse": 8,
          "text": "But for the cowardly, unbelieving, sinners, abominable, murderers, sexually immoral, sorcerers, idolaters, and all liars, their part is in the lake that burns with fire and sulfur, which is the second death.”"
        },
        {
          "verse": 9,
          "text": "One of the seven angels who had the seven bowls, who were loaded with the seven last plagues came, and he spoke with me, saying, “Come here. I will show you the wife, the Lamb’s bride.”"
        },
        {
          "verse": 10,
          "text": "He carried me away in the Spirit to a great and high mountain, and showed me the holy city, Jerusalem, coming down out of heaven from God,"
        },
        {
          "verse": 11,
          "text": "having the glory of God. Her light was like a most precious stone, as if it were a jasper stone, clear as crystal;"
        },
        {
          "verse": 12,
          "text": "having a great and high wall; having twelve gates, and at the gates twelve angels; and names written on them, which are the names of the twelve tribes of the children of Israel."
        },
        {
          "verse": 13,
          "text": "On the east were three gates; and on the north three gates; and on the south three gates; and on the west three gates."
        },
        {
          "verse": 14,
          "text": "The wall of the city had twelve foundations, and on them twelve names of the twelve Apostles of the Lamb."
        },
        {
          "verse": 15,
          "text": "He who spoke with me had for a measure a golden reed to measure the city, its gates, and its walls."
        },
        {
          "verse": 16,
          "text": "The city is square, and its length is as great as its width. He measured the city with the reed, twelve thousand twelve stadia. Its length, width, and height are equal."
        },
        {
          "verse": 17,
          "text": "Its wall is one hundred forty-four cubits, by the measure of a man, that is, of an angel."
        },
        {
          "verse": 18,
          "text": "The construction of its wall was jasper. The city was pure gold, like pure glass."
        },
        {
          "verse": 19,
          "text": "The foundations of the city’s wall were adorned with all kinds of precious stones. The first foundation was jasper; the second, sapphire; the third, chalcedony; the fourth, emerald;"
        },
        {
          "verse": 20,
          "text": "the fifth, sardonyx; the sixth, sardius; the seventh, chrysolite; the eighth, beryl; the ninth, topaz; the tenth, chrysoprasus; the eleventh, jacinth; and the twelfth, amethyst."
        },
        {
          "verse": 21,
          "text": "The twelve gates were twelve pearls. Each one of the gates was made of one pearl. The street of the city was pure gold, like transparent glass."
        },
        {
          "verse": 22,
          "text": "I saw no temple in it, for the Lord God, the Almighty, and the Lamb, are its temple."
        },
        {
          "verse": 23,
          "text": "The city has no need for the sun, neither of the moon, to shine, for the very glory of God illuminated it, and its lamp is the Lamb."
        },
        {
          "verse": 24,
          "text": "The nations will walk in its light. The kings of the earth bring the glory and honor of the nations into it."
        },
        {
          "verse": 25,
          "text": "Its gates will in no way be shut by day (for there will be no night there),"
        },
        {
          "verse": 26,
          "text": "and they shall bring the glory and the honor of the nations into it so that they may enter."
        },
        {
          "verse": 27,
          "text": "There will in no way enter into it anything profane, or one who causes an abomination or a lie, but only those who are written in the Lamb’s book of life."
        }
      ]
    }
  }
};

export const bibleLibrary = {};
for (const b of BIBLE_BOOKS) {
  bibleLibrary[b.name] = { chapters: {} };
}
for (const [bookName, chMap] of Object.entries(bundledLibrary)) {
  if (bibleLibrary[bookName]) {
    for (const [chNum, transMap] of Object.entries(chMap)) {
      const kjvVerses = transMap.kjv || [];
      const webVerses = transMap.web || [];
      bibleLibrary[bookName].chapters[chNum] = kjvVerses.map(kv => {
        const wv = webVerses.find(w => w.verse === kv.verse);
        const text = { kjv: kv.text };
        if (wv) text.web = wv.text;
        return {
          verse: kv.verse,
          text
        };
      });
    }
  }
}

export const defaultPrayerFocuses = [
  { title: 'Spirit-filled prayer', text: 'Come, Holy Spirit. Fill my heart with peace, wisdom, and courage for this day.' },
  { title: 'Worship and praise', text: 'Lord, I lift my voice in gratitude and worship. Let my heart sing Your praises.' },
  { title: 'Healing and breakthrough', text: 'Jesus, bring healing, strength, and fresh hope into every place of weakness.' },
  { title: 'Discernment and wisdom', text: 'Father, open my eyes to Your truth and guide every decision with wisdom.' }
];

export function getBookInfo(bookName) {
  if (!bookName) return BIBLE_BOOKS[0];
  const lower = bookName.trim().toLowerCase();
  return (
    BIBLE_BOOKS.find(b => b.name.toLowerCase() === lower || b.apiName.toLowerCase() === lower) ||
    BIBLE_BOOKS[0]
  );
}

export function getBookChapterCount(bookName) {
  const info = getBookInfo(bookName);
  return info ? info.chapters : 1;
}

export function getChapterVerseList(bookName, chapterNumber, translation = 'kjv') {
  const book = bibleLibrary[bookName];
  if (!book || !book.chapters[chapterNumber]) return [];
  return book.chapters[chapterNumber];
}

const memCache = new Map();

/**
 * Loads all verses for a given book, chapter, and translation.
 * Order of resolution:
 * 1. In-memory session cache
 * 2. Persistent localStorage cache (offline)
 * 3. Pre-bundled offline library (offline)
 * 4. bible-api.com network fetch (cached to localStorage for future offline use)
 */
export async function loadChapterVerses(bookName, chapterNumber, translation = 'kjv') {
  const bookInfo = getBookInfo(bookName);
  const chapter = Number(chapterNumber) || 1;
  const trans = (translation || 'kjv').toLowerCase();
  const cacheKey = `bible_verse_cache_v2_${bookInfo.name}_${chapter}_${trans}`;

  if (memCache.has(cacheKey)) {
    return { verses: memCache.get(cacheKey), source: 'cache', bookInfo };
  }

  try {
    const raw = localStorage.getItem(cacheKey);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        memCache.set(cacheKey, parsed);
        return { verses: parsed, source: 'offline-cache', bookInfo };
      }
    }
  } catch (err) {
    // ignore storage errors
  }

  const bundledBook = bundledLibrary[bookInfo.name];
  if (bundledBook && bundledBook[chapter]) {
    const targetList = bundledBook[chapter][trans] || [];
    if (targetList.length > 0) {
      memCache.set(cacheKey, targetList);
      return { verses: targetList, source: 'bundled', bookInfo };
    }
  }

  const query = `${encodeURIComponent(bookInfo.apiName)} ${chapter}`;
  const url = `https://bible-api.com/${query}?translation=${encodeURIComponent(trans)}`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`${trans.toUpperCase()} passage unavailable (status ${res.status}). No other translation was substituted.`);
    }

    const data = await res.json();
    if (data.translation_id && data.translation_id.toLowerCase() !== trans) {
      throw new Error(`Requested ${trans.toUpperCase()}, but the source returned ${data.translation_id.toUpperCase()}.`);
    }
    const rawVerses = data.verses || [];
    if (!rawVerses.length) {
      throw new Error('No verses returned for this chapter.');
    }

    const verses = rawVerses.map(v => ({
      verse: Number(v.verse),
      text: (v.text || '').replace(/\r/g, '').replace(/\n+/g, ' ').trim()
    }));

    memCache.set(cacheKey, verses);
    try {
      localStorage.setItem(cacheKey, JSON.stringify(verses));
    } catch (e) {
      // ignore
    }

    return { verses, source: 'network', bookInfo };
  } catch (error) {
    throw error;
  }
}
