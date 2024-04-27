import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import React from "react";
import PatientGenderAnalysis from "./components/reports/PatientGenderAnalysis";

export default function ReportGen() {
  return (
    <div>
      <Stack spacing={2}>
        <Typography variant='h4' sx={{ alignSelf: "center" }}>
          Analysis Reports of PRSS
        </Typography>
        <Typography variant='h6' sx={{ alignSelf: "center" }}>
          (Patient Registration System & Appointment Scheduling Sub System)
        </Typography>
        <PatientGenderAnalysis />
      </Stack>
    </div>
  );
}
