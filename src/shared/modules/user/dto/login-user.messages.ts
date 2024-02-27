export const CreateLoginUserMessage = {
  email: {
    invalidFormat: 'Email must be a valid address.'
  },
  password: {
    invalidFormat: 'Password must be a string.',
    lengthField: 'Min length for password is 6, max is 12.'
  },
} as const;
