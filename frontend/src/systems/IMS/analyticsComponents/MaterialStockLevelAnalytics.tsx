import { Box, Typography } from "@mui/material";
import { BarChart, PieChart, pieArcLabelClasses } from "@mui/x-charts";
import axios from "axios"
import { useEffect, useState } from "react";


const getMaterialStockLevels = async () => {
    try {
        const response = await axios.get('api/ims/analytics/materialStockLevel');
        return response.data;
    }
    catch (e) {
        console.log(e);
    }
}

export const MaterialStockLevelPieChart = () => {
    const [stockData, setStockData] = useState<any>();

    useEffect(() => {
        getMaterialStockLevels()
            .then((data) => {
                setStockData(data);

            })
            .catch((e) => {
                console.log(e);

            })
    }, []);

    const data = [
        { id: 0, value: stockData ? stockData.outOfStock : 0, label: 'Out-Of-Stock', color: '#FF6347' },
        { id: 1, value: stockData ? stockData.reOrderLevelReached : 0, label: 'ReOrder Level ', color: '#FFCC00' },
        { id: 2, value: stockData ? stockData.otherStock : 0, label: 'Other', color: '#32CD32' },
    ];

    return (
        <Box width={400} height={300}>
            <PieChart
                series={[
                    {
                        outerRadius: 80,
                        arcLabel: (item) => `${(item.value * 100 / (stockData ? stockData.totalLOt : 1)).toFixed(2)}%`,
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
                pie chart: Material Stock Status
            </Typography>
        </Box>
    );
}

export const MaterialStockLevelBarChart = () => {
    const [stockData, setStockData] = useState<any>();

    useEffect(() => {
        getMaterialStockLevels()
            .then((data) => {
                setStockData(data);
            })
            .catch((e) => {
                console.log(e);

            })
    }, []);

    const data = [
        {
            status: 'OutOfStock',
            count: stockData ? stockData.outOfStock : 0,
        },
        {
            status: 'ReOrder',
            count: stockData ? stockData.reOrderLevelReached : 0,
        },
        {
            status: 'Other',
            count: stockData ? stockData.otherStock : 0,
        }
    ];

    return (
        <Box width={500} height={300}>
            <BarChart
                colors={['#F95CCE']}
                xAxis={[{ scaleType: 'band', dataKey: 'status', label: "Status" }]}
                yAxis={[{ label: "Count" }]}
                dataset={data}
                series={[{ dataKey: 'count', label: 'Matrial stock level distribution' }]}
                width={500}
                height={300}
            />
            <Typography align="center">
                bar chart: Material Stock Status
            </Typography>
        </Box>
    );
}