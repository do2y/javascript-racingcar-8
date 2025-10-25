import { Console, Random } from '@woowacourse/mission-utils';

class App {
  async run() {
    const carNamesInput = await this.getCarNames();
    this.validateDelimiter(carNamesInput);
    const carNames = this.parseCarNames(carNamesInput);
    this.validateCarNames(carNames);

    const roundCount = await this.getRoundCount();
    const validatedCount = this.validateRoundCount(roundCount);

    Console.print('\n실행 결과');
    this.playGame(carNames, validatedCount);
  }

  async getCarNames() {
    const input = await Console.readLineAsync(
      '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n',
    );

    return input.trim();
  }

  validateDelimiter(input) {
    if (/[^가-힣a-zA-Z0-9,\s]/.test(input)) {
      throw new Error('[ERROR] 구분자는 쉼표(,)만 사용할 수 있습니다.');
    }

    if (input.startsWith(',') || input.endsWith(',')) {
      throw new Error('[ERROR] 쉼표(,)는 이름의 앞뒤에 올 수 없습니다.');
    }
  }

  parseCarNames(input) {
    return input.split(',').map((name) => name.trim());
  }

  validateCarNames(carNames) {
    if (carNames.length === 0) {
      throw new Error('[ERROR] 자동차 이름이 입력되지 않았습니다.');
    }

    carNames.forEach((name) => {
      if (name === '') {
        throw new Error('[ERROR] 빈 이름은 입력할 수 없습니다.');
      }

      if (name.length > 5) {
        throw new Error('[ERROR] 자동차 이름은 5자 이하만 가능합니다.');
      }
    });
  }

  async getRoundCount() {
    const input = await Console.readLineAsync('시도할 횟수는 몇 회인가요?\n');
    return input.trim();
  }

  validateRoundCount(input) {
    if (input === '') {
      throw new Error('[ERROR] 시도 횟수가 입력되지 않았습니다.');
    }

    if (!/^\d+$/.test(input)) {
      throw new Error('[ERROR] 시도 횟수는 0 이상의 정수만 가능합니다.');
    }

    return Number(input);
  }

  playGame(carNames, roundCount) {
    const carPositions = new Array(carNames.length).fill('');

    for (let i = 0; i < roundCount; i++) {
      carNames.forEach((name, index) => {
        const randomValue = Random.pickNumberInRange(0, 9);
        if (randomValue >= 4) {
          carPositions[index] += '-';
        }

        Console.print(`${name} : ${carPositions[index]}`);
      });

      Console.print('');
    }
  }
}

export default App;
