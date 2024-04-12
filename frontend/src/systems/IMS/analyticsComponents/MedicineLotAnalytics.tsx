
import { Box, Typography } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import axios from 'axios';
import { useEffect, useState } from 'react';

const getMedicineLotGroups = async () => {
    try {
        const reponse = await axios.get('api/ims/analytics/medicineLotGroups');
        return reponse.data;
    }
    catch (e) {
        console.log(e);
    }
}

export const MedicineLotBarChart = () => {
    const [medicineLotDistribution, setMedicineDeistribution] = useState<any>([{}]);

    useEffect(() => {
        getMedicineLotGroups()
            .then((data) => {
                setMedicineDeistribution(data);
                console.log(data);
            })
            .catch((e) => {
                console.log(e);

            })
    }, []);

    return (
        <Box width={500} height={300}>
            <BarChart
                xAxis={[{ scaleType: 'band', dataKey: 'MedicineId', label: "Medicine ID" }]}
                yAxis={[{ label: "Lot count" }]}
                dataset={medicineLotDistribution}
                series={[{ dataKey: 'count', label: 'Medicine lot distribution' }]}
                width={500}
                height={300}
                sx={{ marginTop: '2rem' }}
            />
            <Typography align="center">
                bar chart: Inventory Medicine Lot Distribution
            </Typography>
        </Box>
    );
}