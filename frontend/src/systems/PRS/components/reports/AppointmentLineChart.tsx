import { LineChart } from "@mui/x-charts/LineChart";
import { Typography } from "@mui/material";
import dayjs from "dayjs";

function AppointmentLineChart({ appointments }: { appointments?: any }) {
  // get the details from the prop
  const { todayAppointments } = appointments || { todayAppointments: [] };

  // map the data to the format that the chart component expects
  const appointmentData = todayAppointments.map((appointment: any) => ({
    appointmentDate: dayjs(appointment.appointmentDate),
    appointmentCount: parseInt(appointment.appointmentCount),
  }));

  const dates = appointmentData.map((row: any) => row.appointmentDate);
  const counts = appointmentData.map((row: any) => row.appointmentCount);

  console.log(
    appointmentData.map((row: any) => row.appointmentDate.toLocaleString())
  );
  console.log(appointmentData.map((row: any) => row.appointmentCount));

  return (
    <div>
      <LineChart
        xAxis={[
          {
            data: dates,
          },
        ]}
        series={[
          {
            data: counts,
            area: true,
          },
        ]}
        width={500}
        height={300}
      />
      <Typography
        variant='h6'
        sx={{ alignSelf: "left" }}
        gutterBottom
        align='center'
      >
        Line Chart: Analysis of Appointments (<i>per each day</i>)
      </Typography>
    </div>
  );
}

export default AppointmentLineChart;
