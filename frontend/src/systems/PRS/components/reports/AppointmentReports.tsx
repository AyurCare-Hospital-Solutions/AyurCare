import { Box, Divider, Typography } from "@mui/material";
import ReportGenerator from "../../../../components/ReportGenerator";
import StatusPieChart from "./statusRep";

export default function AppointmentReports() {
  return (
    <Box>
      <Typography variant='h6' sx={{ alignSelf: "left" }} gutterBottom>
        Appointment Scheduling Sub System
      </Typography>
      <Divider />
      <ReportGenerator
        title='Appointment Scheduling Analysis'
        filename='AppointmentAnalisys.pdf'
        visible
      >
        <StatusPieChart />
      </ReportGenerator>
    </Box>
  );
}
