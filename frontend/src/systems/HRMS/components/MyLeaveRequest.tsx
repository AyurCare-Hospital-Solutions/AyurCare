import { Box, Typography } from "@mui/material";
import MyLeaveRequestTable from "./myLeaveRequest/MyLeaveRequestTable";
import MyLeaveRequestDialog from "./myLeaveRequest/MyLeaveRequestDialog";

const MyLeaveRequest = () => {
  return (
    <div>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom>
          My Leave
        </Typography>
        <Typography variant="body2" sx={{}}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        </Typography>
        <MyLeaveRequestDialog />
      </Box>
      <MyLeaveRequestTable />
    </div>
  );
};

export default MyLeaveRequest;
