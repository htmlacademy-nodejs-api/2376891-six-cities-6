import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError } from 'class-validator';
import { EApplicationError, TValidationErrorField } from '../libs/rest/index.js';

export const generateRandomValue = (min: number, max: number, numAfterDigit = 0) =>
  +((Math.random() * (max - min)) + min).toFixed(numAfterDigit);

export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export const getRandomItem = <T>(items: T[]): T => items[generateRandomValue(0, items.length - 1)];

export const getErrorMessage = (error: unknown): string => error instanceof Error ? `Details: ${error.message}` : '';

export function generatePassword(min: number, max: number): string {
  const symbols = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;%:?*()_+=';
  let password = '';

  const passwordLength = generateRandomValue(min, max);
  for (let i = 0; i < passwordLength; i++) {
    password += symbols.charAt(Math.floor(Math.random() * symbols.length));
  }

  return password;
}

export const fillDTO = <T, V>(someDto: ClassConstructor<T>, plainObject: V) =>
  plainToInstance(someDto, plainObject, { excludeExtraneousValues: true });

export const createErrorObject = (errorType: EApplicationError, error: string, details: TValidationErrorField[] = []) =>
  ({ errorType, error, details });

export const reduceValidationErrors = (errors: ValidationError[]): TValidationErrorField[] =>
  errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : []
  }));


export const getFullServerPath = (host: string, port: number) => `http://${host}:${port}`;
