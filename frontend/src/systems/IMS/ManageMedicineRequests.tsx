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
import MedicineRequestModal from './medicineRequestComponent/MedicineRequestModal';
import { useConfirm } from 'material-ui-confirm';
import { enqueueSnackbar } from 'notistack';
import { Typography } from '@mui/material';

function ManageMedicineRequests() {
    const [medicineReqData, setMedicineReqData] = useState<any>([]);
    // fetch medicine request data
    const getMedicineRequestData = async () => {
        await axios.get('api/ims/medicineRequest').then((res) => {
            console.log(res.data);
            setMedicineReqData(res.data);
        })
    }

    useEffect(() => {
        getMedicineRequestData();
    }, []);

    const colorIndicator = (status: string) => {
        if (status === 'Rejected') {
            return '#ff7979';
        }
        else if (status === 'Accepted') {
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
    const updateStatus = (id: number, status: string) => {
        confirm({ description: 'Confirm status change' })
            .then(async () => {
                try {
                    await axios.put(`api/ims/medicineRequest/${id}`, { status: status });
                    enqueueSnackbar("Request updated successfully", { variant: 'success' });
                    getMedicineRequestData();
                }
                catch (e) {
                    enqueueSnackbar("Failed to Update Medicine Request...", { variant: "error" });
                    console.error(e);
                }
            })
    }

    // delete medicine request
    const deleteMedicineRequest = (id: number) => {
        confirm({ description: 'Confirm delete medicine request' })
            .then(async () => {
                try {
                    await axios.delete(`api/ims/medicineRequest/${id}`);
                    enqueueSnackbar("Medicine Request deleted successfully", { variant: 'success' });
                    getMedicineRequestData();
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
                Manage Medicine Requests
            </Typography>
            <Paper sx={{ marginTop: '2rem', width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Request ID</TableCell>
                                <TableCell>Medicine</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Unit</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {medicineReqData
                                .toReversed()
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row: any) => {
                                    return (
                                        <TableRow hover role="checkbox" key={row.id} sx={{ backgroundColor: colorIndicator(row.status) }}
                                            onClick={() => {
                                                setUpdateRequest(row);
                                                handleOpen();
                                            }}
                                        >
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.Medicine.Item.name}</TableCell>
                                            <TableCell>{row.amount}</TableCell>
                                            <TableCell>{row.Medicine.Item.unit}</TableCell>
                                            <TableCell>{row.status}</TableCell>
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
            <MedicineRequestModal open={open} handleClose={handleClose} updateRequest={updateRequest} updateStatus={updateStatus} deleteMedicineRequest={deleteMedicineRequest} />
        </div>
    )
}

export default ManageMedicineRequests;
