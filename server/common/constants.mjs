export const MESSAGE_STATUS = {
  FAILED: 'failed',
  SENT: 'sent',
};

export const GENDER = {
  'CIS MALE': 'cis male',
  'CIS FEMALE': 'cis female',
  'TRANS MALE': 'trans male',
  'TRANS FEMALE': 'trans fenale',
  'GENDER FLUID': 'gender fluid',
  'RAHUL MAITY': 'rahul maity',
};

export const RELIGIOUS_BELIEF = {
  AGNOSTIC: 'agnostic',
  ATHEIST: 'atheist',
  BUDDHIST: 'buddhism',
  CATHOLIC: 'catholic',
  CONFUCIANISM: 'confucianism',
  HINDUISM: 'hinduism',
  ISKCON: 'iskcon',
  MUSLIM: 'muslim',
  JAINISM: 'jainism',
  JEWISH: 'jewish',
  MORMON: 'mormon',
  'NEW AGE SPIRITUALITY': 'new age spirituality',
  'NOTHING IN PARTICULAR': 'nothing in particular',
  PROTESTANT: 'protestant',
  'RELAXED RELIGIOUS': 'relaxed religious',
  'SECULAR HUMANISM': 'secular humanism',
  SIKHISM: 'sikhism',
  'SPIRITUALLY AWAKE': 'spiritually awake',
  'SUNDAY STALWARTS': 'sunday stalwarts',
  ZOROASTRAIN: 'zoroastrian',
};

export const ZODIAC_SIGNS = {
  ARIES: { start: new Date('March 21'), end: new Date('April 19') },
  TAURUS: { start: new Date('April 20'), end: new Date('May 20') },
  GEMINI: { start: new Date('May 21'), end: new Date('June 20') },
  CANCER: { start: new Date('June 21'), end: new Date('July 22') },
  LEO: { start: new Date('July 23'), end: new Date('August 22') },
  VIRGO: { start: new Date('August 23'), end: new Date('September 22') },
  LIBRA: { start: new Date('September 23'), end: new Date('October 22') },
  SCORPIO: { start: new Date('October 23'), end: new Date('November 21') },
  SAGITTARIUS: { start: new Date('November 22'), end: new Date('December 21') },
  CAPRICORN: { start: new Date('December 22'), end: new Date('January 19') },
  AQUARIUS: { start: new Date('January 20'), end: new Date('February 18') },
  PISCES: { start: new Date('February 19'), end: new Date('March 20') },
};

export const WORKOUT = {
  SOMETIMES: 'sometimes',
  REGULAR: 'regular',
  NEVER: 'never',
};

export const DRINKING_HABITS = {
  FREQUENTLY: 'frequently',
  NEVER: 'never',
  RARELY: 'rarely',
  SOBER: 'sober',
  SOCIALLY: 'socially',
};

export const SMOKING_HABITS = {
  NEVER: 'never',
  'SMOKING WHEN DRINKING': 'smoking when drinking',
  SMOKER: 'smoker',
  'SOCIAL SMOKER': 'social smoker',
  'TRYING TO QUIT': 'trying to quit',
};

export const PETS = {
  DOG: 'dog',
  CAT: 'cat',
  BIRD: 'bird',
  FISH: 'fish',
  'DONT HAVE BUT LOVE': 'dont have but love',
  OTHER: 'other',
  TURTLE: 'turtle',
  HAMSTER: 'hamster',
  RABBIT: 'rabbit',
  'ALL THE PETS': 'all the pets',
  'WANT A PET': 'want a pet',
  'ALLERGIC TO PETS': 'allergic to pets',
};

export const DIETARY_PREFERENCES = {
  VEGAN: 'vegan',
  VEGETARIAN: 'vegetarian',
  EGGETARIAN: 'eggetarian',
  'GLUTTEN FREE': 'glutten free',
  KETO: 'keto diet',
  'LACTOSE SENSITIVITY': 'lactose sensitivity',
  KOSHER: 'kosher',
  HALAL: 'halal',
  'NON VEGETARIAN': 'non vegetarian',
  OTHER: 'other',
};

export const LOVE_STYLES = {
  'THOUGHTFUL GESTURES': 'thoughtful gestures',
  PRESENTS: 'presents',
  TOUCH: 'touch',
  COMPLIMENTS: 'compliments',
  'QUALITY TIME': 'quality time',
};

export const LOOKING_FOR = {
  'LONG TERM PARTNER': 'long-term partner',
  'LONG TERM, OPEN TO SHORT': 'long term, open to short',
  'SHORT TERM, OPEN TO LONG': 'short term, open to long',
  'SHORT TERM FUN': 'short-term fun',
  'NEW FRIENDS': 'new friends',
  'STILL FIGURUING IT OUT': 'still figuring it out',
};

export const EDUCATION = {
  UNDERGRAD: 'under graduate',
  POSTGRAD: 'post graduate',
  RESEARCHER: 'researcher',
  OTHER: 'other',
};

export const MIN_NO_OF_PHOTOS = 2;
export const MAX_NO_OF_PHOTOS = 5;

export const MAX_NO_OF_PREFERENCES = 3;

export const MAX_CHARACTERS_FOR_BIO = 200;
export const MAX_CHARACTERS_FOR_CHAT = 1000;

export const DEFAULT_DEV_PORT = 3000;

export const EXIT_FAILURE = 1;

export const EMAIL_DOMAIN_REGEX = /@nitk\.edu\.in$/;
