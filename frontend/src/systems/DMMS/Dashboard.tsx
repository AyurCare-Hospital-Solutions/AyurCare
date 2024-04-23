import { Box, Grid, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";
import { DateCard, LinkCard, WelcomeCard } from "../../components/DashboardCards";

dayjs.extend(AdvancedFormat)


const cardStyle = { display: "flex", px: "16px", py: "12px" }


const Dashboard = () => {
    return <>
        <Grid container spacing={2} justifyContent="space-evenly">
            <Grid item xs={12}>
                <Box sx={{ my: 2.5, mx: 2, color: "#003a2b" }} >
                    <Typography variant="h4" >Welcome to</Typography>
                    <Typography variant="h5" sx={{ pl: 4 }}>Drug Manufacturing Management Dashboard</Typography>
                </Box>
            </Grid>
            <Grid item xs={5}>
                <WelcomeCard img="/assets/ICMS-dash-icon.svg" />
            </Grid>
            <Grid item xs={5}>
                <DateCard />
            </Grid>
            <Grid item xs={6}>
                <Paper sx={{ ...cardStyle }}>
                    Waiting list
                </Paper>
            </Grid>
            <Grid item xs={4}>

                <Box flexGrow="3" display="flex" flexDirection="column" >
                    <LinkCard name="Care Plans" desc="View Patient Care Plans" link="/icms/care_plan"></LinkCard>
                    <LinkCard name="Nursing Logs" desc="View Nursing Logs" link="/icms/nursing_log"></LinkCard>
                    <LinkCard name="Reports" desc="Generate Reports" link="/icms/reports"></LinkCard>

                </Box>
            </Grid>

        </Grid >
    </>
};

export default Dashboard;
