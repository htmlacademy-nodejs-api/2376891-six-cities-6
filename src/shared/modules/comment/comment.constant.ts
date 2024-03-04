export const COMMENT_DTO_CONSTRAINT = {
  TEXT: { MIN: 5, MAX: 1024 },
  RATING: { MIN: 1, MAX: 5 },
} as const;

export enum ECommentsConstraint {
  Min = 0,
  Max = 20,
}

