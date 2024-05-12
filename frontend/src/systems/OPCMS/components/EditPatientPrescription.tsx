import React, { useEffect, useState } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import * as yup from "yup";
import {
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

interface EditPrescriptionFormProps {
  open: boolean;
  handleClose: () => void;
  initialData: any; // Pass initial prescription data as prop
  getPatientPrescription: () => void;
}

const schema = yup.object().shape({
  diagnosis: yup.string().required("Diagnosis is required"),
  note: yup.string().required("Note is required"),
});

const EditPrescriptionForm: React.FC<EditPrescriptionFormProps> = ({
  open,
  handleClose,
  initialData,
  getPatientPrescription,
}) => {
  const [diagnosis, setDiagnosis] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setDiagnosis(initialData?.diagnosis ?? "");
    setNote(initialData?.note ?? "");
  }, [open]);

  const handleEdit = async () => {
    try {
      await schema.validate({ diagnosis, note }, { abortEarly: false });
      await axios.put(`/api/opcms/patients/${initialData?.id}/prescriptions`, {
        diagnosis,
        note,
      });
      handleClose();
      getPatientPrescription();
      enqueueSnackbar("Prescription edited successfully", { variant: "success" });
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((e: any) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      } else {
        console.error("Error editing prescription:", error);
        enqueueSnackbar("Failed to edit prescription", { variant: "error" });
      }
    }
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={open} 
      onClose={handleClose}>
      <DialogTitle>Edit Prescription</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">Diagnosis</Typography>
        <TextField
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          variant="outlined"
          fullWidth
          error={!!errors.diagnosis}
          helperText={errors.diagnosis}
        />
        <Typography variant="subtitle1">Note</Typography>
        <TextField
          value={note}
          onChange={(e) => setNote(e.target.value)}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          error={!!errors.note}
          helperText={errors.note}
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
