import { Box, Card, Divider, Grid, TextField, Typography } from "@mui/material";
import { CarePlan } from "../types"

const CarePlanInfo = ({ data }: { data: CarePlan | undefined }) => {
    return <>
        <Box sx={{ py: 4 }}>
            <Typography variant="h5">Care Plan</Typography>
            <Card variant="outlined" sx={{ py: "16px" }}>
                <Grid container rowSpacing={2} sx={{ py: 2 }} justifyContent={"space-evenly"}>
                    <Grid item xs={2}>
                        <Typography sx={{ mt: "12px" }}>Diagnosis</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            type="text"
                            fullWidth
                            hiddenLabel
                            value={data?.diagnosis}
                            inputProps={{ readOnly: true }}
                        />
                    </Grid>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={2}>
                        <Typography sx={{ mt: "12px" }}>Condition</Typography>
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            type="text"
                            fullWidth
                            hiddenLabel
                            value={data?.condition}
                            inputProps={{ readOnly: true }}
                        /></Grid>
                    <Grid item xs={12}><Divider /></Grid>
                    <Grid item xs={2}>
                        <Typography sx={{ mt: "12px" }}>Treatment Plan</Typography></Grid>
                    <Grid item xs={9}>
                        <TextField
                            type="text"
                            fullWidth
                            hiddenLabel
                            value={data?.diagnosis}
                            rows={8}
                            multiline
                            inputProps={{ readOnly: true }}
                        /></Grid>
                </Grid>
            </Card>
        </Box>
    </>
}

export default CarePlanInfo;