export const CreateUserMessages = {
  name: {
    invalidFormat: 'Name is required.',
    lengthField: 'min length is 1, max is 15',
  },
  email: {
    invalidFormat: 'Email must be a valid address.'
  },
  avatarUrl: {
    invalidFormat: 'AvatarUrl must be an url.'
  },
  password: {
    invalidFormat: 'Password must be a string.',
    lengthField: 'Min length for password is 6, max is 12.'
  },
  accountType: {
    invalid: 'AccountType must be regular and pro.',
  },
  favorites: {
    invalidFormat: 'Favorites must be an array.'
  },
} as const;
