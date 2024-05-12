import { Box, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";
import { DateCard, LinkCard, WelcomeCard } from "../../components/DashboardCards";

dayjs.extend(AdvancedFormat)


const Dashboard = () => {
    return <>
        <Grid container spacing={2} justifyContent="space-evenly">
            <Grid item xs={12}>
                <Box sx={{ my: 2.5, mx: "auto", color: "#003a2b" }} >
                    <Typography variant="h4" sx={{ pl: 4 }}>Inpatient Management Dashboard</Typography>
                </Box>
            </Grid>
            <Grid item xs={5}>
                <WelcomeCard img="/assets/ICMS-dash-icon.svg" />
            </Grid>
            <Grid item xs={5}>
                <DateCard />
            </Grid>

            <Grid item xs={4}>


            </Grid>

        </Grid >

        <Box display="flex" flexDirection="row" justifyContent="space-between" >
            <LinkCard name="Patient List" desc="View Patient List" link="/icms/care_plan" />
            <LinkCard name="Wait List" desc="View Waiting List" link="/icms/nursing_log"></LinkCard>
            <LinkCard name="Reports" desc="Generate Reports" link="/icms/reports"></LinkCard>

        </Box>
    </>
};

export default Dashboard;

