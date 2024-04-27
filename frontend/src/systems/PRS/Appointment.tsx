import AppointmentTable from "./components/appoinment/AppointmentTable";
import PendingAppointment from "./components/appoinment/PendingAppointment";
import TodayAppointmentCount from "./components/appoinment/TodayAppointmentCount";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Box from "@mui/material/Box";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Appointment() {
  // state for the patients
  const [patientDetails, setPatientDetails] = useState<any>();

  // state for the appointments
  const [appointment, setAppointments] = useState<any>();

  // getting the pateint details from the backend
  // async function getPatients() {
  //   const response = await axios.get("/api/prss/get-patients");
  //   setPatientDetails(response.data);
  // }

  // geting the appointment details
  async function getAppointments() {
    await axios.get("/api/prss/get-appointments").then((response) => {
      setAppointments(response.data);
    });
  }

  // getting the patient details
  useEffect(() => {
    // getPatients();
    getAppointments();
  }, []);

  // console.log(appointment);

  return (
    <div>
      <Grid container spacing={2} columns={16}>
        <Grid xs={10}>
          <Box height='auto' boxShadow={5} padding={2} borderRadius={2}>
            <AppointmentTable appointments={appointment} />
          </Box>
        </Grid>
        <Grid xs={6}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            <Box boxShadow={5} padding={2} borderRadius={2}>
              <PendingAppointment />
            </Box>
            <Box height='auto' boxShadow={5} padding={2} borderRadius={2}>
              <TodayAppointmentCount />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
