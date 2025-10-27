import { Console } from '@woowacourse/mission-utils';

export const printWinners = (carNames, carPositions) => {
  const maxDistance = Math.max(...carPositions.map((pos) => pos.length));
  const winners = carNames.filter(
    (_, index) => carPositions[index].length === maxDistance,
  );

  Console.print(`최종 우승자 : ${winners.join(', ')}`);
};
