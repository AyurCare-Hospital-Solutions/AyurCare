import { Box, Typography } from "@mui/material";
import { BarChart, PieChart, pieArcLabelClasses } from "@mui/x-charts";
import axios from "axios";
import { useEffect, useState } from "react";

const getAccessoryGroups = async () => {
    try {
        const response = await axios.get('api/ims/analytics/accessoryGroups');
        console.log(response.data);
        return response.data;
    }
    catch (e) {
        console.log(e);
    }
}

export const AccessoryGroupPieChart = () => {
    const [accessoryGroupData, setAccessoryGroupData] = useState<any>();

    useEffect(() => {
        getAccessoryGroups()
            .then((data) => {
                setAccessoryGroupData(data);
            })
            .catch((e) => {
                console.log(e);
            })
    }, []);

    var total = 0;
    const data = accessoryGroupData ? accessoryGroupData.map((group: any, index: number) => {
        total += group.count;
        return {
            id: index,
            value: group.count,
            label: group.unit,
        }
    }) : [];

    return (
        <Box width={400} height={300}>
            <PieChart
                colors={['#FF66E8', '#897FDF', '#35C8A9']}
                series={[
                    {
                        outerRadius: 80,
                        arcLabel: (item) => `${(item.value * 100 / (total)).toFixed(2)}%`,
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
                pie chart: Accessory mesurement unit Distribution
            </Typography>
        </Box>
    );
}

export const AccessoryGroupBarChart = () => {
    const [accessoryGroupData, setAccessoryGroupData] = useState<any>([{}]);

    useEffect(() => {
        getAccessoryGroups()
            .then((data) => {
                setAccessoryGroupData(data);
            })
            .catch((e) => {
                console.log(e);
            })
    }, []);

    return (
        <Box width={500} height={300}>
            <BarChart
                colors={['#FF9515']}
                xAxis={[{ scaleType: 'band', dataKey: 'unit', label: "Measurement unit" }]}
                yAxis={[{ label: "Lot count" }]}
                dataset={accessoryGroupData}
                series={[{ dataKey: 'count', label: 'Unit distribution' }]}
                width={500}
                height={300}
            />
            <Typography align="center">
                bar chart: Accessory mesurement unit Distribution
            </Typography>
        </Box>
    );
}