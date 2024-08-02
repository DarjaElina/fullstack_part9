import { Box, TextField, Typography } from '@mui/material';

import useEntryForm from '../../hooks/useEntryForm';
import React from 'react';

const Occupational = () => {
  const { formData, setFormData } = useEntryForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'startDate' || name === 'endDate') {
      setFormData(prevState => ({
        ...prevState,
        occupationalHealthcare: {
          ...prevState.occupationalHealthcare,
          sickLeave: {
            ...prevState.occupationalHealthcare.sickLeave,
            [name]: value
          },
        }
      }));
    } else {
      setFormData(prevState => ({
        ...prevState,
        occupationalHealthcare: {
          ...prevState.occupationalHealthcare,
          [name]: value
        }
      }));
    }
  };

  return (
    <Box mb={2}>
      <TextField
        value={formData.occupationalHealthcare.employerName}
        inputProps={{minLength: 3}}
        required
        onChange={handleChange}
        name="employerName"
        label="Employer Name"
        fullWidth
      />
      
      <Typography  m={2} ml={0} variant='subtitle1'>Sick Leave:</Typography>
      <Box sx={{display: 'flex', gap: "10px"}}>
        <TextField
          value={formData.occupationalHealthcare.sickLeave.startDate}
          required
          onChange={handleChange}
          name="startDate"
          label="Start Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          value={formData.occupationalHealthcare.sickLeave.endDate}
          required
          onChange={handleChange}
          name="endDate"
          label="End Date"
          type="date"
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Box>
    </Box>
    
  );
};

export default Occupational;