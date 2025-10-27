import { Console, Random } from '@woowacourse/mission-utils';
import { ERROR_MESSAGES } from './error.js';
import { parseCarNames } from './utils/parser.js';

const MIN_RANDOM = 0;
const MAX_RANDOM = 9;
const MOVE_THRESHOLD = 4;
const MAX_NAME_LENGTH = 5;

class App {
  async run() {
    const carNamesInput = await this.getCarNames();
    this.validateDelimiter(carNamesInput);
    const carNames = this.parseCarNames(carNamesInput);
    this.validateCarNames(carNames);

    const roundCount = await this.getRoundCount();
    const validatedCount = this.validateRoundCount(roundCount);

    Console.print('\n실행 결과');
    const carPositions = this.playGame(carNames, validatedCount);
    this.printWinners(carNames, carPositions);
  }

  async getCarNames() {
    const input = await Console.readLineAsync(
      '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n',
    );

    return input.trim();
  }

  validateDelimiter(input) {
    if (/[^가-힣a-zA-Z0-9,\s]/.test(input)) {
      throw new Error(ERROR_MESSAGES.INVALID_DELIMITER);
    }

    if (input.startsWith(',') || input.endsWith(',')) {
      throw new Error(ERROR_MESSAGES.INVALID_COMMA_POSITION);
    }
  }

  validateCarNames(carNames) {
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
  }

  async getRoundCount() {
    const input = await Console.readLineAsync('시도할 횟수는 몇 회인가요?\n');
    return input.trim();
  }

  validateRoundCount(input) {
    if (input === '') {
      throw new Error(ERROR_MESSAGES.EMPTY_ROUND_COUNT);
    }

    if (!/^\d+$/.test(input)) {
      throw new Error(ERROR_MESSAGES.INVALID_ROUND_COUNT);
    }

    return Number(input);
  }

  playGame(carNames, roundCount) {
    const carPositions = new Array(carNames.length).fill('');

    for (let i = 0; i < roundCount; i++) {
      carNames.forEach((name, index) => {
        this.moveCar(carPositions, index);
        Console.print(`${name} : ${carPositions[index]}`);
      });

      Console.print('');
    }

    return carPositions;
  }

  moveCar(carPositions, index) {
    const randomValue = Random.pickNumberInRange(MIN_RANDOM, MAX_RANDOM);
    if (randomValue >= MOVE_THRESHOLD) {
      carPositions[index] += '-';
    }
  }

  printWinners(carNames, carPositions) {
    const maxDistance = Math.max(...carPositions.map((pos) => pos.length));
    const winners = carNames.filter(
      (_, index) => carPositions[index].length === maxDistance,
    );

    Console.print(`최종 우승자 : ${winners.join(', ')}`);
  }
}

export default App;
