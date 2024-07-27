import { parseExerciseArgs, isValidExerciseTarget} from "./utils";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}


export const calculateExercises = (target: number, period: number[]): Result => {

  const periodLength = period.length;
  const trainingDays = period.filter(d => d !== 0).length;
  const average = period.reduce((acc, currentValue) => acc + currentValue, 0) / periodLength;
  const success = average >= target ? true : false;
  const rating = average > target ? 3
          : target === average ? 2
          : 1;
  const ratingDescription = rating === 3 ? 'fantastic result!'
          : rating === 2 ? 'good job!'
          : 'not to bad but could be better';

  const res = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };

  return res;
};

try {
  const { target, period } = parseExerciseArgs(process.argv);
  isValidExerciseTarget(target);
  console.log(calculateExercises(target, period));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}



