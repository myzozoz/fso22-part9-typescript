import patients from '../../data/patients';
import { v1 as uuid } from 'uuid';
import { Patient, PublicPatient, NewPatient } from '../types';

const getAll = (): Array<Patient> => {
  return patients;
};

const get = (id: string): Patient | undefined => {
  return patients.find((p) => p.id === id);
};

const getAllCensored = (): Array<PublicPatient> => {
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
}: NewPatient): PublicPatient => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
  const id: string = uuid();
  const newPatient: Patient = {
    id,
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
    entries: [],
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
  getAllCensored,
  get,
  addNew,
};
