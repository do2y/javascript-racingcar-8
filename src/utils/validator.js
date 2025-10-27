import { ERROR_MESSAGES } from '../error.js';

const MAX_NAME_LENGTH = 5;

export const validateDelimiter = (input) => {
  if (/[^가-힣a-zA-Z0-9,\s]/.test(input)) {
    throw new Error(ERROR_MESSAGES.INVALID_DELIMITER);
  }
  if (input.startsWith(',') || input.endsWith(',')) {
    throw new Error(ERROR_MESSAGES.INVALID_COMMA_POSITION);
  }
};

export const validateCarNames = (carNames) => {
  if (carNames.length === 0) {
    throw new Error(ERROR_MESSAGES.NO_CAR_NAME);
  }
  carNames.forEach((name) => {
    if (name === '') {
      throw new Error(ERROR_MESSAGES.EMPTY_CAR_NAME);
    }
    if (name.length > MAX_NAME_LENGTH) {
      throw new Error(ERROR_MESSAGES.CAR_NAME_TOO_LONG);
    }
  });
};

export const validateRoundCount = (input) => {
  if (input === '') {
    throw new Error(ERROR_MESSAGES.EMPTY_ROUND_COUNT);
  }
  if (!/^\d+$/.test(input)) {
    throw new Error(ERROR_MESSAGES.INVALID_ROUND_COUNT);
  }
  return Number(input);
};
