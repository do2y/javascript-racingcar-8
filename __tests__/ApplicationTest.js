import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';
import { ERROR_MESSAGES } from '../src/constants/error.js';

let app;
let logSpy;

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn().mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();
  numbers.reduce(
    (acc, number) => acc.mockReturnValueOnce(number),
    MissionUtils.Random.pickNumberInRange,
  );
};

beforeEach(() => {
  app = new App();
  logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
});

describe('자동차 경주 기능 테스트', () => {
  test('자동차가 무작위값 4 이상이면 전진한다.', async () => {
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ['pobi,woni', '1'];
    const logs = ['pobi : -', 'woni : ', '최종 우승자 : pobi'];

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, STOP]);

    await app.run();

    logs.forEach((log) =>
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log)),
    );
  });

  test('모든 라운드 종료 후 우승자를 출력한다', async () => {
    const inputs = ['pobi,woni', '1'];
    mockQuestions(inputs);
    mockRandoms([4, 3]);

    await app.run();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('최종 우승자 : pobi'),
    );
  });
});

describe('예외 처리 테스트', () => {
  test('자동차 이름이 5자를 초과하면 예외가 발생한다.', async () => {
    const inputs = ['soheeeee', '3'];
    mockQuestions(inputs);

    await expect(app.run()).rejects.toThrow(ERROR_MESSAGES.CAR_NAME_TOO_LONG);
  });

  test('쉼표(,) 외의 구분자를 사용한 경우 예외가 발생한다.', async () => {
    const inputs = ['sohee/sohe', '3'];
    mockQuestions(inputs);

    await expect(app.run()).rejects.toThrow(ERROR_MESSAGES.INVALID_DELIMITER);
  });

  test('쉼표(,)가 문자열의 앞뒤에 위치한 경우 예외가 발생한다.', async () => {
    const inputs = [',sohee', '3'];
    mockQuestions(inputs);

    await expect(app.run()).rejects.toThrow(
      ERROR_MESSAGES.INVALID_COMMA_POSITION,
    );
  });

  test('자동차 이름이 비어있는 경우 예외가 발생한다.', async () => {
    const inputs = ['pobi, ,woni', '3'];
    mockQuestions(inputs);

    await expect(app.run()).rejects.toThrow(ERROR_MESSAGES.EMPTY_CAR_NAME);
  });

  test('자동차 이름에 아무것도 입력되지 않은 경우 예외가 발생한다.', async () => {
    const inputs = ['', '3'];
    mockQuestions(inputs);

    await expect(app.run()).rejects.toThrow(ERROR_MESSAGES.NO_CAR_NAME);
  });

  test('시도 횟수가 비어있는 경우 예외가 발생한다.', async () => {
    const inputs = ['pobi,woni', ''];
    mockQuestions(inputs);

    await expect(app.run()).rejects.toThrow(ERROR_MESSAGES.EMPTY_ROUND_COUNT);
  });

  test('시도 횟수에 문자가 입력된 경우 예외가 발생한다.', async () => {
    const inputs = ['pobi,woni', 'abc'];
    mockQuestions(inputs);

    await expect(app.run()).rejects.toThrow(ERROR_MESSAGES.INVALID_ROUND_COUNT);
  });

  test('시도 횟수가 0 이하인 경우 예외가 발생한다.', async () => {
    const inputs = ['pobi,woni', '0'];
    mockQuestions(inputs);

    await expect(app.run()).rejects.toThrow(ERROR_MESSAGES.INVALID_ROUND_COUNT);
  });
});

describe('추가 기능 테스트', () => {
  test('여러 우승자가 있는 경우 쉼표로 구분하여 출력한다.', async () => {
    const MOVING_FORWARD = 4;
    const inputs = ['pobi,woni', '1'];

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, MOVING_FORWARD]);

    await app.run();

    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('최종 우승자 : pobi, woni'),
    );
  });

  test('자동차 이름의 앞뒤 공백을 제거하여 처리한다.', async () => {
    const inputs = ['  pobi ,  woni  ', '1'];

    mockQuestions(inputs);
    mockRandoms([4, 3]);

    await app.run();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('pobi : -'));
    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('woni : '));
  });

  test('자동차가 한 대만 입력된 경우 정상 동작한다.', async () => {
    const inputs = ['pobi', '1'];

    mockQuestions(inputs);
    mockRandoms([4]);

    await app.run();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('pobi : -'));
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('최종 우승자 : pobi'),
    );
  });

  test('시도 횟수가 여러 번인 경우 전진 상태가 누적되어 출력된다.', async () => {
    const inputs = ['pobi,woni', '3'];

    mockQuestions(inputs);
    mockRandoms([4, 3, 4, 3, 4, 3]); // pobi만 매 라운드 전진

    await app.run();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('pobi : ---'));
  });

  test('모든 랜덤값이 3 이하일 경우 전진 없이 정상 종료된다.', async () => {
    const inputs = ['pobi,woni', '2'];

    mockQuestions(inputs);
    mockRandoms([3, 2, 1, 0]);

    await app.run();

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('pobi :'));
    expect(logSpy).toHaveBeenCalledWith(
      expect.stringContaining('최종 우승자 : pobi, woni'),
    );
  });
});
