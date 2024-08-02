import { useContext} from "react";

import { DiagnosisContext } from "../context/DiagnosisProvider";

export const useDiagnosis = () => {
  const context = useContext(DiagnosisContext);
  if (!context) {
    throw new Error('useDiagnoses must be used within a DiagnosisProvider');
  }
  return context;
};