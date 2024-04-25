import AppointmentTable from "./components/appoinment/AppointmentTable";
import PendingAppointment from "./components/appoinment/PendingAppointment";
import TodayAppointmentCount from "./components/appoinment/TodayAppointmentCount";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Box from "@mui/material/Box";

export default function Appointment() {
  return (
    <div>
      <Grid container spacing={2} columns={16}>
        <Grid height='auto' xs={10}>
          <Box height='auto' boxShadow={5} padding={2} borderRadius={2}>
            <AppointmentTable />
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
