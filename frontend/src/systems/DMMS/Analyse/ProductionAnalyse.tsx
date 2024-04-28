import { Box, Typography } from "@mui/material";
import { BarChart, PieChart, pieArcLabelClasses } from "@mui/x-charts";
import axios from "axios"
import { useEffect, useState } from "react";


const getmanufactureRequestData = async () => {
    try {
        const response = await axios.get('api/dmms/analyse/manufactureRequestData');
        console.log(response.data);
        return response.data;
    }
    catch (e) {
        console.log(e);
    }
}

export const ManufactureRequestStatusPieChart = () => {
    const [requestData, setRequestData] = useState<any>();

    useEffect(() => {
        getmanufactureRequestData()
            .then((data) => {
                setRequestData(data);
            })
            .catch((e) => {
                console.log(e);
            })
    }, []);

    const data =
        [
            { id: 0, value: requestData ? requestData.completedCount : 0, label: 'Completed', color: '#32CD32' },
            { id: 1, value: requestData ? requestData.rejectCount : 0, label: 'Rejected', color: '#FF0000' },
            { id: 2, value: requestData ? requestData.pendingCount : 0, label: 'Pending', color: '#00FFB2' },
            { id: 3, value: requestData ? requestData.inprogressCount : 0, label: 'In Progress', color: '#FFCC00' },
            { id: 4, value: requestData ? requestData.manufactureerrorCount : 0, label: 'Error', color: '#FF5733' },
        ];

    return (

        <Box width={500} height={250}>
            <PieChart
                series={[
                    {
                        outerRadius: 80,
                        arcLabel: (item) => `${(item.value * 100 / (requestData ? requestData.totalCount : 1)).toFixed(2)}%`,
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
                Medicine Manufacture Request Progress
            </Typography>
        </Box>

    );
}

export const MedicineRequestStatusBarChart = () => {
    const [requestData, setRequestData] = useState<any>();

    useEffect(() => {
        getmanufactureRequestData()
            .then((data) => {
                setRequestData(data);
            })
            .catch((e) => {
                console.log(e);
            })
    }, []);

    const data = [
        {
            status: 'Completed',
            count: requestData ? requestData.completedCount : 0,
        },
        {
            status: 'Rejected',
            count: requestData ? requestData.rejectCount : 0,
        },
        {
            status: 'Pending',
            count: requestData ? requestData.pendingCount : 0,
        },
        {
            status: 'In Progress',
            count: requestData ? requestData.inprogressCount : 0,
        },
        {
            status: 'Manufacture Error',
            count: requestData ? requestData.manufactureerrorCount : 0,
        }

    ];

    return (
        <Box width={500} height={300}>
            <BarChart
                colors={['#1ABC9C']}
                xAxis={[{ scaleType: 'band', dataKey: 'status', label: "Progress" }]}
                yAxis={[{ label: "Count" }]}
                dataset={data}
                series={[{ dataKey: 'count', label: 'Manufacture request status distribution' }]}
                width={500}
                height={300}
            />
            <Typography align="center">
                Medicine Manufacturing Request Progress in Bar graph
            </Typography>
        </Box>
    );
}