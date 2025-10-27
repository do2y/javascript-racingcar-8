import { Console } from '@woowacourse/mission-utils';
import { Validator } from './core/Validator.js';
import { Game } from './core/Game.js';
import { parseCarNames } from './utils/parser.js';
import { Printer } from './utils/printer.js';

class App {
  async run() {
    try {
      const carNamesInput = await this.getCarNames();
      Validator.inputExists(carNamesInput);
      Validator.delimiter(carNamesInput);

      const carNames = parseCarNames(carNamesInput);
      Validator.carNames(carNames);

      const roundCountInput = await this.getRoundCount();
      const roundCount = Validator.roundCount(roundCountInput);

      const game = new Game(carNames);

      Printer.resultTitle();
      game.play(roundCount, Printer);
      Printer.winners(game.getWinners());
    } catch (error) {
      Console.print(error.message);
      throw error;
    }
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
