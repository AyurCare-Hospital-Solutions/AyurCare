import { Box, Typography, Stack, Tooltip, Paper } from "@mui/material";
import { ManufactureRequestStatusPieChart } from "../DMMS/Analyse/ProductionAnalyse";
import { MedicineRequestStatusBarChart } from "./Analyse/ProductionAnalyse";
import { usePDF } from 'react-to-pdf';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


function DMMSAnalyse() {

    // print the component as a PDF
    const { toPDF, targetRef } = usePDF({
        filename: "Manufacture_Request_Chart_Progress.pdf"
    });


    return (

        <div>
            <Box>
                <Typography variant='h3' color='primary' align="center">
                    Drug Manufacture Analytics
                </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} my={2} mx={2} >
                <Tooltip title="Download Report as PDF" arrow>
                    <PictureAsPdfIcon fontSize='large' htmlColor='rgba(0, 58, 43, 0.8)' onClick={() => toPDF()} />
                </Tooltip>
            </Box>
            <Paper sx={{ marginTop: '2rem', width: '100%', overflow: 'hidden' }} ref={targetRef} >
                <Box mt={4}>
                    <Typography variant='h5' color='primary'>
                        Medicine Manufacture request Progress analytics
                    </Typography>
                    <Stack direction='row' >
                        <ManufactureRequestStatusPieChart />
                        <MedicineRequestStatusBarChart />
                    </Stack>
                </Box>
            </Paper>
        </div>
    );
}

export default DMMSAnalyse;