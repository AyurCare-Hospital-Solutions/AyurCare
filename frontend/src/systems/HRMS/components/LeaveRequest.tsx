import React, { useEffect, useState } from "react";
import { Box, Typography, Tabs, Tab } from "@mui/material";
import LeaveRequestTable from "./leaveManagement/LeaveRequestTable";
import axios from "axios";

const LeaveRequest: React.FC = () => {
  useEffect(() => {
    fetchAllLeaveRequests();
  }, []);

  const [rows, setRows] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const fetchAllLeaveRequests = async () => {
    try {
      const response = await axios.get("/api/hrms/leave");
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
        <Box sx={{ mt: 2 }}>
          <LeaveRequestTable
            leaveRequests={rows}
            onPageChange={handleChangePage}
            page={page}
            rowsPerPage={rowsPerPage}
            pendingView={tabValue === 0}
          />
        </Box>
      </Box>
    </div>
  );
};

export default LeaveRequest;
