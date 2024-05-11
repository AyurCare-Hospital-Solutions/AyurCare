import { Box, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts";
import axios from "axios";
import { useEffect, useState } from "react";
import AppointmentLineChart from "../reports/AppointmentLineChart";

function statusPieChart() {
  const [requestData, setRequestData] = useState<any>();
  const [pendingCount, setPendingCount] = useState<number>(0);
  const [completedCount, setCompletedCount] = useState<number>(0);
  const [appointmentsForDay, setAppointmentsForDay] = useState<any>();

  const getappointmentData = async () => {
    try {
      const response = await axios
        .get("/api/prss/appointmentsData")
        .then((res) => {
          const result = { ...res.data };
          setPendingCount(result.pendingCount);
          setCompletedCount(result.completedCount);
        });
    } catch (e) {
      console.log(e);
    }
  };

  const getAppointmentsforDay = async () => {
    try {
      // getting response from the backend
      const res = await axios.get("/api/prss/dailyAppointmentCount");
      const data = res.data;
      setAppointmentsForDay(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getappointmentData();
    getAppointmentsforDay();
  }, []);

  const data = [
    {
      id: 0,
      value: pendingCount ? pendingCount : 0,
      label: "Pending",
      color: "#FF0000",
    },
    {
      id: 2,
      value: completedCount ? completedCount : 0,
      label: "Complted",
      color: "#008000",
    },
  ];

  return (
    <Box>
      <Stack
        direction='row'
        alignItems='center'
        spacing={2}
        justifyContent='space-evenly'
        p={4}
      >
        <Stack direction='column' alignItems='center' gap={3}>
          <PieChart
            series={[
              {
                highlightScope: { faded: "global", highlighted: "item" },
                faded: {
                  innerRadius: 30,
                  additionalRadius: -30,
                  color: "gray",
                },
                data,
              },
            ]}
            height={200}
          />
          <Typography
            variant='h6'
            sx={{ alignSelf: "left" }}
            gutterBottom
            align='center'
          >
            Pie Chart: Analysis Status of Appointments
          </Typography>
        </Stack>

        <Stack direction='column' alignItems='center'>
          <AppointmentLineChart appointments={appointmentsForDay} />
        </Stack>
      </Stack>
    </Box>
  );
}

export default statusPieChart;
