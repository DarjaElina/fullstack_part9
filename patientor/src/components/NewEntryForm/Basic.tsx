import { Box, TextField } from '@mui/material';

import useEntryForm from '../../hooks/useEntryForm';

const Basic = () => {
  const { formData, setFormData } = useEntryForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      basic: {
        ...prevState.basic,
        [name]: name === "diagnosisCodes" ? value.split(', ').map(code => code.trim()) : value
      }
    }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
       <TextField
          inputProps={{minLength: 5}}
          name="description"
          value={formData.basic.description}
          onChange={handleChange}
          required
          sx={{mb: 1}}
          label="Description"
        />
        <TextField
          name="date"
          value={formData.basic.date}
          onChange={handleChange}
          required
          type="date"
          sx={{mb: 1}}
          label="Date"
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          inputProps={{minLength: 3}}
          name="specialist"
          value={formData.basic.specialist}
          onChange={handleChange}
          required
          sx={{mb: 1}}
          label="Specialist"
        />


        <TextField
          inputProps={{ pattern:  "([A-Za-z]\\d{2}\\.\\d)(,\\s*[A-Za-z]\\d{2}\\.\\d)*"}}
          name="diagnosisCodes"
          value={formData.basic.diagnosisCodes.join(', ')}
          onChange={handleChange}
          sx={{mb: 1}}
          label="Diagnosis codes"
          helperText="Enter codes separated by commas, e.g., Z57.1, Z74.3, M51.2"
        />
        
    </Box>
  );
};

export default Basic;