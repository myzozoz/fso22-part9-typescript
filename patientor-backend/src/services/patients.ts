import patientData from '../../data/patients.json';
import { type Patient, type CensoredPatient } from '../types';

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

export default {
  getAll,
  getCensored,
};
