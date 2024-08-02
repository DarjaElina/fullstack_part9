import { useState, SyntheticEvent } from 'react';

import { TextField, Box, Button, ButtonGroup, MenuItem, Alert } from "@mui/material";

import patientService from '../../services/patients';

import { NewEntryVariables } from '../../types';

import useEntryForm from '../../hooks/useEntryForm';

import Basic from './Basic';
import Healthcheck from './Healthcheck';
import Hospital from './Hospital';
import Occupational from './Occupational';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { defaultFormData } from '../../constants';

import { isAxiosError } from 'axios';


type NewEntryFormProps = {
  id: string;
};



const renderSwitch = (entryType: string) => {
  switch (entryType) {
    case 'Health Check': {
      return (
        <>
          <Basic/>
          <Healthcheck/>
        </>
      );
    }
    case 'Hospital': {
      return (
        <>
          <Basic/>
          <Hospital/>
        </>
      );
    }
    case 'Occupational Health Care': {
      return (
        <>
          <Basic/>
          <Occupational/>
        </>
      );
    }
  }
};



const NewEntryForm = (props: NewEntryFormProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [entryType, setEntryType] = useState('');
  const [error, setError] = useState('');

  const queryClient = useQueryClient();

  const newEntryMutation = useMutation<void, unknown, NewEntryVariables>({
    mutationFn: ({ id, entryData }) => patientService.createEntry({id, entryData}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patient'] });
      setFormData(defaultFormData);
      setIsVisible(!isVisible);
    },
    onError: (e: unknown) => {
      if (isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  });

  const { formData, setFormData } = useEntryForm();

  const id = props.id;

  const collectFormData = (type: string) => {
    switch (type) {
      case 'Health Check': {
        return {
          ...formData.basic,
          ...formData.healthCheck
        };
      }
      case 'Hospital': {
        return {
          ...formData.basic,
          ...formData.hospital
        };
      }
      case 'Occupational Health Care': {
        return {
          ...formData.basic,
          ...formData.occupationalHealthcare
        };
      }
      default:
        throw new Error(`Unhandled type: ${type}`);
    }
  };

  const toggleFormVisibility = () => {
    setIsVisible(!isVisible);
    setEntryType('');
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const entryData = collectFormData(entryType);
    newEntryMutation.mutate({ id, entryData });
  };

  
  const entryTypeOptions = ["Hospital", "Occupational Health Care", "Health Check"];

  return (
   <Box>
      <Button onClick={() => setIsVisible(!isVisible)}>New Entry</Button>
       <Box sx={{ display: isVisible ? 'block' : 'none', p: 2, border: '1px solid grey' }}>
       {error && <Alert severity="error">{error}</Alert>}
        <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={handleSubmit}>
          <TextField
            select
            onChange={({ target }) => setEntryType(target.value)}
            required
            value={entryType}
            sx={{mb: 1}}
            helperText="Please select an entry type"
          >
          {entryTypeOptions.map(o => (
            <MenuItem key={o} value={o}>
              {o}
            </MenuItem>
          ))}
          </TextField>
          
          {renderSwitch(entryType)}

          <ButtonGroup>
            <Button type="submit">Add</Button>
            <Button onClick={toggleFormVisibility} type="button">Cancel</Button>
          </ButtonGroup>
        </form>
     </Box>
   </Box>
  );
};

export default NewEntryForm;