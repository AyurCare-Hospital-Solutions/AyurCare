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
} from "@mui/material";
import { useParams } from "react-router-dom";

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
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/api/opcms/patients/${id}`)
      .then((res) => {
        setPatient(res.data);
      })
      .catch((err) => console.error(err));

    axios
      .get(`/api/opcms/patients/${id}/prescriptions`)
      .then((res) => {
        setPrescriptions(res.data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!patient) return null;

  return (
    <div>
      <Typography variant="h4">{patient && patient.name}</Typography>
      <Typography variant="body1">Age: {calculateAge(patient.dob)}</Typography>
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
                    <Button>Edit</Button>
                    <Button>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

function calculateAge(dob: string | number | Date) {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // If the birth month is greater than the current month
  // or if both months are the same but the birth day is greater than the current day,
  // decrease the age by 1
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return age;
}

export default PatientProfile;
