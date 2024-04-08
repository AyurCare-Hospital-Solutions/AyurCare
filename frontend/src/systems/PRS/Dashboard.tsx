import { Box, Grid, Typography } from "@mui/material";
import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";
 import { LinkCard, WelcomeCard } from "../../components/DashbordCard";

dayjs.extend(AdvancedFormat)


// const cardStyle = { display: "flex", px: "16px", py: "12px" }


const Dashboard = () => {
    return <>
        <Grid container spacing={2} justifyContent="space-evenly">
            <Grid item xs={12}>
                <Box sx={{ my: 2.5, mx: 2, color: "#003a2b" }} >
                    <Typography variant="h4" sx={{ pl: 4 }}>Patient Registration & Scheduling Dashboard</Typography>
                </Box>
            </Grid>
            <Grid item xs={7}>
                <WelcomeCard img="/assets/PRS-dash-logo-icon.svg" />
            </Grid>
            <Grid item xs={5}>
                {/* <DateCard /> */}
                <Box flexGrow="3" display="flex" flexDirection="column" gap={4} >
                    <LinkCard name="Patient Registration" desc="Add new patient to the system" link="/prs/patients"></LinkCard>
                    <LinkCard name="Appointment Scheduling" desc="Onbording to the OPD queue" link="/prc/appointment"></LinkCard>
                    <LinkCard name="Reports" desc="Generate Reports" link="/icms/reports"></LinkCard>
                </Box>
            </Grid>
        </Grid >
    </>
};

export default Dashboard;

