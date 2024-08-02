import axios from "axios";
import { Patient, PatientFormValues, NewEntryVariables } from "../types";

import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const getSinglePatient = async (id: string | undefined) => {
  const { data } = await axios.get<Patient>(
    `${apiBaseUrl}/patients/${id}`
  );

  return data;
};

const createEntry = async ( parameters: NewEntryVariables ) => {
  const { id, entryData } = parameters;
  const { data } = await axios.post(
    `${apiBaseUrl}/patients/${id}/entries`,
    entryData
  );

  return data;
};

export default {
  getAll, create, getSinglePatient, createEntry
};

