import express from "express";
import { calculateBmi } from "./bmiCalculator";
const app = express();

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
    res.json({ error: "malformatted parameters" });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
