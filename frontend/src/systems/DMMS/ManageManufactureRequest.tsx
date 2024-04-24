import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import MedicineRequestModal from './ManuReqCom/ManufactureRequestModal';
import SearchBar from './SearchBar';
import { useConfirm } from 'material-ui-confirm';
import { enqueueSnackbar } from 'notistack';
import { Box, Typography } from '@mui/material';

function ManageManufactureRequest() {
    const [medicineReqData, setManufactureReqData] = useState<any>([]);
    const [searchQuery, setSearchQuery] = useState<String>("");  // for search query

    const search = (str: String) => {
        setSearchQuery(str)
    }
    // fetch medicine request data
    const getManufactureRequestData = async () => {
        await axios.get('api/dmms/request').then((res) => {
            console.log(res.data);
            setManufactureReqData(res.data);
        })
    }

    useEffect(() => {
        getManufactureRequestData();
    }, []);

    const colorIndicator = (progress: string) => {
        if (progress === 'Rejected') {
            return '#ff7979';
        }
        else if (progress === 'Manufacture Error') {
            return '#4aee78';
        }
    }

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // update modal 
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [updateRequest, setUpdateRequest] = useState({ Item: {} });

    // confirm handle
    const confirm = useConfirm();
    // update status
    const updateStatus = (id: number, progress: string) => {
        confirm({ description: 'Confirm Progress change' })
            .then(async () => {
                try {
                    await axios.put(`api/dmms/request/${id}`, { status: progress });
                    enqueueSnackbar("Request updated successfully", { variant: 'success' });
                    getManufactureRequestData();
                }
                catch (e) {
                    enqueueSnackbar("Failed to Update Medicine Request...", { variant: "error" });
                    console.error(e);
                }
            })
    }

    // delete medicine request
    const deleteManufactureRequest = (id: number) => {
        confirm({ description: 'Confirm delete medicine request' })
            .then(async () => {
                try {
                    await axios.delete(`api/dmms/request/${id}`);
                    enqueueSnackbar("Request deleted successfully", { variant: 'success' });
                    getManufactureRequestData();
                }
                catch (e) {
                    enqueueSnackbar("Failed to delete Medicine Request...", { variant: "error" });
                    console.error(e);
                }
            })
    }
    return (
        <div>
            <Typography color='primary' align="center" variant="h5">
                Manage Manufacture Requests
            </Typography>
            <Box sx={{ display: "flex" }} my={2} mx={2} >
                <SearchBar onSearch={search} />
            </Box>
            <Box flexGrow={1}></Box>
            <Paper sx={{ marginTop: '2rem', width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Medicine Name</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Requested Date</TableCell>
                                <TableCell>Manufactured Date</TableCell>
                                <TableCell>Progress</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {medicineReqData
                                .toReversed()
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                                .filter((row: any) => {
                                    if (searchQuery) {
                                        return (row.Medicine.Item.name.startsWith(searchQuery));
                                    }

                                    else {
                                        return row;
                                    }
                                })
                                .map((row: any) => {
                                    return (
                                        <TableRow hover role="checkbox" key={row.id} sx={{ backgroundColor: colorIndicator(row.progress) }}
                                            onClick={() => {
                                                setUpdateRequest(row);
                                                handleOpen();
                                            }}
                                        >
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.Medicine.Item.name}</TableCell>
                                            <TableCell>{row.amount}</TableCell>
                                            <TableCell>{row.createdAt}</TableCell>
                                            <TableCell>{row.progress === "Completed" ? row.updatedAt : ''}</TableCell>
                                            <TableCell>{row.progress}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={medicineReqData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <MedicineRequestModal open={open} handleClose={handleClose} updateRequest={updateRequest} updateStatus={updateStatus} deleteManufactureRequest={deleteManufactureRequest} />

        </div>
    )
}

export default ManageManufactureRequest;
