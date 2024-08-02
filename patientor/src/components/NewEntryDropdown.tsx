import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";

const NewEntryDropdown = () => {
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Please select an entry type</InputLabel>
    <Select>
      <MenuItem value={10}>Hospital Entry</MenuItem>
      <MenuItem value={20}>Health Check Entry</MenuItem>
      <MenuItem value={30}>Occupational Healthcare Entry</MenuItem>
    </Select>
    </FormControl>
  );
};

export default NewEntryDropdown;