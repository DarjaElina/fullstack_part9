import { parseBmiArgs, isValidBmiArgs } from "./utils";

type BmiCalculationResult = 'Underweight' | 'Normal (healthy weight)' | 'Overweight' | 'Obese';

export const calculateBmi = (height: number, weight: number): BmiCalculationResult => {
  const heightInMeters = height / 100;
  const result = weight / (heightInMeters * heightInMeters);
  if (result < 18.5) {
    return 'Underweight';
  } else if (result >= 18.5 && result <= 24.9) {
    return 'Normal (healthy weight)';
  } else if (result >= 25 && result <= 29.9) {
    return 'Overweight';
  } else return 'Obese';
};

try {
  const { value1, value2 } = parseBmiArgs(process.argv);
  isValidBmiArgs(value1, value2);
  console.log(calculateBmi(value1, value2));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}