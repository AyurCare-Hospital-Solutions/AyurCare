import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Box from "@mui/material/Box";
import PatientTable from "./PatientTable";
import { Stack, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Link } from "react-router-dom";

function PatientAdminPg() {
  return (
    <div>
      <Stack spacing={2} direction='row' alignSelf={"center"} mb={2}>
        <Link to='/prs/patients'>
          <Button variant='contained' endIcon={<SendIcon />}>
            Add a New Patient
          </Button>
        </Link>
      </Stack>
      <Grid xs={16}>
        <Box boxShadow={5} padding={2} borderRadius={2}>
          <PatientTable />
        </Box>
      </Grid>
    </div>
  );
}

export default PatientAdminPg;
