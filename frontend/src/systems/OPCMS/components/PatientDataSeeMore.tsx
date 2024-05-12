import React, { useEffect, useState } from "react";
import axios from "axios";
//import { enqueueSnackbar } from "notistack";
import {
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import dayjs from "dayjs";
import ReportGenerator from "../../../components/ReportGenerator";

// interface Prescription {
//   id: number;
//   diagnosis: string;
//   note: string;
// }

interface PatientDataSeeMoreProps {
  open: boolean;
  handleClose: () => void;
  initialData: any; // Pass initial prescription data as prop
}

const PatientDataSeeMore: React.FC<PatientDataSeeMoreProps> = ({
  open,
  handleClose,
  initialData,
}) => {

  const [diagnosis, setDiagnosis] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [prescriptionData, setPrescriptionData] = useState<any>();

  // useEffect(() => {
  //   //setDiagnosis(initialData?.diagnosis ?? "");
  //   setNote(initialData?.note ?? "");

  // }, [open]);

  useEffect(() => {
    console.log("hello");
    initialData && getPrescriptionData(initialData);
    console.log(initialData);

  }, [open]);


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

  return (
    <Dialog
      fullWidth={true}
      maxWidth="sm"
      open={open}
      onClose={handleClose}>
      <DialogTitle fontSize={36}>Medical Report</DialogTitle>
      <DialogContent>
        <ReportGenerator filename={"MedicalReport.pdf"} title={"Medical Report"} titleHidden visible>
          <Typography variant="subtitle1" style={{ fontStyle: 'italic', color: 'gray', fontSize: 'small' }} sx={{ pb: 2 }}>Patient ID : {prescriptionData?.PatientId}</Typography>
          <Typography variant="subtitle1">Patient Name: {prescriptionData?.Patient?.name} </Typography>
          <Typography variant="subtitle1" sx={{ pb: 2 }}>Created At: {dayjs(prescriptionData?.createdAt).format('YYYY-MM-DD')} </Typography>
          <Typography variant="subtitle1">Diagnosis</Typography>
          <TextField
            value={prescriptionData?.diagnosis}
            variant="outlined"

            fullWidth
            disabled
          />
          <Typography variant="subtitle1">Note</Typography>
          <TextField
            value={prescriptionData?.note}
            variant="outlined"
            fullWidth
            multiline
            rows={4}
            disabled
          />
        </ReportGenerator>
      </DialogContent>
    </Dialog>
  );
};

export default PatientDataSeeMore;
