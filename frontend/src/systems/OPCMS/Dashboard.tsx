import { Box, Grid } from "@mui/material";
import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";
import { DateCard, LinkCard, LinkCard2, WelcomeCard } from "../../components/DashboardCards";

dayjs.extend(AdvancedFormat)


const Dashboard = () => {
    return <>
        <Grid container spacing={2} justifyContent="space-evenly">
            <Grid item xs={6}>
                <WelcomeCard img="/assets/Doctor-pana.svg" />
            </Grid>
            <Grid item xs={4}>
                <DateCard />
            </Grid>
            <Grid item xs={4}>
                <LinkCard2 name="Appointments" desc="Patient Analysis and Medical States Analysis" link="/opcms/appointments"></LinkCard2>
            </Grid>
            <Grid item xs={6}>
                <Box flexGrow="3" display="flex" flexDirection="column">
                    <LinkCard name="Medical Records" desc="Find Medical Record details" link="/opcms/records" /> 
                    <LinkCard name="Reports" desc="Generate reports" link="/opcms/reports" />
                    <LinkCard name="Analytics" desc="Patient Analysis and Medical States Analysis" link="/opcms/analytics" />
                </Box>
            </Grid>
        </Grid >
    </>
};

export default Dashboard;