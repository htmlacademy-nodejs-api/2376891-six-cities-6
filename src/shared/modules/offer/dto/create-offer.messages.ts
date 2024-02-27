export const CreateOfferValidationMessage = {
  title: {
    minLength: 'Minimum title length must be 10.',
    maxLength: 'Maximum title length must be 100.',
  },
  description: {
    minLength: 'Minimum description length must be 20.',
    maxLength: 'Maximum description length must be 1024.',
  },
  date: {
    invalidFormat: 'postDate must be a valid ISO date.',
  },
  city: {
    invalid: 'city must be Paris, Cologne, Brussels, Amsterdam, Hamburg and Dusseldorf.',
  },
  previewImage: {
    invalid: 'Field previewImage must be an url.',
  },
  images: {
    invalidFormat: 'Field images must be an array.',
    invalidUrl: 'Image must be an url.',
    invalid: 'Images must be 6.'
  },
  isPremium: {
    invalidFormat: 'Field isPremium must be a boolean.',
  },
  rating: {
    invalidFormat: 'Field rating must be a number.',
  },
  offerType: {
    invalid: 'type must be Apartment, House, Room and Hotel.',
  },
  bedrooms: {
    invalidFormat: 'Field bedrooms must be a integer.',
  },
  maxAdults: {
    invalidFormat: 'Field maxAdults must be a integer.',
  },
  price: {
    invalidFormat: 'Price must be an integer.',
    minValue: 'Minimum price is 100.',
    maxValue: 'Maximum price is 100000.',
  },
  goods: {
    invalidFormat: 'Field goods must be an array.',
    invalid: 'good must be Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels and Fridge.',
  },
  userId: {
    invalidId: 'userId field must be a valid id.',
  },
  commentCount: {
    invalidFormat: 'Field commentCount must be a integer.',
  },
  location: {
    invalid: 'Field location must be an object of valid latitude and longitude.'
  },
} as const;
