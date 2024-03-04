export const USER_DTO_CONSTRAINT = {
  NAME: { MIN: 1, MAX: 15 },
  PASSWORD: { MIN: 6, MAX: 12 },
} as const;

export const USER_DTO_MESSAGES = {
  ACCOUNT_TYPE: 'AccountType must be regular and pro.',
} as const;

