import React, { useEffect, useState } from "react";
import axios from "axios";
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

// Define Yup schema for form validation
const schema = yup.object().shape({
  diagnosis: yup.string().required("Diagnosis is required"),
  note: yup.string().required("Note is required"),
});

interface Props {
  open: boolean;
  handleClose: () => void;
  PatientId: any;
  OPDAppointmentId: any;
  getPatientPrescription: () => any;
  initialData: any;
}

const CreatePrescriptionForm: React.FC<Props> = ({
  open,
  handleClose,
  PatientId,
  OPDAppointmentId,
  getPatientPrescription,
  initialData
}) => {
  const [diagnosis, setDiagnosis] = useState<string | null>("");
  const [note, setNote] = useState<string | null>("");
  const [prescriptionData, setPrescriptionData] = useState<any>();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const getPrescriptionData = async (id: number) => {
    try {
      const res = await axios.get(`api/opcms/prescriptions/${id}`);
      console.log(res.data[0]);
      setPrescriptionData(res.data[0]);
    }
    catch (e) {
      console.error();
    }
  }

  useEffect(() => {
    console.log("hello");
    initialData && getPrescriptionData(initialData);
    console.log(initialData);

  }, [open]);


  const handleSubmit = async () => {
    try {
      await schema.validate({ diagnosis, note }, { abortEarly: false });
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
    } catch (error: any) {
      if (error.name === "ValidationError") {
        const validationErrors: { [key: string]: string } = {};
        error.inner.forEach((e: any) => {
          validationErrors[e.path] = e.message;
        });
        setErrors(validationErrors);
      } else {
        console.error(error);
      }
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
            handleSubmit();
          },
        }}
      >
        <DialogTitle>Add Prescription</DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1">Patient Name: {prescriptionData?.Patient?.name}</Typography>
          <Typography variant="subtitle1" style={{ fontStyle: 'italic', color: 'gray', fontSize: 'small' }}>Patient ID : {PatientId}</Typography>
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
          <Button variant="contained" onClick={handleSubmit}>Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default CreatePrescriptionForm;
