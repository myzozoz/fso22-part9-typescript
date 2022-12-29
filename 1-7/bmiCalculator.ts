export interface BMI {
  weight: number;
  height: number;
  bmi: string;
}

export const calculateBmi = (height: number, weight: number): BMI => {
  const heightInM: number = height / 100;
  const bmi = weight / (heightInM * heightInM);
  console.log(`Weight(kg): ${weight}, Height(m): ${heightInM} => BMI: ${bmi}`);
  let bmi_string = "";
  if (bmi < 16.0) bmi_string = "Underweight (Severe thinness)";
  else if (bmi < 17) bmi_string = "Underweight (Moderate thinness)";
  else if (bmi < 18.5) bmi_string = "Underweight (Mild thinness)";
  else if (bmi < 25) bmi_string = "Normal";
  else if (bmi < 30) bmi_string = "Overweight (Pre-obese)";
  else if (bmi < 35) bmi_string = "Obese (Class I)";
  else if (bmi < 40) bmi_string = "Obese (Class II)";
  else bmi_string = "Obese (Class I)";

  return { weight, height, bmi: bmi_string };
};

/*const a: number = Number(process.argv[2]);
const b: number = Number(process.argv[3]);

console.log(calculateBmi(a, b));*/
