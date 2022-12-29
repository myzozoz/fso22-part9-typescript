import patientData from '../../data/patients.json';
import { v1 as uuid } from 'uuid';
import { Patient, CensoredPatient, NewPatient } from '../types';

const patients: Array<Patient> = patientData as Patient[];

const getAll = (): Array<Patient> => {
  return patients;
};

const getCensored = (): Array<CensoredPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addNew = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: NewPatient): CensoredPatient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();
  const newPatient: Patient = {
    id,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  };

  patients.push(newPatient);
  return {
    name,
    id,
    dateOfBirth,
    gender,
    occupation,
  };
};

export default {
  getAll,
  getCensored,
  addNew,
};
