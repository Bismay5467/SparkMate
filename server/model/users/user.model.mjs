import mongoose from 'mongoose';
import validator from 'validator';

import {
  DIETARY_PREFERENCES,
  DRINKING_HABITS,
  EDUCATION,
  EMAIL_DOMAIN_REGEX,
  GENDER,
  LOOKING_FOR,
  LOVE_STYLES,
  MAX_CHARACTERS_FOR_BIO,
  MAX_NO_OF_PHOTOS,
  MAX_NO_OF_PREFERENCES,
  MIN_NO_OF_PHOTOS,
  PETS,
  RELIGIOUS_BELIEF,
  SMOKING_HABITS,
  WORKOUT,
  ZODIAC_SIGNS,
} from '../../common/constants.mjs';

export const userSchema = new mongoose.Schema(
  {
    bio: {
      required: [true, 'Bio is a required field.'],
      type: String,
      maxLength: [
        MAX_CHARACTERS_FOR_BIO,
        `Bio can be atmost of ${MAX_CHARACTERS_FOR_BIO} characters.`,
      ],
    },
    DOB: {
      required: [true, 'Date of Birth is a required field.'],
      type: Date,
      validate: {
        message: 'Invalid date format (MM/DD/YYYY).',
        validator(dateOfBirth) {
          return validator.isDate(dateOfBirth);
        },
      },
    },
    disliked: {
      type: [
        {
          ref: 'user',
          type: mongoose.Types.ObjectId,
        },
      ],
    },
    email: {
      required: [true, 'Email is a required field.'],
      type: String,
      validate: {
        message: 'Invalid email. Please enter a valid email ID',
        validator(email) {
          const domainRegex = EMAIL_DOMAIN_REGEX;
          return domainRegex.test(email);
        },
      },
    },
    gender: {
      enum: Object.values(GENDER),
      required: [true, 'Gender is a required field.'],
      type: String,
    },
    height: {
      type: Number,
    },
    homeTown: {
      type: String,
    },
    liked: {
      type: [
        {
          ref: 'user',
          type: mongoose.Types.ObjectId,
        },
      ],
    },
    location: {
      required: [true, 'Location is a required field.'],
      type: [Number],
      validate: {
        message: 'Invalid location. Please enter a valid location',
        validator(location) {
          // eslint-disable-next-line no-magic-numbers
          return location.length === 2;
        },
      },
    },
    matched: {
      type: [
        {
          ref: 'user',
          type: mongoose.Types.ObjectId,
        },
      ],
    },
    name: {
      required: [true, 'Name is a required field.'],
      type: String,
    },
    phoneNumber: {
      required: [true, 'Phone number is a required field.'],
      type: String,
      validate: {
        message: 'Invalid phone number.',
        validator(phoneNumber) {
          return validator.isMobilePhone(phoneNumber, 'any');
        },
      },
    },
    photos: {
      required: [true, 'Photos is a required field.'],
      type: [String],
      validate: {
        message: `You must upload atleast one of your best pictures. You can upload upto ${MAX_NO_OF_PHOTOS} of your best pictures.`,
        validator(photos) {
          return (
            photos.length >= MIN_NO_OF_PHOTOS &&
            photos.length <= MAX_NO_OF_PHOTOS
          );
        },
      },
    },
    religiousBelief: {
      enum: Object.values(RELIGIOUS_BELIEF),
      type: String,
    },
    workout: {
      type: String,
      enum: Object.values(WORKOUT),
    },
    drinkingHabits: {
      enum: Object.values(DRINKING_HABITS),
      type: String,
    },
    smokingHabits: {
      enum: Object.values(SMOKING_HABITS),
      type: String,
    },
    pets: {
      enum: Object.values(PETS),
      type: [String],
      validate: {
        message: `You can choose at most ${MAX_NO_OF_PREFERENCES} preferences.`,
        validator(pets) {
          return pets.length <= MAX_NO_OF_PREFERENCES;
        },
      },
    },
    dietaryPreferences: {
      enum: Object.values(DIETARY_PREFERENCES),
      type: [String],
      validate: {
        message: `You can choose at most ${MAX_NO_OF_PREFERENCES} preferences.`,
        validator(dietaryPreferences) {
          return dietaryPreferences.length <= MAX_NO_OF_PREFERENCES;
        },
      },
    },
    lookingFor: {
      enum: Object.values(LOOKING_FOR),
      type: String,
    },
    loveStyle: {
      enum: Object.values(LOVE_STYLES),
      type: [String],
      validate: {
        message: `You can choose at most ${MAX_NO_OF_PREFERENCES} preferences.`,
        validator(loveStyles) {
          return loveStyles.length <= MAX_NO_OF_PREFERENCES;
        },
      },
    },
    education: {
      enum: Object.values(EDUCATION),
      type: String,
    },
    spotify: {
      type: [String],
    },
  },
  { strict: true }
);

userSchema.virtual('age').get(() => {
  const currentDate = new Date();
  const birthDate = this.DOB;
  const age = currentDate.getFullYear() - birthDate.getFullYear();
  return age;
});

userSchema.virtual('zodiacSign').get(() => {
  const dob = this.DOB;

  const month = dob.getMonth() + 1;
  const day = dob.getDate();

  Object.keys(ZODIAC_SIGNS).find((sign) => {
    const { start, end } = ZODIAC_SIGNS[sign];

    const startMonth = start.getMonth() + 1;
    const startDate = start.getDate();

    const endMonth = end.getMonth() + 1;
    const endDate = end.getDate();

    if (
      (month === startMonth && day >= startDate) ||
      (month > startMonth && month < endMonth) ||
      (month === endMonth && day <= endDate)
    ) {
      return sign;
    }
    return undefined;
  });

  return 'UNKNOWN';
});

export const user = mongoose.model('user', userSchema);
