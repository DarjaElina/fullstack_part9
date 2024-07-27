import express from 'express';
import { isValidBmiArgs, isValidExerciseTarget, isValidExercisePeriod, isValidNumber } from './utils';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  try {
    isValidBmiArgs(height, weight);
    const bmi = calculateBmi(height, weight);
    res.send({
      weight,
      height,
      bmi
    });
  } catch {
    res.status(400).json({ error: 'parameters missing' });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  if (!target || !daily_exercises) {
    res.status(400).json({ error: 'parameters missing' });
  }


  else {
    try {
      isValidNumber(target);
      isValidExerciseTarget(Number(target));
      isValidExercisePeriod(daily_exercises);
      const result = calculateExercises(Number(target), daily_exercises as number[]);
      res.send({ result });
    } catch {
      res.status(400).json({ error: 'malformatted parameters' });
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});