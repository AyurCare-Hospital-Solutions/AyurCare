import { Box, Paper, Typography } from "@mui/material";
import LeaveRequestByType from "./reports/leaveManagment/LeaveRequestByType";
import ReportGenerator from "../../../components/ReportGenerator";
import LeaveRequestByStatus from "./reports/leaveManagment/LeaveRequestByStatus";

const Reports = () => {
  return (
    <>
      <Box sx={{ display: "flex", mx: "auto", m: 4 }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Reports
          </Typography>
          <Typography variant="body2" sx={{}}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
        </Box>
      </Box>

      <ReportGenerator title="" filename="Leave_Request_Report" visible>
        <Paper>
          <Typography variant="h5" sx={{ ml: 4, textAlign: "center", pt: 4 }}>
            Leave Request Report
          </Typography>

          <Box sx={{ m: 4 }}>
            <LeaveRequestByType />
            <LeaveRequestByStatus />
          </Box>
        </Paper>
      </ReportGenerator>
    </>
  );
};

export default Reports;
