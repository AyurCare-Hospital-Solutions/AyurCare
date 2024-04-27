import React, { useEffect, useState } from "react";
import { Box, Container, Divider, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import {
  LineChart,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";
import axios from "axios";
import { set } from "react-hook-form";

interface Gender {
  id: number;
  value: number;
  label: string;
}

function PatientGenderAnalysis() {
  // set male the data to the state
  const [maleCount, setMaleCount] = useState<Gender>({
    id: 0,
    value: 0,
    label: "",
  });

  // set female count for the state
  const [femaleCount, setFemaleCount] = useState<Gender>({
    id: 0,
    value: 0,
    label: "",
  });

  // getting the data from the backend
  async function getGenderCount() {
    await axios.get("/api/prss/gender-count").then((res) => {
      const result = { ...res.data };
      // console.log(result);
      // console.log(result.malePatientCount);
      // console.log(result.femalePatientCount);

      // set data
      setMaleCount({
        id: 0,
        value: result.malePatientCount,
        label: "Male",
      });
      setFemaleCount({
        id: 1,
        value: result.femalePatientCount,
        label: "female",
      });
    });
  }

  useEffect(() => {
    getGenderCount();
  }, []);

  const data = [{ ...maleCount }, { ...femaleCount }];

  return (
    <Box>
      <Typography variant='h6' sx={{ alignSelf: "left" }} gutterBottom>
        Patient Registration Sub System
      </Typography>
      <Divider />
      <Stack direction='row' alignItems='center' spacing={2}>
        <PieChart
          series={[
            {
              data,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: {
                innerRadius: 30,
                additionalRadius: -30,
                color: "gray",
              },
            },
          ]}
          height={200}
        />
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
            },
          ]}
          sx={{
            [`& .${lineElementClasses.root}`]: {
              stroke: "#8884d8",
              strokeWidth: 2,
            },
            [`& .${markElementClasses.root}`]: {
              stroke: "#8884d8",
              scale: "0.6",
              fill: "#fff",
              strokeWidth: 2,
            },
          }}
          width={1000}
          height={400}
        />
      </Stack>
    </Box>
  );
}

export default PatientGenderAnalysis;
