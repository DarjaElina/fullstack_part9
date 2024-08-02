import { Entry, Diagnosis } from "../../types";
import { useDiagnosis } from "../../hooks/useDiagnosis";

import { Box } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesOutlinedIcon from '@mui/icons-material/MedicalServicesOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import LocalHospitalOutlinedIcon from '@mui/icons-material/LocalHospitalOutlined';


interface PatientEntryType {
  entry: Entry;
}

const renderBasicEntry = (entry: Entry, diagnoses: Diagnosis[]) => {
  return (
    <div>
        <p>{entry.date}</p>
        <p><i>{entry.description}</i></p>
        {diagnoses.map(d => (
          entry.diagnosisCodes?.map(c => (
            d.code === c ? <li key={d.code}>{d.code} {d.name}</li> : null
          ))
        ))}
        <p>Diagnose by <b>{entry.specialist}</b></p>
    </div>
  );
};
 

const PatientEntry = (props: PatientEntryType) => {
  const entry = props.entry;
  const { diagnoses } = useDiagnosis();

  switch (entry.type) {
    case 'HealthCheck':
      return (
        <Box sx={{ mb: 1, p: 1, border: '1px solid grey' }}>
          {renderBasicEntry(entry, diagnoses)}
          <MedicalServicesOutlinedIcon/>
          <FavoriteIcon style={{
            color: entry.healthCheckRating === 0 ? 'green'
            : entry.healthCheckRating === 1 ? '#FFD700'
            :  entry.healthCheckRating === 2 ? '#FF8C00'
            : 'red'
          }}/>
        </Box>
      );
    case 'Hospital':
      return (
        <Box sx={{ mb: 1, p: 1, border: '1px solid grey' }}>
          {renderBasicEntry(entry, diagnoses)}
          <LocalHospitalOutlinedIcon/>
          <p>Discharge on the {entry.discharge.date} on the criteria: {entry.discharge.criteria}</p>
        </Box>
      );
    case 'OccupationalHealthcare':
      return (
        <Box sx={{ mb: 1, p: 1, border: '1px solid grey' }}>
          {renderBasicEntry(entry, diagnoses)}
          <WorkOutlineOutlinedIcon/>
          <p>Employer: {entry.employerName}</p>
          {entry.sickLeave && <p>Sick Leave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>}
        </Box>
      );
    default: {
      throw new Error('Unhandled entry type' + entry.type);
    }
  }
};


export default PatientEntry;