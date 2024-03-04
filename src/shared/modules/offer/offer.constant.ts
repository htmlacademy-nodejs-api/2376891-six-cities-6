export const DEFAULT_OFFER_COUNT = 60;

export const DEFAULT_PREMIUM_OFFER_COUNT = 3;

export const OfferDtoConstraint = {
  Title: { MIN: 10, MAX: 100 },
  Description: { MIN: 20, MAX: 1024 },
  Bedrooms: { MIN: 1, MAX: 8 },
  Adults: { MIN: 1, MAX: 10 },
  Price: { MIN: 100, MAX: 100000 },
  Preview: { MAX: 256 },
  Images: 6,
  Rating: { MIN: 1, MAX: 5 },
} as const;

export const OfferDtoMessages = {
  Date: 'postDate must be a valid ISO date.',
  City: 'City must be Paris, Cologne, Brussels, Amsterdam, Hamburg and Dusseldorf.',
  Images: `Images must be ${OfferDtoConstraint.Images}.`,
  OfferType: 'Type must be Apartment, House, Room and Hotel.',
  Goods: 'Goods must be Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels and Fridge.',
  Location: 'Field location must be an object of valid latitude and longitude.',
} as const;

