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
import { Box, Button, Stack } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { Add } from '@mui/icons-material';

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
            <TableContainer component={Paper}>
                <Box sx={{ display: "flex" }} mx={2} >
                    <Box flexGrow={1}></Box>
                    <Button sx={{ marginTop: '5px' }} variant="outlined" color="success" type='submit' onClick={handleAddOpen} startIcon={<Add />} >Add Lot</Button>
                </Box>
                <Table sx={{ minWidth: 50 }} aria-label="simple table">
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
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
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
            <MedicineLotAddModal addLotOpen={addLotOpen} handleAddClose={handleAddClose} addNewMedicineLot={addNewMedicineLot} />
        </>
    )
}

export default MedicineLotTable
