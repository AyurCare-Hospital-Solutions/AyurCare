import { Grid } from '@mui/material';
import { ReportCard } from '../../components/DashboardCards';

const Reports = () => {
    return <>
        <Grid container spacing={2} justifyContent="space-evenly">
            <Grid item xs={5}>
                <ReportCard name="OPD Appointments" desc="Download OPD appointments list" link="/opcms/records" />
            </Grid>
            <Grid item xs={5}>
                <ReportCard name="Analytics Report" desc="Download Analytics Report" link="/opcms/records" />
            </Grid>
        </Grid >
    </>
}

export default Reports;
