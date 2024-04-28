import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";

interface Appointment {
  id: number;
  Patient: {
    id: number;
    name: string;
  };
  status: string;
}

const AppointmentsTable: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const navigate = useNavigate(); // Get the history object from useHistory hook

  useEffect(() => {
    axios
      .get<Appointment[]>("/api/opcms/opdAppointments")
      .then((res) => {
        console.log(res.data);
        setAppointments(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
    <Typography sx={{mb:2}} variant="h4">Appointments</Typography>
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
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>{appointment.Patient.name}</TableCell>
              <TableCell>{appointment.status}</TableCell>
              <TableCell>
                <Button variant="outlined"
                  onClick={() =>
                    navigate(
                      `./profile/${appointment.Patient.id}/prescriptions/${appointment.id}`
                    )
                  }
                >
                  View Profile
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
};

export default AppointmentsTable;
