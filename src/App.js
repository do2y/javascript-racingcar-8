import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    const carNamesInput = await this.getCarNames();
    this.validateDelimiter(carNamesInput);
    const carNames = this.parseCarNames(carNamesInput);
    this.validateCarNames(carNames);
    console.log(carNames);
  }

  async getCarNames() {
    const input = await Console.readLineAsync(
      '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n',
    );

    return input.trim();
  }

  validateDelimiter(input) {
    if (
      input.includes('/') ||
      input.includes(':') ||
      input.includes(';') ||
      input.includes(' ') ||
      input.includes('|')
    ) {
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
}

export default App;
