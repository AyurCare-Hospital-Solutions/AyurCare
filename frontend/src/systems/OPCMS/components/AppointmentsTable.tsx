import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

interface Appointment {
  id: number;
  patient: {
    id: number;
    name: string;
  };
  status: string;
}

interface Props {
  onProfileClick: (patientId: number) => void;
}

const AppointmentsTable: React.FC<Props> = ({ onProfileClick }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    axios.get<Appointment[]>('/api/opdAppointments')
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
