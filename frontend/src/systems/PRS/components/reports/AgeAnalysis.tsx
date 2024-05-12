import {
  Box,
  Button,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import ReportGenerator from "../../../../components/ReportGenerator";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import parse from "html-react-parser";

function AgeAnalysis() {
  // get the age analysis data
  const [ageData, setAgeData] = useState<any>();
  const [ageGroups, setAgeGroups] = useState<any>();
  const [htmlContent, setHtmlContent] = useState<any>();

  // fetch the analytical data from the backend
  async function getAgeAnalysis() {
    try {
      const response = await axios.get("/api/prss/predictive-details");
      const data = response.data;
      setAgeData(data.ageData);
      setAgeGroups(data.ageGroups);
      setHtmlContent(data.htmlContent);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAgeAnalysis();
  }, []);

  console.log(ageData);
  console.log(ageGroups);
  console.log(htmlContent);

  // settine the rows
  const columns: GridColDef[] = [
    { field: "id", headerName: "Patient No", width: 150, align: "center" },
    { field: "name", headerName: "Name", width: 150, align: "center" },
    { field: "age", headerName: "Age", width: 150, align: "center" },
  ];

  const rows = (ageData ?? []).map((row: any, index = 1) => ({
    id: ++index,
    name: row.name,
    age: row.age,
  }));

  const children_count = ageGroups?.children.count;
  const adult_count = ageGroups?.adults.count;
  const senior_count = ageGroups?.seniors.count;

  const array_count = [children_count, adult_count, senior_count];

  // get the html content

  return (
    <div>
      <Typography variant='h6' sx={{ alignSelf: "left" }} gutterBottom>
        Predictive Analysis of Patient Age distribution
      </Typography>
      <Divider />
      <ReportGenerator
        title='Patient Data set Analysis'
        filename='AppointmentAnalisys.pdf'
        visible
      >
        <Box>
          <Stack
            direction='row'
            alignItems='center'
            spacing={2}
            justifyContent='space-evenly'
            p={4}
          >
            <Stack direction='column' alignItems='center' gap={3}>
              <DataGrid
                sx={{
                  marginTop: 2,
                  minHeight: "auto",
                  minWidth: 500,
                }}
                rows={rows}
                columns={columns}
                pagination
                getRowId={(row) => row.id}
                pageSizeOptions={[5, 10, 25]}
                initialState={{
                  pagination: { paginationModel: { pageSize: 10, page: 0 } },
                  columns: {
                    columnVisibilityModel: {
                      Aid: false,
                    },
                  },
                }}
              />
              <Typography
                variant='h6'
                sx={{ alignSelf: "left" }}
                gutterBottom
                align='center'
              >
                Data Grid: Analyze Patient Data details
              </Typography>
            </Stack>

            <Stack direction='column' alignItems='center'>
              <LineChart
                xAxis={[{ data: rows.map((row: any) => row.id) }]}
                series={[
                  {
                    data: rows.map((row: any) => row.age),
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
                Line Chart: Age distribution of Patients
              </Typography>
              <Typography
                variant='h6'
                sx={{ alignSelf: "left" }}
                gutterBottom
                align='center'
              >
                <i>Axises: x - Patient No / y - Age </i>
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Box>
          <Stack
            direction='row'
            alignItems='center'
            spacing={2}
            justifyContent='space-evenly'
            p={4}
          >
            <Stack direction='column' alignItems='center' gap={3}>
              <BarChart
                xAxis={[
                  {
                    scaleType: "band",
                    data: ["Children", "Adults", "Seniors"],
                  },
                ]}
                series={[{ data: array_count }]}
                width={500}
                height={300}
              />
              <Typography
                variant='h6'
                sx={{ alignSelf: "left" }}
                gutterBottom
                align='center'
              >
                Data Grid: Analyze Patient Data details
              </Typography>
            </Stack>
            <Stack display='flex' flexDirection='column' alignItems='center'>
              <Box sx={{ height: 220, flexGrow: 1, maxWidth: 400 }}>
                <Typography variant='subtitle1' gutterBottom>
                  <b>Children Age Range:</b> {ageGroups?.children.minAge} yrs -{" "}
                  {ageGroups?.children.maxAge} yrs
                </Typography>
                <Typography variant='subtitle1' gutterBottom>
                  <b>Adults Age Range:</b> {ageGroups?.adults.minAge} yrs -{" "}
                  {ageGroups?.adults.maxAge} yrs
                </Typography>
                <Typography variant='subtitle1' gutterBottom>
                  <b>Seniors Age Range:</b> {ageGroups?.seniors.minAge} yrs -{" "}
                  {ageGroups?.seniors.maxAge == "null"
                    ? "null"
                    : ageGroups?.seniors.maxAge}{" "}
                  yrs
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
      </ReportGenerator>
    </div>
  );
}

export default AgeAnalysis;
