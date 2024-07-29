import express from 'express';
import diagnoseService from '../services/diagnoseService';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnoseService.getDiagnoses());
});

router.post('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

export default router;