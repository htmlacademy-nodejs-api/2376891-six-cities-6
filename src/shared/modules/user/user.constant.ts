export const DEFAULT_AVATAR_FILE_NAME = 'default-avatar.jpg';

export const UserDtoConstraint = {
  Name: { MIN: 1, MAX: 15 },
  Password: { MIN: 6, MAX: 12 },
} as const;

export const UserDtoMessages = {
  AccountType: 'AccountType must be regular and pro.',
} as const;

