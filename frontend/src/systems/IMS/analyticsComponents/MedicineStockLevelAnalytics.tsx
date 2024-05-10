import { Box, Typography } from "@mui/material";
import { BarChart, PieChart, pieArcLabelClasses } from "@mui/x-charts";
import axios from "axios"
import { useEffect, useState } from "react";

const getMedicineStockLevels = async () => {
    try {
        const response = await axios.get('api/ims//analytics/medicineStockLevel');
        return response.data;
    }
    catch (e) {
        console.log(e);
    }
}

export const MedicineStockLevelPieChart = () => {
    const [stockData, setStockData] = useState<any>();

    useEffect(() => {
        getMedicineStockLevels()
            .then((data) => {
                setStockData(data);
            })
            .catch((e) => {
                console.log(e);
            })
    }, []);

    const data = [
        { id: 0, value: stockData ? stockData.expiredStock[0]?.count : 0, label: 'Expired', color: '#FF6347' },
        { id: 1, value: stockData ? stockData.outOfStock[0].count : 0, label: 'Out-Of-Stock', color: '#FFCC00' },
        { id: 2, value: stockData ? stockData?.otherStock[0].count : 0, label: 'Other', color: '#32CD32' },
    ];

    return (
        <Box width={400} height={300}>
            <PieChart
                series={[
                    {
                        outerRadius: 80,
                        arcLabel: (item) => `${(item.value * 100 / (stockData ? stockData.totalLot[0].count : 1)).toFixed(2)}%`,
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
                height={300}
            />
            <Typography align="center">
                pie chart: Medicine Stock Status
            </Typography>
        </Box>
    );
}

export const MedicineStockLevelBarChart = () => {
    const [stockData, setStockData] = useState<any>();

    useEffect(() => {
        getMedicineStockLevels()
            .then((data) => {
                setStockData(data);
            })
            .catch((e) => {
                console.log(e);
            })
    }, []);

    const data = [
        { id: 0, value: stockData ? stockData.expiredStock[0].count : 0, label: 'Expired', },
        { id: 1, value: stockData ? stockData.outOfStock[0].count : 0, label: 'Out-Of-Stock', },
        { id: 2, value: stockData ? stockData?.otherStock[0].count : 0, label: 'Other', },
    ];

    return (
        <Box width={500} height={300}>
            <BarChart
                colors={['#FFCC00']}
                xAxis={[{ scaleType: 'band', dataKey: 'label', label: "Status" }]}
                yAxis={[{ label: "Count" }]}
                dataset={data}
                series={[{ dataKey: 'value', label: 'Medicine stock level distribution' }]}
                width={500}
                height={300}
            />
            <Typography align="center">
                bar chart: Medicine Stock Status
            </Typography>
        </Box>
    );
}