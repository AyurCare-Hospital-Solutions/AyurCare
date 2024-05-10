import { Box, Typography } from "@mui/material";
import { BarChart, PieChart, pieArcLabelClasses } from "@mui/x-charts";
import axios from "axios"
import { useEffect, useState } from "react";


const getMedicineRequetsData = async () => {
    try {
        const response = await axios.get('api/ims/analytics/medicineRequestData');
        return response.data;
    }
    catch (e) {
        console.log(e);
    }
}

export const MedicineRequestStatusPieChart = () => {
    const [requestData, setRequestData] = useState<any>();

    useEffect(() => {
        getMedicineRequetsData()
            .then((data) => {
                setRequestData(data);
            })
            .catch((e) => {
                console.log(e);
            })
    },[]);

    const data =
        [
            { id: 0, value: requestData ? requestData.acceptCount : 0, label: 'Accepted', color: '#32CD32' },
            { id: 1, value: requestData ? requestData.rejectCount : 0, label: 'Rejected', color: '#FF6347' },
            { id: 2, value: requestData ? requestData.pendingCount : 0, label: 'Pending', color: '#FFCC00' },
        ];

    return (
        <Box width={400} height={300}>
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
                pie chart: Medicine Request Status
            </Typography>
        </Box>
    );
}

export const MedicineRequestStatusBarChart = () => {
    const [requestData, setRequestData] = useState<any>();

    useEffect(() => {
        getMedicineRequetsData()
            .then((data) => {
                setRequestData(data);
            })
            .catch((e) => {
                console.log(e);
            })
    },[]);

    const data = [
        {
            status: 'Accepted',
            count: requestData ? requestData.acceptCount : 0,
        },
        {
            status: 'Rejected',
            count: requestData ? requestData.rejectCount : 0,
        },
        {
            status: 'Pending',
            count: requestData ? requestData.pendingCount : 0,
        }
    ];

    return (
        <Box width={500} height={300}>
            <BarChart
                colors={['#1ABC9C']}
                xAxis={[{ scaleType: 'band', dataKey: 'status', label: "Status" }]}
                yAxis={[{ label: "Count" }]}
                dataset={data}
                series={[{ dataKey: 'count', label: 'Medicine request status distribution' }]}
                width={500}
                height={300}
            />
            <Typography align="center">
                bar chart: Medicine Request Status
            </Typography>
        </Box>
    );
}