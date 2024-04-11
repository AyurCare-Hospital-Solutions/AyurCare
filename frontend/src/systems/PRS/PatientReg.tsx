import RegForm from "./components/PatientReg/PatientRegForm";
import RecentPatient from "./components/PatientReg/MostRecentPatient";
import PatientTable from "./components/PatientReg/PatientTable";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Box from "@mui/material/Box";

export default function PatientReg() {
  return (
    <Grid container spacing={2} columns={16}>
      <Grid height='auto' xs={10}>
        <Box height='auto' boxShadow={5} padding={2} borderRadius={2}>
          <RegForm />
        </Box>
      </Grid>
      <Grid xs={6}>
        <Box boxShadow={5} padding={2} borderRadius={2}>
          <RecentPatient />
        </Box>
      </Grid>
      <Grid height='auto' xs={6}>
        <Box height='auto' boxShadow={5} padding={2} borderRadius={2}>
          total Patient count
        </Box>
      </Grid>
      <Grid xs={10}>
        <Box boxShadow={5} padding={2} borderRadius={2}>
          <PatientTable />
        </Box>
      </Grid>
    </Grid>
  );
}
