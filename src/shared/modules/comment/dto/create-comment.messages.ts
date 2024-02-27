export const CreateCommentMessages = {
  text: {
    invalidFormat: 'text is required',
    lengthField: 'min length is 5, max is 2024'
  },
  offerId: {
    invalidFormat: 'offerId field must be a valid id'
  },
  rating: {
    invalidFormat: 'Field rating must be a number.',
  },
  userId: {
    invalidFormat: 'userId field must be a valid id'
  }
} as const;
