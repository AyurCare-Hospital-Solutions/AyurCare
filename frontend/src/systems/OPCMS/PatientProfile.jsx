import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const PatientProfile = ({ patientId }) => {
  const [patient, setPatient] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    axios.get(`/api/patients/${patientId}`)
      .then(res => {
        setPatient(res.data);
      })
      .catch(err => console.error(err));

    axios.get(`/api/patients/${patientId}/prescriptions`)
      .then(res => {
        setPrescriptions(res.data);
      })
      .catch(err => console.error(err));
  }, [patientId]);

  if (!patient) return null;

  return (
    <div>
      <Typography variant="h4">{patient.name}</Typography>
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
            {prescriptions.map(prescription => (
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

function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
  
    // If the birth month is greater than the current month
    // or if both months are the same but the birth day is greater than the current day,
    // decrease the age by 1
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
  
    return age;
}

export default PatientProfile;
