import { NewPatient, Gender } from './types';

const parseTextField = (content: unknown, name: string): string => {
  if (!content || !isString(content)) {
    throw new Error(`Incorrect or missing field: ${name}`);
  }
  return content;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing field: gender');
  }
  return gender;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

type Fields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseTextField(name, 'name'),
    dateOfBirth: parseTextField(dateOfBirth, 'dateOfBirth'),
    ssn: parseTextField(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseTextField(occupation, 'occupation'),
  };

  return newPatient;
};

export default toNewPatient;
