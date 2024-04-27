import { Box, Typography, Stack } from "@mui/material";
import { ManufactureRequestStatusPieChart } from "../DMMS/Analyse/ProductionAnalyse";
// import { ManufactureRequestStatusBarChart } from "./Analyse/ProductionAnalyse";

function DMMSAnalyse() {
    return (
        <div>

            <Box mt={10}>
                <Typography variant='h5' color='primary'>
                    Medicine request status analytics
                </Typography>
                <Stack direction='row' >
                    <ManufactureRequestStatusPieChart />
                    {/* <ManufactureRequestStatusBarChart /> */}
                </Stack>
            </Box>
        </div>
    );
}

export default DMMSAnalyse;