import { useParams } from "react-router-dom";

import patientService from "../../services/patients";
import PatientEntries from "../PatientEntries";

import NewEntryForm from "../NewEntryForm";

import { Patient, Gender } from "../../types";

import { Box, Typography } from "@mui/material";

import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';


import { useQuery } from "@tanstack/react-query";

type UserParams = {
  id: string;
};

const GenderIcon = ({ gender }: { gender: Gender }) => {
  switch (gender) {
    case Gender.Female:
      return <FemaleIcon fontSize="large" />;
    case Gender.Male:
      return <MaleIcon fontSize="large" />;
    case Gender.Other:
      return <TransgenderIcon fontSize="large" />;
    default:
      return null;
  }
};



const PatientInfo = () => {
  const  { id } = useParams<UserParams>();

  if (!id) {
    throw new Error("ID parameter is missing");
  }

  const { data, isLoading, error } = useQuery<Patient>({
    queryKey: ['patient'],
    queryFn: () => patientService.getSinglePatient(id)
  });

  if (isLoading) {
    return <Typography mt={2}>Loading patient data...</Typography>;
  }

  if (error) {
    return <Typography mt={2}>Error loading patient data.</Typography>;
  }

  const patient = data;

  if (!patient) {
    return <Typography mt={2}>Patient information not found</Typography>;
  }

  return (
    <>
      <Box mb={2}>
        <Typography variant="h5" mt={2} mb={2}>
          {patient.name}
          <GenderIcon gender={patient.gender}/>
        </Typography>
        <Typography variant="subtitle1">
          ssn: {patient.ssn}
        </Typography>
        <Typography variant="subtitle1">
          occupation: {patient.occupation}
        </Typography>
      </Box>
      <Box>
        <NewEntryForm id={id}/>
      </Box>
      <Box>
        <PatientEntries entries={patient.entries}/>
      </Box>
    </>
  );
};

export default PatientInfo;