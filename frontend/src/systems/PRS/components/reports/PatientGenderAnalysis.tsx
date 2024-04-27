import { useEffect, useState } from "react";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import axios from "axios";
import { Gauge, gaugeClasses } from "@mui/x-charts";

interface Gender {
  id: number;
  value: number;
  label: string;
}

const settings = {
  width: 200,
  height: 200,
};

interface Count {
  count: number;
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

  // set the total patient count
  const [totalPatientCount, setTotalPatientCount] = useState<any>();

  // getting the data from the backend
  async function getGenderCount() {
    await axios.get("/api/prss/gender-count").then((res) => {
      const result = { ...res.data };

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

  // get the new registrated patients count
  async function getTheTotalPatientCount() {
    await axios.get("/api/prss/get-patient-stat").then((res) => {
      setTotalPatientCount({ ...res.data });
    });
  }

  useEffect(() => {
    getGenderCount();
    getTheTotalPatientCount();
  }, []);

  const data = [{ ...maleCount }, { ...femaleCount }];

  return (
    <Box>
      <Typography variant='h6' sx={{ alignSelf: "left" }} gutterBottom>
        Patient Registration Sub System
      </Typography>
      <Divider />
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
          <Typography variant='h6' sx={{ alignSelf: "left" }} gutterBottom>
            Pie chart: Total patient count analysis between genders
          </Typography>
        </Stack>

        <Stack direction='column' alignItems='center'>
          <Gauge
            {...settings}
            value={totalPatientCount?.todayCount}
            valueMax={totalPatientCount?.totalCount}
            startAngle={-120}
            endAngle={120}
            cornerRadius='50%'
            sx={(theme) => ({
              [`& .${gaugeClasses.valueText}`]: {
                fontSize: 30,
                fontFamily: theme.typography.fontFamily,
                transform: "translate(0px, 0px)",
              },
              [`& .${gaugeClasses.valueArc}`]: {
                fill: "#52b202",
              },
              [`& .${gaugeClasses.referenceArc}`]: {
                fill: theme.palette.text.disabled,
              },
            })}
            text={({ value, valueMax }) => `${value} / ${valueMax}`}
          />
          <Typography variant='h6' sx={{ alignSelf: "left" }} gutterBottom>
            Line chart: Recent registrated patient precentage
          </Typography>
        </Stack>
      </Stack>
    </Box>
  );
}

export default PatientGenderAnalysis;
