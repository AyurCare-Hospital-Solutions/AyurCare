import { Box, Typography } from "@mui/material";
import RosterManagementTable from "./rosterManagement/RosterManagementTable";

const Shifts = () => {
  return (
    <>
      <Box sx={{ display: "flex", mx: 4, mb: 4 }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            My Shifts
          </Typography>
          <Typography variant="body2" sx={{}}>
            View all the shifts assigned to you by the HR administrator.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ m: 4 }}>
        <RosterManagementTable />
      </Box>
    </>
  );
};

export default Shifts;
