import { Box, TextField, Typography } from '@mui/material';

import useEntryForm from '../../hooks/useEntryForm';

const Hospital = () => {
  
  const { formData, setFormData } = useEntryForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      hospital: {
        ...prevState.hospital,
        discharge: {
          ...prevState.hospital.discharge,
          [name]: value
        }
      }
    }));
  };

  return (
    <Box mb={2} sx={{display: 'flex', flexDirection: 'column'}}>
      <Typography mb={2} variant='subtitle1'>Patient Discharge</Typography>
      <Box sx={{display: 'flex', gap: "10px"}}>
        <TextField
          value={formData.hospital.discharge.date}
          name="date"
          type="date"
          label="Date"
          required
          InputLabelProps={{
            shrink: true,
          }}
          onChange={handleChange}
        />
        <TextField
          inputProps={{ minLength: 5 }}
          value={formData.hospital.discharge.criteria}
          name="criteria"
          required
          onChange={handleChange}
          label="Criteria"
        />
      </Box>
    </Box>
  );
};

export default Hospital;