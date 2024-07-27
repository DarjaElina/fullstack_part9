export interface BmiValues {
  value1: number;
  value2: number;
}

export interface ExerciseValues {
  target: number;
  period: number[];
}

export const isValidNumber = (value: unknown): boolean => !isNaN(Number(value));

export const isValidBmiArgs = (height: number, weight: number): void => {
  if (height >= 50 && height <= 250 && weight >= 10 && weight <= 500) {
    return ;
  } else {
    throw new Error('Provided values are not valid');
  }
};

export const isValidExerciseTarget = (target: number): void => {
  if (target > 0) {
    return;
  } else {
    throw new Error('Target must be greater that 0');
  }
};

export const parseBmiArgs = (args: string[]): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isValidNumber(height) && isValidNumber(weight)) {
    return { value1: height, value2: weight };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const parseExerciseArgs = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const target = Number(args[2]);
  const period = args.slice(3).map(Number);

  if (isValidNumber(target) && period.every(isValidNumber)) {
    return { target, period };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const isValidExercisePeriod = (period: unknown): void => {
  if (Array.isArray(period) && period.every(isValidNumber)) {
    return ;
  } else {
    throw new Error('Invalid exercise period values');
  }
};