import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const AppointmentsTable = ({ onProfileClick }) => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('/api/opdAppointments')
      .then(res => {
        setAppointments(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Patient Name</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {appointments.map(appointment => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.patient.name}</TableCell>
              <TableCell>{appointment.status}</TableCell>
              <TableCell>
                <Button onClick={() => onProfileClick(appointment.patient.id)}>View Profile</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AppointmentsTable;
