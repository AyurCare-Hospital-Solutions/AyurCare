import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

interface Props {
  open: boolean;
  handleClose: () => void;
  PatientId: any;
  OPDAppointmentId: any;
  getPatientPrescription: () => any;
}

const CreatePrescriptionForm: React.FC<Props> = ({
  open,
  handleClose,
  PatientId,
  OPDAppointmentId,
  getPatientPrescription,
}) => {
  const [diagnosis, setDiagnosis] = useState<string | null>("");
  const [note, setNote] = useState<string | null>("");

  const handleSubmit = async () => {
    try {
      await axios.post(`/api/opcms/patients/${PatientId}/prescriptions`, {
        diagnosis,
        note,
        OPDAppointmentId,
        PatientId,
        
      });
      handleClose();
      setDiagnosis(null);
      setNote(null);
      getPatientPrescription();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        fullWidth={true}
        maxWidth="sm"
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add Prescription</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">Patient Name: {}</Typography>
          <Typography variant="subtitle1" style={{ fontStyle: 'italic', color: 'gray', fontSize: 'small' }}>Patient ID : {PatientId}</Typography>
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
            multiline
            rows={4}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CreatePrescriptionForm;
