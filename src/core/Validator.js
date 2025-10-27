import { ERROR_MESSAGES } from '../constants/error.js';
import { CAR } from '../constants/constants.js';

export const Validator = {
  delimiter(input) {
    if (/[^가-힣a-zA-Z0-9,\s]/.test(input))
      throw new Error(ERROR_MESSAGES.INVALID_DELIMITER);
    
    if (input.startsWith(',') || input.endsWith(','))
      throw new Error(ERROR_MESSAGES.INVALID_COMMA_POSITION);
  },

  carNames(carNames) {
    if (carNames.length === 0) throw new Error(ERROR_MESSAGES.NO_CAR_NAME);

    carNames.forEach((name) => {
      if (name === '') throw new Error(ERROR_MESSAGES.EMPTY_CAR_NAME);
      if (name.length > CAR.MAX_NAME_LENGTH)
        throw new Error(ERROR_MESSAGES.CAR_NAME_TOO_LONG);
    });
  },

  roundCount(input) {
    if (input === '') throw new Error(ERROR_MESSAGES.EMPTY_ROUND_COUNT);

    if (!/^\d+$/.test(input))
      throw new Error(ERROR_MESSAGES.INVALID_ROUND_COUNT);
    return Number(input);
  },
};
