import { Console } from '@woowacourse/mission-utils';
import { parseCarNames } from './utils/parser.js';
import {
  validateDelimiter,
  validateCarNames,
  validateRoundCount,
} from './utils/validator.js';
import { playGame } from './utils/game.js';
import { printWinners } from './utils/printer.js';

class App {
  async run() {
    const carNamesInput = await this.getCarNames();
    validateDelimiter(carNamesInput);

    const carNames = parseCarNames(carNamesInput);
    validateCarNames(carNames);

    const roundCount = await this.getRoundCount();
    const validatedCount = validateRoundCount(roundCount);

    Console.print('\n실행 결과');
    const carPositions = playGame(carNames, validatedCount);
    printWinners(carNames, carPositions);
  }

  async getCarNames() {
    const input = await Console.readLineAsync(
      '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n',
    );
    return input.trim();
  }

  async getRoundCount() {
    const input = await Console.readLineAsync('시도할 횟수는 몇 회인가요?\n');
    return input.trim();
  }
}

export default App;
