import { ArrowCircleRightOutlined } from "@mui/icons-material";
import { Box, Grid, Paper, Typography } from "@mui/material";
import dayjs from "dayjs";
import AdvancedFormat from "dayjs/plugin/advancedFormat";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

dayjs.extend(AdvancedFormat)


const cardStyle = { display: "flex", px: "16px", py: "12px" }

const LinkCard = ({ name, desc, link }: { name: string, desc: string, link: string }) => {
    return <Link to={link} style={{ textDecoration: "none" }}>
        <Paper elevation={3} sx={{ ...cardStyle, mt: 2, height: "94px", mr: "auto", minWidth: "80%" }}>
            <Box sx={{ my: "auto" }}>
                <Typography sx={{ fontSize: "1.75rem", fontWeight: 500 }}>{name}</Typography>
                <Typography sx={{ fontWeight: 500, }}>{desc}</Typography>
            </Box>
            <Box sx={{ ml: "auto", my: "auto" }}>
                <ArrowCircleRightOutlined fontSize="large" />
            </Box>
        </Paper>
    </Link>
}

const DateCard = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000);

        return () => clearInterval(interval);
    }, []);


    return <Paper elevation={3} sx={{ ...cardStyle, minHeight: "140px", mb: 4, backgroundColor: "#d9d9d9" }}>
        <Box sx={{ my: "auto" }}>
            <Typography sx={{ fontWeight: 400 }}>Today is</Typography>
            <Typography sx={{ fontSize: "1.75rem", fontWeight: 500 }}>{dayjs(time).format("Do MMMM YYYY")}</Typography>
        </Box>
    </Paper>


}

const Dashboard = () => {
    return <>
        <Grid container spacing={2} justifyContent="space-evenly">
            <Grid item xs={12}>
                <Box sx={{ my: 2.5, mx: 2, color: "#003a2b" }} >
                    <Typography variant="h4" >Welcome to</Typography>
                    <Typography variant="h5" sx={{ pl: 4 }}>Inpatient Management Dashboard</Typography>
                </Box>
            </Grid>
            <Grid item xs={5}>
                <Paper elevation={3} sx={{ ...cardStyle, backgroundColor: "#cde1b4", mb: 4, minHeight: "140px" }}>
                    <Box sx={{ my: "auto" }}>
                        <Typography sx={{ color: "#003a2b", fontWeight: 600, fontSize: "1.8rem" }} >Welcome Back!</Typography>
                        <Typography sx={{ color: "#003a2b", fontSize: "1.1rem" }} >Have a Nice Day!</Typography>
                    </Box>
                    <Box flexGrow="1"></Box>
                    <img style={{ alignSelf: "end" }} src="/assets/ICMS-dash-icon.svg"></img>
                </Paper >
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

