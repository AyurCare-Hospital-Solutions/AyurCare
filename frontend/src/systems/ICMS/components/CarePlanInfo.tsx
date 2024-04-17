import { Box, Grid, Typography } from "@mui/material";
import { CarePlan } from "../types"

const CarePlanInfo = ({ data }: { data: CarePlan | undefined }) => {
    return <>
        <Box sx={{ py: 4 }}>
            <Typography variant="h5">Care Plan</Typography>

            <Grid container rowSpacing={2} sx={{ py: 2 }} justifyContent={"space-evenly"}>
                <Grid item xs={2}> Diagnosis </Grid>
                <Grid item xs={9}>{data?.diagnosis}</Grid>
                <Grid item xs={2}>Condition</Grid>
                <Grid item xs={9}>{data?.condition}</Grid>
                <Grid item xs={2}>Treatment Plan</Grid>
                <Grid item xs={9}>{data?.treatmentPlan}</Grid>
            </Grid>
        </Box>
    </>
}

export default CarePlanInfo;