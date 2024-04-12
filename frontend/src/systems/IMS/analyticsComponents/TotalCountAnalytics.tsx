import { Box, Typography } from '@mui/material';
import { PieChart, pieArcLabelClasses } from '@mui/x-charts/PieChart';
import axios from 'axios';
import { useEffect, useState } from 'react';

const getTotalCount = async () => {
    try {
        const response = await axios.get('api/ims/analytics/totalCounts');
        return response.data;
    } catch (error) {
        console.error("Error:", error);
    }
};

export const TotalCountPieChart = () => {

    const [totalCountData, setTotalCountData] = useState<any>({});

    useEffect(() => {
        getTotalCount()
            .then((data) => {
                setTotalCountData(data);
                console.log(data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    }, []);

    const data = [
        { id: 0, value: totalCountData.medicineCount, label: 'Medicine' },
        { id: 1, value: totalCountData.materialCount, label: 'Material' },
        { id: 2, value: totalCountData.accessoryCount, label: 'Accessory' },
    ];

    return (
        <Box width={400} height={200}>
            <PieChart
                series={[
                    {
                        outerRadius: 80,
                        arcLabel: (item) => `${(item.value * 100 / totalCountData.itemCount).toFixed(2)}%`,
                        data,
                    },
                ]}
                sx={{
                    [`& .${pieArcLabelClasses.root}`]: {
                        fill: 'white',
                        fontSize: 14,
                    },
                }}
                width={400}
                height={200}
                loadingAnimationDuration={10000} 
            />
            <Typography align="center">
                pie chart: Inventory Item Category Distribution
            </Typography>
        </Box>
    );
}