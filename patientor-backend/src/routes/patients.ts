import express from 'express';
import patients from '../services/patients';
import { toNewPatient, toNewEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patients.getAllCensored());
});

router.post('/', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatient = toNewPatient(req.body);
    const addedPerson = patients.addNew(newPatient);
    res.send(addedPerson);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.get('/:id', (req, res) => {
  const pat = patients.get(req.params.id);
  if (pat) res.json(pat);
  else res.status(404).send(`Patient with id ${req.params.id} not found`);
});

router.post('/:id/entries', (req, res) => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newEntry = toNewEntry(req.body);
    const addedEntry = patients.addNewEntry(newEntry, req.params.id);
    res.send(addedEntry);
  } catch (error: unknown) {
    let errorMessage = 'Something went wrong when adding entry.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
