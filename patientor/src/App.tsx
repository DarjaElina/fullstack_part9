import { useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';

import { apiBaseUrl } from "./constants";
import { Patient } from "./types";

import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";
import PatientInfo from "./components/PatientInfo";

import { DiagnosisProvider } from "./context/DiagnosisProvider";
import { EntryFormProvider } from "./context/EntryFormProvider";

import { useQuery } from '@tanstack/react-query';

const App = () => {

  const { data, isLoading, error } = useQuery<Patient[]>({
    queryKey: ['patients'],
    queryFn: patientService.getAll
  });

  useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);
  }, []);

  if (isLoading) {
    return <Typography mt={2}>Loading patients data...</Typography>;
  }

  const patients = data;

  if (error || !patients) {
    return <Typography mt={2}>Error loading patients data.</Typography>;
  }


  
  return (
    <div className="App">
      <EntryFormProvider>
        <DiagnosisProvider>
          <Router>
            <Container>
              <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
                Patientor
              </Typography>
              <Button component={Link} to="/" variant="contained" color="primary">
                Home
              </Button>
              <Divider hidden />
              <Routes>
                <Route path="/" element={<PatientListPage patients={patients} />} />
                <Route path="/patients/:id" element={<PatientInfo />}/>
              </Routes>
            </Container>
          </Router>
        </DiagnosisProvider>
      </EntryFormProvider>
    </div>
  );
};

export default App;
