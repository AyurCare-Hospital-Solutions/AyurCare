import { useState, useEffect } from "react";
import axios from "axios";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
} from "@mui/material";
import { useParams } from "react-router-dom";
import CreatePrescriptionForm from "./CreatePrescriptionForm";
import EditPatientPrescription from "./EditPatientPrescription";
import { enqueueSnackbar } from "notistack";

interface Patient {
  id: number;
  name: string;
  dob: string;
}

interface Prescription {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  id: number;
  diagnosis: string;
  note: string;
  dispensed_date: string;
  status: string;
}

const PatientProfile = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [prescriptions, setPrescriptions] = useState<Prescription | null>(null);
  const { id, appId } = useParams();


  // Get Patient Prescription
  const getPatientPrescription = () => {
    axios
      .get(`api/opcms/patientPrescriptions/${id}`)
      .then((res) => {
        console.log(res.data);
        setPrescriptions(res.data.prescription);
        setPatient(res.data.patient);
      })
      .catch((err) => {
        console.error(err)
        enqueueSnackbar("Failed to fetch patient prescription", { variant: "error"});
  })};

  useEffect(() => {
    getPatientPrescription();
  }, []);


  // Add prescription modal
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // Delete Patient Prescription
  const deletePatientPrescription = async (pressId: number) => {
    try {
      await axios.delete(`api/opcms/prescriptions/${pressId}`);
      getPatientPrescription();
      enqueueSnackbar("Prescription deleted successfully", { variant: "success" });
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Failed to delete Prescription", { variant: "error" });
    }
  };


  // Edit Patient Prescription
  const [initialPresData, setInitialPresData] = useState<Prescription | null>(
    null
  );

  const [editOpen, setEditOpen] = useState(false);

  const editHandleClickOpen = () => {
    setEditOpen(true);
  };

  const editHandleClose = () => {
    setEditOpen(false);
  };

  return (
    <div>
      <Box sx={{mb:3}}>
        <Typography variant="h4">{patient?.name}</Typography>
        <Box sx={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <Typography variant="h6">Patient ID: {id}</Typography> 
          <Button variant="contained" onClick={handleClickOpen}>Add Prescription</Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Diagnosis</TableCell>
              <TableCell>Note</TableCell>
              <TableCell>Dispensed Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prescriptions &&
              prescriptions.map((prescription: Prescription) => (
                <TableRow key={prescription.id}>
                  <TableCell>{prescription.diagnosis}</TableCell>
                  <TableCell>{prescription.note}</TableCell>
                  <TableCell>{prescription.dispensed_date}</TableCell>
                  <TableCell>{prescription.status}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setInitialPresData(prescription);
                        editHandleClickOpen();
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        deletePatientPrescription(prescription.id);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CreatePrescriptionForm
        open={open}
        handleClose={handleClose}
        PatientId={id}
        OPDAppointmentId={appId}
        getPatientPrescription={getPatientPrescription} initialData={undefined}      />
      <EditPatientPrescription
        open={editOpen}
        handleClose={editHandleClose}
        initialData={initialPresData}
        getPatientPrescription={getPatientPrescription}
      />
    </div>
  );
};

export default PatientProfile;
