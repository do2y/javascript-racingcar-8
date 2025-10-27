import { RANDOM } from '../constants/constants.js';
import { randomNumberInRange } from '../utils/random.js';

export class Game {
  constructor(carNames) {
    this.carNames = carNames;
    this.positions = new Array(carNames.length).fill('');
  }

  play(roundCount, printer) {
    for (let i = 0; i < roundCount; i++) {
      this.carNames.forEach((_, idx) => this.move(idx));
      printer.round(this.carNames, this.positions);
    }
    return this.positions;
  }

  move(index) {
    const randomValue = randomNumberInRange(RANDOM.MIN, RANDOM.MAX);
    if (randomValue >= RANDOM.MOVE_THRESHOLD) {
      this.positions[index] += '-';
    }
  }

  getWinners() {
    const max = Math.max(...this.positions.map((p) => p.length));
    return this.carNames.filter((_, idx) => this.positions[idx].length === max);
  }
}
