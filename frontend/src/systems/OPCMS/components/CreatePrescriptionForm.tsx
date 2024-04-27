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
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Create Prescription</DialogTitle>
      <Typography>Patient ID : {PatientId}</Typography>
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
