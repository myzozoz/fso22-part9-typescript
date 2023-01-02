import {
  NewPatient,
  Gender,
  NewEntry,
  EntryType,
  SickLeave,
  Discharge,
  HealthCheckRating,
} from './types';

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

/*
const parseEntryType = (type: unknown): EntryType => {
  if (!type || !isType(type)) {
    throw new Error('Incorrect or missing field: type');
  }
  return type;
};
*/

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect or missing field: discharge');
  }
  return discharge;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!sickLeave || !isSickLeave(sickLeave)) {
    throw new Error('Incorrect or missing field: sickLeave');
  }
  return sickLeave;
};

const parseStringArray = (arr: unknown): string[] => {
  if (!arr || !isArray(arr)) {
    throw new Error('Expected array');
  }
  if (!isStringArray(arr)) {
    throw new Error('Array does not contain diagnosiscodes');
  }
  return arr;
};

const isArray = (arr: unknown): arr is Array<unknown> => {
  return typeof arr === 'object' || arr instanceof Array;
};

const isStringArray = (arr: unknown[]): arr is string[] => {
  let allEntriesAreStrings = true;

  arr.forEach((s: unknown) => {
    if (!isString(s)) {
      allEntriesAreStrings = false;
    }
  });

  return allEntriesAreStrings;
};

const parseHealthCheckRating = (hcr: unknown): HealthCheckRating => {
  if (hcr === undefined || hcr === null || !isHCR(hcr)) {
    throw new Error('Incorrect or missing field: healthCheckRating');
  }
  return hcr;
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (gender: any): gender is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(gender);
};

/*
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isType = (type: any): type is EntryType => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(EntryType).includes(type);
};
*/

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHCR = (hcr: any): hcr is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(hcr);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (discharge: any): discharge is Discharge => {
  if (
    discharge.date &&
    isString(discharge.date) &&
    discharge.criteria &&
    isString(discharge.criteria)
  ) {
    return true;
  }
  return false;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {
  if (
    sickLeave.startDate &&
    isString(sickLeave.startDate) &&
    sickLeave.endDate &&
    isString(sickLeave.endDate)
  ) {
    return true;
  }
  return false;
};

function optional<T>(callback: () => T): T | undefined {
  try {
    const value: T = callback();
    return value;
  } catch (e) {
    return undefined;
  }
}

type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn: unknown;
  gender: unknown;
  occupation: unknown;
};

export const toNewPatient = ({
  name,
  dateOfBirth,
  ssn,
  gender,
  occupation,
}: PatientFields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseTextField(name, 'name'),
    dateOfBirth: parseTextField(dateOfBirth, 'dateOfBirth'),
    ssn: parseTextField(ssn, 'ssn'),
    gender: parseGender(gender),
    occupation: parseTextField(occupation, 'occupation'),
    entries: [],
  };

  return newPatient;
};

type EntryFields = {
  date: unknown;
  type: unknown;
  specialist: unknown;
  description: unknown;
  diagnosisCodes?: unknown;
  employerName?: unknown;
  sickLeave?: unknown;
  discharge?: unknown;
  healthCheckRating?: unknown;
};

export const toNewEntry = ({
  date,
  type,
  specialist,
  description,
  diagnosisCodes,
  employerName,
  sickLeave,
  discharge,
  healthCheckRating,
}: EntryFields): NewEntry => {
  switch (type) {
    case EntryType.OccupationalHealthcare:
      const ocEntry: NewEntry = {
        date: parseTextField(date, 'date'),
        type: EntryType.OccupationalHealthcare,
        specialist: parseTextField(specialist, 'specialist'),
        description: parseTextField(description, 'description'),
        diagnosisCodes: optional<string[]>(() =>
          parseStringArray(diagnosisCodes)
        ),
        employerName: parseTextField(employerName, 'employerName'),
        sickLeave: parseSickLeave(sickLeave),
      };
      return ocEntry;
    case EntryType.Hospital:
      const hospitalEntry: NewEntry = {
        date: parseTextField(date, 'date'),
        type: EntryType.Hospital,
        specialist: parseTextField(specialist, 'specialist'),
        description: parseTextField(description, 'description'),
        diagnosisCodes: optional<string[]>(() =>
          parseStringArray(diagnosisCodes)
        ),
        discharge: optional<Discharge>(() => parseDischarge(discharge)),
      };
      return hospitalEntry;
    case EntryType.HealthCheck:
      const hcEntry: NewEntry = {
        date: parseTextField(date, 'date'),
        type: EntryType.HealthCheck,
        specialist: parseTextField(specialist, 'specialist'),
        description: parseTextField(description, 'description'),
        diagnosisCodes: optional<string[]>(() =>
          parseStringArray(diagnosisCodes)
        ),
        healthCheckRating: parseHealthCheckRating(healthCheckRating),
      };
      return hcEntry;
    default:
      throw new Error('could not parse');
  }
};
