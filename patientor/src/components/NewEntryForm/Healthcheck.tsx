import { TextField, Box, MenuItem } from "@mui/material";
import { HealthCheckRating } from "../../types";

import useEntryForm from "../../hooks/useEntryForm";

const Healthcheck = () => {

  const { formData, setFormData } = useEntryForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      healthCheck: {
        ...prevState.healthCheck,
        [name]: value
      }
    }));
  };

  const healthCheckRatingOptions = Object.values(HealthCheckRating).filter(v => typeof v === 'number');

  return (
    <Box mb={2}>
      <TextField
        name="healthCheckRating"
        fullWidth
        select
        value={formData.healthCheck.healthCheckRating}
        onChange={handleChange}
        required
        sx={{mb: 1}}
        helperText="Healthcheck rating"
        
      >
      {healthCheckRatingOptions.map(o => (
      <MenuItem key={o} value={o}>
        {o}
      </MenuItem>
      ))}
      </TextField>
    </Box>
  );
};

export default Healthcheck;



