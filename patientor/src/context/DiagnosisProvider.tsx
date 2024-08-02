// context/DiagnosisContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import diagnosisService from '../services/diagnoses';
import { Diagnosis } from '../types';

interface DiagnosisContextType {
  diagnoses: Diagnosis[];
}

export const DiagnosisContext = createContext<DiagnosisContextType | undefined>(undefined);

export const DiagnosisProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const data = await diagnosisService.getAll();
      setDiagnoses(data);
    };

    fetchDiagnoses();
  }, []);

  return (
    <DiagnosisContext.Provider value={{ diagnoses }}>
      {children}
    </DiagnosisContext.Provider>
  );
};


