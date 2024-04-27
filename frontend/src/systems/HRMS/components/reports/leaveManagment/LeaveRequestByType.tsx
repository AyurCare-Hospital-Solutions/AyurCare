import { useEffect, useState } from "react";
import axios from "axios";
import { BarChart, PieChart } from "@mui/x-charts";
import ReportGenerator from "../../../../../components/ReportGenerator";
import { Box, Typography } from "@mui/material";

const LeaveReuqestByType = () => {
  const [typeCount, setTypeCount] = useState([]);

  useEffect(() => {
    getReportData();
  }, []);

  const getReportData = async () => {
    try {
      const response = await axios.get("/api/hrms/reports");

      setTypeCount(response.data.leaveCountById);
    } catch (error) {
      console.error("Error fetching leave requests:", error);
    }
  };

  return (
    <>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Leave Request Amount by Leave Type
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
                data: typeCount,
              },
            ]}
          />
        </Box>
        <Box sx={{ width: "50%", height: "45vh", m: 2 }}>
          <BarChart
            colors={["#FF9515"]}
            xAxis={[
              {
                scaleType: "band",
                dataKey: "label",
                label: "Measurement unit",
              },
            ]}
            yAxis={[{ label: "Count" }]}
            dataset={typeCount}
            series={[{ dataKey: "value", label: "Unit Leave Type" }]}
          />
        </Box>
      </Box>
    </>
  );
};

export default LeaveReuqestByType;
