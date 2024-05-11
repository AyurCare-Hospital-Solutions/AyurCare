import React, { useEffect, useState } from "react";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import {
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";

interface Prescription {
  id: number;
  diagnosis: string;
  note: string;
}

interface PatientDataSeeMoreProps {
  open: boolean;
  handleClose: () => void;
  initialData: any; // Pass initial prescription data as prop
  getPatientPrescription: () => void;
}

const PatientDataSeeMore: React.FC<PatientDataSeeMoreProps> = ({
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
      enqueueSnackbar("Prescription edited successfully", { variant: "success" });
    } catch (error) {
      console.error("Error editing prescription:", error);
      enqueueSnackbar("Failed to edit prescription", { variant: "error" });
    }
  };

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={open} 
      onClose={handleClose}>
      <DialogTitle fontSize={36}>Medical Report</DialogTitle>
      <DialogContent>
        <Typography variant="subtitle1">Patient Name:  </Typography>
        <Typography variant="subtitle1" style={{ fontStyle: 'italic', color: 'gray', fontSize: 'small' }} sx={{pb:2}}>Patient ID : {}</Typography>
        <Typography variant="subtitle1" sx={{pb:2}}>Created At: </Typography>
        <Typography variant="subtitle1">Diagnosis</Typography>
        <TextField
          value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)}
          variant="outlined"
          fullWidth
          disabled
        />
        <Typography variant="subtitle1">Note</Typography>
        <TextField
          value={note}
          onChange={(e) => setNote(e.target.value)}
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          disabled
        />
      </DialogContent>
    </Dialog>
  );
};

export default PatientDataSeeMore;
