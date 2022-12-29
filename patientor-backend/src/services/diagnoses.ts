import diagnosesData from '../../data/diagnoses.json';
import { type Diagnose } from '../types';

const diagnoses: Array<Diagnose> = diagnosesData as Diagnose[];

const getAll = (): Array<Diagnose> => {
  return diagnoses;
};

export default {
  getAll,
};
