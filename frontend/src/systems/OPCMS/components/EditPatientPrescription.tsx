import React, { useEffect, useState } from "react";
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

interface Prescription {
  id: number;
  diagnosis: string;
  note: string;
}

interface EditPrescriptionFormProps {
  open: boolean;
  handleClose: () => void;
  initialData: any; // Pass initial prescription data as prop
  getPatientPrescription: () => void;
}

const EditPrescriptionForm: React.FC<EditPrescriptionFormProps> = ({
  open,
  handleClose,
  initialData,
  getPatientPrescription,
}) => {
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    setDiagnosis(initialData?.diagnosis ?? "");
    setNote(initialData?.note ?? "");
  }, [open]);

  const handleEdit = async () => {
    try {
      await axios.put(`/api/opcms/patients/${initialData?.id}/prescriptions`, {
        diagnosis,
        note,
      });
      handleClose();
      getPatientPrescription();
    } catch (error) {
      console.error("Error editing prescription:", error);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Prescription</DialogTitle>
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
        <Button onClick={handleEdit}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditPrescriptionForm;
