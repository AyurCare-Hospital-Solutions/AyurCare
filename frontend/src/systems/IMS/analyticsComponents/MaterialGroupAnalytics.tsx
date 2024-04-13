import { Box, Typography } from "@mui/material";
import { BarChart, PieChart, pieArcLabelClasses } from "@mui/x-charts";
import axios from "axios"
import { useEffect, useState } from "react";


const getMaterialGroups = async ()=>{
    try{
        const response = await axios.get('api/ims/analytics/materialGroups');
        console.log(response.data);
        return response.data;
    }
    catch(e){
        console.log(e);        
    }
}

export const MaterialGroupsPieChart = ()=>{
    const [materialGroupData,setMaterialGroupData] = useState<any>();

    useEffect(()=>{
        getMaterialGroups()
        .then((data)=>{
            setMaterialGroupData(data);
        })
        .catch((e)=>{
            console.log(e);
            
        })
    },[]);

    var total = 0;
    const data = materialGroupData? materialGroupData.map((group:any,index : number)=>{
        total += group.count;
        return {
            id : index,
            value : group.count,
            label : group.unit,
        }
    }) : [];

    return (
        <Box width={400} height={200}>
            <PieChart
                colors={['#007FFF', '#CD853F','#8A2BE2']}
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
                height={200}
                loadingAnimationDuration={10000}
            />
            <Typography align="center">
                pie chart: Material mesurement unit Distribution
            </Typography>
        </Box>
    );
}

export const MaterialGroupBarChart = ()=>{
    const [materialGroupData, setMaterialGroupData] = useState<any>([{}]);

    useEffect(() => {
        getMaterialGroups()
            .then((data) => {
                setMaterialGroupData(data);
            })
            .catch((e) => {
                console.log(e);
            })
    },[]);

    return (
        <Box width={500} height={300}>
            <BarChart
                colors={['#3192F9']}
                xAxis={[{ scaleType: 'band', dataKey: 'unit', label: "Measurement unit" }]}
                yAxis={[{ label: "Lot count" }]}
                dataset={materialGroupData}
                series={[{ dataKey: 'count', label: 'Unit distribution' }]}
                width={500}
                height={300}
                sx={{ marginTop: '2rem' }}
            />
            <Typography align="center">
                bar chart: Material mesurement unit Distribution
            </Typography>
        </Box>
    );
}