import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";

const Reports = () => {
  const [rows, setRows] = useState([]);

  const fetchAllLeaveRequests = async () => {
    try {
      const response = await axios.get("/api/hrms/leave");
      setRows(response.data);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

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
    </>
  );
};

export default Reports;
