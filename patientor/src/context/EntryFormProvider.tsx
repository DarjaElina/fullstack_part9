import React, { createContext, useState, ReactNode } from 'react';

import { FormData } from '../types';
import { defaultFormData } from '../constants';

interface EntryFormContextType {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}


export const EntryFormContext = createContext<EntryFormContextType>({
  formData: defaultFormData,
  setFormData: () => {}
});

export const EntryFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormData] = useState<FormData>(defaultFormData);

  return (
    <EntryFormContext.Provider value={{ formData, setFormData }}
    >
      {children}
    </EntryFormContext.Provider>
  );
};