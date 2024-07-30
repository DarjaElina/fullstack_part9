import axios from 'axios';

const baseUrl = 'http://localhost:3000/api/diaries'

import { DiaryEntry, NonSensitiveDiaryEntry, NewDiaryEntry } from '../types';

const getAll = async () => {
  const response = await axios.get<NonSensitiveDiaryEntry[]>(baseUrl)
  return response.data
}

const createDiaryEntry = async (obj: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, obj);
  return response.data;
}

export default {
  getAll,
  createDiaryEntry
}