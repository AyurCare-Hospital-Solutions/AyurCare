import { Box, Typography } from "@mui/material";
import { BarChart, PieChart } from "@mui/x-charts";
import axios from "axios";
import { useEffect, useState } from "react";

const LeaveRequestByStatus = () => {
  const [leaveCount, setLeaveCount] = useState([]);

  useEffect(() => {
    getReportData();
  }, []);

  const getReportData = async () => {
    try {
      const response = await axios.get("/api/hrms/reports");
      setLeaveCount(response.data.leaveCountByStatus);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Leave Request Amount w.r.t. Status
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: "20px",
        }}
      >
        <Box
          sx={{
            width: "50%",
            height: "45vh",
          }}
        >
          <PieChart
            series={[
              {
                data: leaveCount,
              },
            ]}
          />
        </Box>
        <Box sx={{ width: "50%", height: "45vh", m: 2 }}>
          <BarChart
            colors={["#C9190B"]}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "label",
                label: "Leave Status Categories",
              },
            ]}
            yAxis={[{ label: "Leave Count" }]}
            dataset={leaveCount}
            series={[{ dataKey: "value", label: "Leave Status" }]}
          />
        </Box>
      </Box>
    </>
  );
};

export default LeaveRequestByStatus;
