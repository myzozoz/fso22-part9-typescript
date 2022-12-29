import express from "express";
import bodyParser from "body-parser";

import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

const jsonParser = bodyParser.json();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  console.log(req.query);
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    res.json(calculateBmi(height, weight));
  } else {
    res.status(400).json({ error: "malformatted parameters" });
  }
});

app.post("/exercises", jsonParser, (req, res) => {
  //const { daily_exercises, target } = req.body;
  //console.log(daily_exercises, target);
  console.log(req.body);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const {
    daily_exercises,
    target,
  }: { daily_exercises: Array<number>; target: number } = req.body;
  if (!daily_exercises || !target)
    res.status(400).json({ error: "parameters missing" });
  else if (
    daily_exercises.some((e) => isNaN(Number(e)) || isNaN(Number(target)))
  )
    res.status(400).json({ error: "malformatted parameters" });
  else res.send(calculateExercises(daily_exercises, target));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
