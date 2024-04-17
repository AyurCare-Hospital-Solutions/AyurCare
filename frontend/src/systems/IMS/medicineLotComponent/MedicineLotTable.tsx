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
import { Box, Button, Typography } from '@mui/material';
import { enqueueSnackbar } from 'notistack';
import { Add } from '@mui/icons-material';
import { useConfirm } from 'material-ui-confirm';
import MedicineLotUpdateModal from './MedicineLotUpdateModal';


// row indicators
const colorIndicator = (amount: number, expDate: any) => {
    if (amount === 0) {
        return '#ff7979';
    }
    else {
        const currentDate = new Date();
        const comparedDate = new Date(expDate);
        if (comparedDate.getTime() <= currentDate.getTime()) {
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
        axios.get(`api/ims/medicineLot/${id}`)
            .then((res: any) => {
                setMedicineLotData(res.data);
                console.log(res.data);

            })
    }

    // add new lot
    const addNewMedicineLot = async (manufacturer: string, amount: number, expireDate: any) => {
        // validation
        // Validate manufacturer name (required, alphanumeric with spaces)
        if (!manufacturer.trim()) {
            enqueueSnackbar("Manufacturer name is required...", { variant: "error" });
            return;
        } else if (!/^[a-zA-Z0-9\s]+$/.test(manufacturer)) {
            enqueueSnackbar("Manufacturer name can only contain letters, numbers, and spaces...", { variant: "error" });
            return;
        }
        // Validate amount (required, positive integer)
        if (!amount) {
            enqueueSnackbar("Amount is required...", { variant: "error" });
            return;
        } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
            enqueueSnackbar("Amount must be a positive integer...", { variant: "error" });
            return;
        }
        if (!expireDate.trim()) {
            enqueueSnackbar("Expire date is required...", { variant: "error" });
            return;
        }
        const medicineId = id;
        await axios.post('api/ims/medicineLot/addMedicineLot', { medicineId, manufacturer, amount, expireDate })
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
    // confirm handle
    const confirm = useConfirm();
    // update lot
    const [updateLot, setUpdateLot] = useState({});
    const updateMedicineLlot = (id: number, amount: number) => {
        // Validate amount (required, positive integer)
        if (!amount) {
            enqueueSnackbar("Amount is required...", { variant: "error" });
            return;
        } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
            enqueueSnackbar("Amount must be a positive integer...", { variant: "error" });
            return;
        }
        confirm({ description: `Confirm update medicine lot number : ${id}` })
            .then(async () => {
                try {
                    await axios.put(`api/ims/medicineLot/updateMedicineLot/${id}`, { amount });
                    getMedicineLot();
                    enqueueSnackbar(`Medicine lot Updated Successfuly...`, { variant: "success" });
                }
                catch (e) {
                    enqueueSnackbar("Failed to Update Medicine lot...", { variant: "error" });
                    console.error(e);
                }
            })
    }

    // delete lot
    const deleteMedidcineLot = (id: number) => {
        confirm({ description: `This will permanantly delete medicine lot number ${id}` })
            .then(async () => {
                try {
                    await axios.post("api/ims/medicineLot/deleteMedicineLot", { id });
                    getMedicineLot();
                    enqueueSnackbar("Medicine Lot Deleted Successfuly...", { variant: "success" });
                }
                catch (e) {
                    enqueueSnackbar("Failed to Delete Medicine Lot...", { variant: "error" });
                    console.error(e);

                }
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

    // update & delete lot modal
    const [updateLotOpen, setUpdateLotOpen] = React.useState(false);
    const handleUpdateOpen = () => setUpdateLotOpen(true);
    const handleUpdateClose = () => setUpdateLotOpen(false);

    return (
        <>
            <TableContainer sx={{ maxHeight: 340 }} component={Paper}>
                <Box sx={{ display: "flex" }} mx={2} >
                    <Box flexGrow={1}></Box>
                    <Button sx={{ marginTop: '5px' }} variant="outlined" color="success" onClick={handleAddOpen} startIcon={<Add />} >Add Lot</Button>
                </Box>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">ID</TableCell>
                            <TableCell align="center">Manufacturer</TableCell>
                            <TableCell align="center">Amount</TableCell>
                            <TableCell align="center">Expire date</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {medicineLotData.map((row: any) => (
                            <TableRow
                                onClick={() => {
                                    setUpdateLot(row);
                                    handleUpdateOpen()
                                }}
                                hover
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 }, backgroundColor: colorIndicator(Number(row.amount), row.expire_date) }}
                            >
                                <TableCell align="center" component="th" scope="row">
                                    {row.id}
                                </TableCell>
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
            <MedicineLotUpdateModal updateLot={updateLot} updateLotOpen={updateLotOpen} handleUpdateClose={handleUpdateClose} updateMedicineLlot={updateMedicineLlot} deleteMedidcineLot={deleteMedidcineLot} />
        </>
    )
}

export default MedicineLotTable;
