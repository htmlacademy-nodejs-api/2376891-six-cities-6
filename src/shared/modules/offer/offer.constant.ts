export const DEFAULT_OFFER_COUNT = 60;

export const DEFAULT_PREMIUM_OFFER_COUNT = 3;

export const OFFER_DTO_CONSTRAINT = {
  TITLE: { MIN: 10, MAX: 100 },
  DESCRIPTION: { MIN: 20, MAX: 1024 },
  BEDROOMS: { MIN: 1, MAX: 8 },
  ADULTS: { MIN: 1, MAX: 10 },
  PRICE: { MIN: 100, MAX: 100000 },
  PREVIEW: { MAX: 256 },
  IMAGES: 6,
} as const;

export const OFFER_DTO_MESSAGES = {
  DATE: 'postDate must be a valid ISO date.',
  CITY: 'City must be Paris, Cologne, Brussels, Amsterdam, Hamburg and Dusseldorf.',
  IMAGES: `Images must be ${OFFER_DTO_CONSTRAINT.IMAGES}.`,
  OFFER_TYPE: 'Type must be Apartment, House, Room and Hotel.',
  GOODS: 'Goods must be Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels and Fridge.',
  LOCATION: 'Field location must be an object of valid latitude and longitude.',
} as const;

