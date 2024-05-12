import RegForm from "./components/PatientReg/PatientRegForm";
import RecentPatient from "./components/PatientReg/MostRecentPatient";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Box from "@mui/material/Box";
import TolPatientCount from "./components/PatientReg/TolPatientCount";

export default function PatientReg() {
  return (
    <Grid container spacing={2} columns={16}>
      <Grid height='auto' xs={10}>
        <Box height='auto' boxShadow={5} padding={2} borderRadius={2}>
          <RegForm />
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
            <RecentPatient />
          </Box>
          <Box height='auto' boxShadow={5} padding={2} borderRadius={2}>
            <TolPatientCount />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}
