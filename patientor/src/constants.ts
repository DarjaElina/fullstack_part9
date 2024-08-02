export const apiBaseUrl = 'http://localhost:3001/api';

import { FormData, EntryType } from './types';

export const defaultFormData: FormData = {
  basic: {
    date: '',
    description: '',
    specialist: '',
    diagnosisCodes: []
  },
  healthCheck: {
    healthCheckRating: 0,
    type: EntryType.HealthCheck
  },
  hospital: {
    discharge: {
      date: '',
      criteria: '',
    },
    type: EntryType.Hospital
  },
  occupationalHealthcare: {
    employerName: '',
    sickLeave: {
      startDate: '',
      endDate: ''
    },
    type: EntryType.OccupationalHealthcare
  }
};
