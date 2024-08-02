import { useContext } from 'react';
import { EntryFormContext } from '../context/EntryFormProvider'; // Adjust the path as needed

const useEntryForm = () => {
  const context = useContext(EntryFormContext);
  if (!context) {
    throw new Error('useEntryForm must be used within an EntryFormProvider');
  }
  return context;
};

export default useEntryForm;