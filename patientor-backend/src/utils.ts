import { NewPatient, Gender, NewEntry, EntryType, HealthCheckRating, Diagnosis, SickLeave, Discharge } from "./types";

// PATIENT HELPER FUNCTIONS



const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if (!isString(name) || name.trim() === '') {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const parseSsn = (ssn: unknown): string => {
  if (!isString(ssn) || ssn.trim() === '') {
    throw new Error('Incorrect or missing social security number');
  }

  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation) || occupation.trim() === '') {
    throw new Error('Incorrect or missing occupation');
  }

  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }

  return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
      entries: []
    };
    
    return newPatient;
  }
  
  throw new Error('Incorrect data: some fields are missing');
};

// entry helper functions

const parseCriteria = (criteria: unknown): string => {
  if (!isString(criteria) || criteria.trim() === '') {
    throw new Error('Incorrect or missing criteria');
  }

  return criteria;
};

const parseSpecialist = (specialist: unknown) => {
  if (!isString(specialist) || specialist.trim() === '') {
    throw new Error('Incorrect or missing specialist');
  }

  return specialist;
};

const parseDiagnosisCodes = (diagnosisCodes: unknown): Array<Diagnosis['code']> =>  {
  if (!diagnosisCodes || !Array.isArray(diagnosisCodes) || diagnosisCodes.length === 0) {
    // we will just trust the data to be in correct for
    return [] as Array<Diagnosis['code']>;
  }
  return diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDescription = (description: unknown): string => {
  if (!isString(description) || description.trim() === '') {
    throw new Error('Incorrect or missing description');
  }

  return description;
};

const parseDischarge = (object: unknown): Discharge => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing discharge fields');
  }

  if ('date' in object && 'criteria' in object) {
    const newDischarge = {
      date: parseDate(object.date),
      criteria: parseCriteria(object.criteria)
    };

    return newDischarge;
  }

  throw new Error('Some discharge fields are missing');
};

const parseSickLeave = (object: unknown): SickLeave => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing sick leave fields');
  }

  if ('startDate' in object && 'endDate' in object) {
    const newSickLeave = {
      startDate: parseDate(object.startDate),
      endDate: parseDate(object.endDate)
    };

    return newSickLeave;
  }

  throw new Error('Some discharge fields are missing');
};

const parseEmployerName = (employerName: unknown): string => {
  if (!isString(employerName) || employerName.trim() === '') {
    throw new Error('Incorrect or missing employer name');
  }

  return employerName;
};

const isHealthCheckRating = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).map(v => Number(v)).includes(Number(param));
};

const isNumber = (arg: unknown): arg is number => {
  return typeof Number(arg) === 'number';
};

const parseHealthCheckRating = (healthCheckRating: unknown) => {
  if (!isNumber(healthCheckRating) || !isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect or missing healthcheck rating: ' + healthCheckRating);
  }

  return healthCheckRating;
};

export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  

  if ('date' in object && 'specialist' in object && 'type' in object && 'description' in object && 'diagnosisCodes' in object) {
    const baseEntry = {
      date: parseDate(object.date),
      specialist: parseSpecialist(object.specialist),
      description: parseDescription(object.description),
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };
    
    switch (object.type) {
      case EntryType.Hospital: {
        if ('discharge' in object) {
          const newEntry: NewEntry = {
            ...baseEntry,
            type: object.type,
            discharge: parseDischarge(object.discharge)
          };
          return newEntry;
        }
      }
      break;
      case EntryType.OccupationalHealthcare: {
        if ('employerName' in object && 'sickLeave' in object) {
          const newEntry: NewEntry = {
            ...baseEntry,
            type: object.type,
            employerName: parseEmployerName(object.employerName),
            sickLeave: parseSickLeave(object.sickLeave)
          };
          return newEntry;
        }
      }
      break;
      case EntryType.HealthCheck: {
        if ('healthCheckRating' in object) {
          const newEntry: NewEntry = {
            ...baseEntry,
            type: object.type,
            healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
          };
          return newEntry;
        }
      }
      break;
      default: throw new Error('Unhandled entry type!');
  
    }
  }

  throw new Error('Incorrect data: some fields are missing');
};
