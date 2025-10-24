import { Console } from '@woowacourse/mission-utils';

class App {
  async run() {
    const carNamesInput = await this.getCarNames();
    const carNames = this.parseCarNames(carNamesInput);
    console.log(carNames);
  }

  async getCarNames() {
    const input = await Console.readLineAsync(
      '경주할 자동차 이름을 입력하세요.(이름은 쉼표(,) 기준으로 구분)\n',
    );
    return input.trim();
  }

  parseCarNames(input) {
    return input.split(',').map((name) => name.trim());
  }
}

export default App;
