export const CommentDtoConstraint = {
  Text: { MIN: 5, MAX: 1024 },
  Rating: { MIN: 1, MAX: 5 },
} as const;

export enum ECommentsConstraint {
  Min = 0,
  Max = 20,
}

export const DEFAULT_COMMENTS_COUNT = 50;
