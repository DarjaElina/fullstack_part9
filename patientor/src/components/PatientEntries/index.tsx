import PatientEntry from "../PatientEntry";
import { Entry } from "../../types";

import { Typography, Box } from "@mui/material";

interface PatientEntriesProps {
  entries: Entry[];
}

const PatientEntries = (props: PatientEntriesProps) => {
  const entries: Entry[] = props.entries;

  return (
    <Box>
      <Typography variant="h6">
        Entries:
      </Typography>
      <Box>
      {entries.map((entry) => (
        <PatientEntry key={entry.id} entry={entry}/>
      ))}
      </Box>
    </Box>
  );
};

export default PatientEntries;