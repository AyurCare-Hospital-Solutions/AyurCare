import { Box, Divider, Typography } from "@mui/material";
import ReportGenerator from "../../../../components/ReportGenerator";

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
        <Typography variant='h6' sx={{ alignSelf: "left" }} gutterBottom>
          Appointment Reports yet to be implemented
        </Typography>
      </ReportGenerator>
    </Box>
  );
}
