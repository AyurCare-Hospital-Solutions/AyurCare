import React, { useState } from 'react';
import axios from 'axios';
import { Typography, TextField, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

const CreatePrescriptionForm = ({ open, handleClose }) => {
  const [diagnosis, setDiagnosis] = useState('');
  const [note, setNote] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post('/api/prescriptions', { diagnosis, note });
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Prescription</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">Diagnosis</Typography>
        <TextField
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          variant="outlined"
          fullWidth
        />
        <Typography variant="subtitle1">Note</Typography>
        <TextField
          value={note}
          onChange={(e) => setNote(e.target.value)}
          variant="outlined"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Create</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePrescriptionForm;
