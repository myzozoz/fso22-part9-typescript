const calculateBmi = (heightInCm: number, weight: number): string => {
  const heightInM: number = heightInCm / 100;
  const bmi = weight / (heightInM * heightInM);
  console.log(`Weight(kg): ${weight}, Height(m): ${heightInM} => BMI: ${bmi}`);
  if (bmi < 16.0) return "Underweight (Severe thinness)";
  if (bmi < 17) return "Underweight (Moderate thinness)";
  if (bmi < 18.5) return "Underweight (Mild thinness)";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight (Pre-obese)";
  if (bmi < 35) return "Obese (Class I)";
  if (bmi < 40) return "Obese (Class II)";
  return "Obese (Class I)";
};

const a: number = Number(process.argv[2]);
const b: number = Number(process.argv[3]);

console.log(calculateBmi(a, b));