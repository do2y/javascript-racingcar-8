import { Console, Random } from '@woowacourse/mission-utils';

const MIN_RANDOM = 0;
const MAX_RANDOM = 9;
const MOVE_THRESHOLD = 4;

export const playGame = (carNames, roundCount) => {
  const carPositions = new Array(carNames.length).fill('');

  for (let i = 0; i < roundCount; i++) {
    carNames.forEach((name, index) => {
      moveCar(carPositions, index);
      Console.print(`${name} : ${carPositions[index]}`);
    });
    Console.print('');
  }

  return carPositions;
};

const moveCar = (carPositions, index) => {
  const randomValue = Random.pickNumberInRange(MIN_RANDOM, MAX_RANDOM);
  if (randomValue >= MOVE_THRESHOLD) {
    carPositions[index] += '-';
  }
};
