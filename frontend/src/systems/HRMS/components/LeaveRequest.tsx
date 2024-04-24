// LeaveRequest.tsx

import React, { useState } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import LeaveRequestTable from "./leaveManagement/LeaveRequestTable";

const LeaveRequest: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  return (
    <div className="LeaveRequest">
      <Box sx={{ display: "flex", mx: 4, mb: 4 }}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Leave Request Management
          </Typography>
          <Typography variant="body2" sx={{}}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Typography>
        </Box>
      </Box>
      <Box sx={{ mx: 4 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Pending Requests" />
          <Tab label="Processed Leaves" />
          <Tab label="All Leave Requests" />
        </Tabs>
        {tabValue === 0 && (
          <Box sx={{ mt: 2 }}>
            <LeaveRequestTable
              leaveRequests={[]}
              onPageChange={() => {}}
              page={0}
              rowsPerPage={5}
              handleAccept={() => {}}
              handleReject={() => {}}
              pendingView={true}
            />
          </Box>
        )}
        {tabValue !== 0 && (
          <Box sx={{ mt: 2 }}>
            <LeaveRequestTable
              leaveRequests={[]}
              onPageChange={() => {}}
              page={0}
              rowsPerPage={5}
              handleAccept={() => {}}
              handleReject={() => {}}
              pendingView={false}
            />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default LeaveRequest;
