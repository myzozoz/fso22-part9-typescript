interface Exercise {
  totalDays: number;
  trainingDays: number;
  target: number;
  avg: number;
  targetReached: boolean;
  rating: number;
  description: string;
}

const calculateExercises = (input: Array<number>, target: number): Exercise => {
  const totalHours = input.reduce(
    (prev: number, curr: number) => prev + curr,
    0
  );

  const trainingDays = input.reduce(
    (prev: number, curr: number) => (curr > 0 ? prev + 1 : prev),
    0
  );

  const avg = totalHours / input.length;

  // Rating is 1 if target is reached, 2 if the average is still over two thirds of the target and 3 otherwise
  let rating = 0;
  let description = "";
  if (avg > target) {
    rating = 1;
    description = "Very well done, target reached!";
  } else if (avg / target > 0.66) {
    rating = 2;
    description = "Not bad, but room for improvement.";
  } else {
    rating = 3;
    description = "You'll have to work harder to reach your goals!.";
  }

  return {
    totalDays: input.length,
    trainingDays,
    target,
    avg,
    targetReached: avg >= target,
    rating,
    description,
  };
};

const parseArguments = (
  args: Array<string>
): { data: Array<number>; target: number } => {
  const target: number = Number(args[2]);
  const data: Array<number> = [];

  for (let i = 3; i < args.length; i++) {
    data.push(Number(args[i]));
  }

  return { data, target };
};

const { data, target } = parseArguments(process.argv);
console.log(calculateExercises(data, target));
