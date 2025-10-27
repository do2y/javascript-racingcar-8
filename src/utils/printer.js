import { Console } from '@woowacourse/mission-utils';

export const Printer = {
  resultTitle() {
    Console.print('\n실행 결과');
  },

  roundResult(carNames, positions) {
    carNames.forEach((name, idx) =>
      Console.print(`${name} : ${positions[idx]}`),
    );
    Console.print('');
  },

  winners(winners) {
    Console.print(`최종 우승자 : ${winners.join(', ')}`);
  },
};
