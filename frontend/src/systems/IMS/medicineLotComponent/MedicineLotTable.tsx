import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';
import React from 'react';
import MedicineLotAddModal from './MedicineLotAddModal';
import { Box, Button, Stack, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { Add } from '@mui/icons-material';


// row indicators
const colorIndicator = (amount: number , expDate:any)=>{
    if(amount === 0){
        return '#ff7979';
    }
    else{
        const currentDate = new Date();
        const comparedDate = new Date(expDate);
        if (comparedDate.getTime() <= currentDate.getTime()){
            return '#f9ff49db'
        }
        else {
            return ''
        }
    }
}

function MedicineLotTable({ id }: { id: number }) {
    const [medicineLotData, setMedicineLotData] = useState([]);
    // get medidcine lot data
    const getMedicineLot = () => {
        if (id === undefined) {
            return;
        }
        axios.get(`/api/ims/medicineLot/${id}`)
            .then((res: any) => {
                setMedicineLotData(res.data);
                console.log(res.data);

            })
    }

    // add new lot
    const addNewMedicineLot = async (manufacturer: string, amount: number, expireDate: any) => {
        const medicineId = id;
        await axios.post('/api/ims/medicineLot/addMedicineLot', { medicineId, manufacturer, amount, expireDate })
            .then((res) => {
                enqueueSnackbar("Medicine Lot Added Successfuly...", { variant: "success" });
                console.log(res);
                getMedicineLot();
            })
            .catch((err) => {
                enqueueSnackbar("Failed to add Medicine Lot...", { variant: "error" });
                console.log(err)
            })
    }

    useEffect(() => {
        getMedicineLot();
    }, [id])

    // modals
    // add lot modal
    const [addLotOpen, setAddLotOpen] = React.useState(false);
    const handleAddOpen = () => setAddLotOpen(true);
    const handleAddClose = () => setAddLotOpen(false);

    return (
        <>
            <TableContainer sx={{ maxHeight:340 }} component={Paper}>
                <Box sx={{ display: "flex" }} mx={2} >
                    <Box flexGrow={1}></Box>
                    <Button sx={{ marginTop: '5px' }} variant="outlined" color="success" type='submit' onClick={handleAddOpen} startIcon={<Add />} >Add Lot</Button>
                </Box>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Manufacturer</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Expire date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {medicineLotData.map((row: any) => (
                            <TableRow
                                hover
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: colorIndicator(Number(row.amount), row.expire_date) }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {row.manufacturer}
                                </TableCell>
                                <TableCell align="center">{row.amount}</TableCell>
                                <TableCell align="right">{row.expire_date}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box mx={10} mt={3} display='flex'>
                <Box height='15px' width='15px' mx={1} sx={{ backgroundColor: '#f9ff49db' }}></Box> <Typography>Expired medicine lot</Typography>
            </Box>
            <Box mx={10} my={1} display='flex'>
                <Box height='15px' width='15px' mx={1} sx={{ backgroundColor: '#ff7979' }}></Box> <Typography>Out-of-stock</Typography>
            </Box>
            <MedicineLotAddModal addLotOpen={addLotOpen} handleAddClose={handleAddClose} addNewMedicineLot={addNewMedicineLot} />
        </>
    )
}

export default MedicineLotTable
