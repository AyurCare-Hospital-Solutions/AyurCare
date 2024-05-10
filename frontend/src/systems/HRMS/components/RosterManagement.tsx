import RosterManagementTable from "./rosterManagement/RosterManagementTable";
import RosterCard from "./rosterManagement/RosterCard";
import { Box, Typography } from "@mui/material";

const RosterManagement = () => {
  return (
    <>
      <Box sx={{ display: "flex", mx: 4, mb: 4 }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Staff Duty Roster Management
          </Typography>
          <Typography variant="body2" sx={{}}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          mx: 4,
          display: "flex",
          height: "calc(100vh - 250px)",
        }}
      >
        <Box
          sx={{
            flex: "1",
            minWidth: "1024px",
            maxWidth: "1280px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <RosterManagementTable />
        </Box>
        <Box sx={{ flex: "1", maxHeight: "100%", p: 4 }}>
          <RosterCard
            key="1"
            id="2"
            date="2024-05-11"
            type="Night Shift"
            allocated={{
              doctor: 3,
              nurse: 3,
              others: 2,
            }}
            status="incomplete"
          />
        </Box>
      </Box>
    </>
  );
};

export default RosterManagement;
