// Traditional prayers in widely used public-domain English wording. Confirm the wording your parish prefers.
export const PRAYER_TEXTS = {
  signOfCross: 'In the name of the Father, and of the Son, and of the Holy Spirit. Amen.',
  creed: 'I believe in God, the Father almighty, Creator of heaven and earth; and in Jesus Christ, his only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; he descended into hell; on the third day he rose again from the dead; he ascended into heaven, and is seated at the right hand of God the Father almighty; from there he will come to judge the living and the dead. I believe in the Holy Spirit, the holy catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen.',
  ourFather: 'Our Father, who art in heaven, hallowed be thy name; thy kingdom come; thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen.',
  hailMary: 'Hail Mary, full of grace, the Lord is with thee; blessed art thou among women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.',
  gloryBe: 'Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen.',
  fatima: 'O my Jesus, forgive us our sins, save us from the fires of hell, lead all souls to heaven, especially those most in need of thy mercy.',
  hailHolyQueen: 'Hail, holy Queen, Mother of mercy, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve; to thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Pray for us, O holy Mother of God, that we may be made worthy of the promises of Christ. Amen.'
};

export const ROSARY_PRAYER_SETS = [
  ['signOfCross', 'creed'],
  ['ourFather', 'hailMary', 'gloryBe'],
  ['ourFather'],
  ['hailMary', 'gloryBe', 'fatima'],
  [],
  ['hailHolyQueen', 'signOfCross']
];

export const CHAPLET_PRAYER_SETS = [
  ['signOfCross', 'ourFather', 'hailMary', 'creed'],
  [],
  [],
  [],
  ['signOfCross']
];

export const PRAYER_LABELS = {
  signOfCross: 'Sign of the Cross',
  creed: 'Apostles’ Creed',
  ourFather: 'Our Father',
  hailMary: 'Hail Mary',
  gloryBe: 'Glory Be',
  fatima: 'Fatima Prayer (optional)',
  hailHolyQueen: 'Hail, Holy Queen'
};

export const ROSARY_MYSTERY_REFERENCES = {
  'Joyful Mysteries': ['Luke 1:26-38', 'Luke 1:39-56', 'Luke 2:1-20', 'Luke 2:22-38', 'Luke 2:41-52'],
  'Luminous Mysteries': ['Matthew 3:13-17', 'John 2:1-12', 'Mark 1:14-15', 'Matthew 17:1-8', 'Luke 22:14-20'],
  'Sorrowful Mysteries': ['Matthew 26:36-46', 'John 19:1-3', 'Matthew 27:27-31', 'John 19:17-22', 'Luke 23:33-46'],
  'Glorious Mysteries': ['Matthew 28:1-10', 'Acts 1:6-11', 'Acts 2:1-4', 'Revelation 12:1', 'Revelation 12:1']
};
