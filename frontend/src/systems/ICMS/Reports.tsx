import { Box, CircularProgress, Skeleton, Typography } from "@mui/material";
import ReportGenerator from "../../components/ReportGenerator";
import { useEffect, useState } from "react";
import axios from "axios";
import { ChartContainer, LineChart, PieChart } from "@mui/x-charts"
import { BarChart } from "@mui/icons-material";

const Reports = () => {
    const [reports, setReports] = useState({ discharge_per_day: [], admissions_per_day: [], priority_wait_list: [], beds_per_ward: [] });
    const [loading, setLoading] = useState(true);



    useEffect(() => {
        axios.get(`/api/icms/reports`).then((res) => {
            setReports(res.data);
            setLoading(false);
            console.log(res.data)
        });
    }, []);


    return <>
        <Typography variant="h5" mx={1} mt={2} mb={4}>Reports</Typography>
        {loading ? <Box width={"100%"} sx={{ textAlign: "center", my: 5 }}>
            <CircularProgress />
        </Box> :
            <ReportGenerator filename="ICMSReport.pdf" title="Reports" visible titleHidden>
                <Box>
                    <Typography>Patient Discharge History</Typography>
                    <LineChart
                        dataset={reports.discharge_per_day}
                        xAxis={[{ dataKey: "label", scaleType: "band", label: "Date" }]}
                        series={[{ dataKey: "value", label: "Patients Discharged" }]}
                        width={500}
                        height={300}
                    />
                </Box>
                <Box>
                    <Typography> Patient Admission History</Typography>
                    <LineChart
                        dataset={reports.admissions_per_day}
                        xAxis={[{ dataKey: "label", scaleType: "band", label: "Date" }]}
                        series={[{ dataKey: "value", label: "Patients Admitted" }]}
                        width={500}
                        height={300} />
                </Box>

                <Box>
                    <Typography> Wait list priority breakdown</Typography>
                    <PieChart
                        series={[
                            {
                                data: reports.priority_wait_list,
                            },
                        ]}

                        width={400}
                        height={200}
                    />
                </Box>
                <Box>
                    <Typography> Beds per ward</Typography>
                    <PieChart series={[
                        {
                            data: reports.beds_per_ward,
                        },
                    ]}

                        width={400}
                        height={200} />
                </Box>
            </ReportGenerator >
        }
    </>;
};
export default Reports;