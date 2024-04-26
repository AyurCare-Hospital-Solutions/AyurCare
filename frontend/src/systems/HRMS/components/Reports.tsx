import { Box, Button, Typography } from "@mui/material";
import LeaveDistributionChart from "./reports/leaveManagment/LeaveDistributionChart";
import LeaveTrendsByTimeChart from "./reports/leaveManagment/LeaveTrendsByTimeChart";

const Reports = () => {
  return (
    <>
      <Box sx={{ display: "flex", maxWidth: "1024px", mx: "auto", mb: 4 }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Leave Types
          </Typography>
          <Typography variant="body2" sx={{}}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
        </Box>
      </Box>
      <LeaveDistributionChart />
      <LeaveTrendsByTimeChart />
    </>
  );
};

export default Reports;
