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
// import MedicineRequestModal from './ManuReqCom/ManufactureRequestModal';
// import SearchBar from './SearchBar';
import { useConfirm } from 'material-ui-confirm';
import { Box, Tooltip, Typography } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { usePDF } from 'react-to-pdf';
import dayjs from 'dayjs';
import NewRequestModal from '../../DMMS/ManuReqCom/NewRequestModal';
import { enqueueSnackbar } from 'notistack';

function NewRequests() {
    const [manufactureReqData, setManufactureReqData] = useState<any>([]);
    const [searchQuery, setSearchQuery] = useState<RegExp>();  // for search query

    // fetch medicine request data
    const getManufactureRequestData = async () => {
        await axios.get('api/dmms/request').then((res) => {
            console.log(res.data);
            setManufactureReqData(res.data);
        })
    }

    const formatDate = (dateString: string | number | Date | dayjs.Dayjs | null | undefined) => {
        // Parse the date string using dayjs
        const date = dayjs(dateString);
        // Format the date using dayjs (you can adjust the format string as needed)
        return date.format('YYYY/MM/DD HH:mm:ss');
    }

    useEffect(() => {
        getManufactureRequestData();
    }, []);

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
    const updateProgress = (id: number, progress: string) => {
        confirm({ description: 'Confirm Progress Type change' })
            .then(async () => {
                try {
                    await axios.put(`api/dmms/request/${id}`, { progress: progress });
                    enqueueSnackbar("Request updated successfully", { variant: 'success' });
                    getManufactureRequestData();
                }
                catch (e) {
                    enqueueSnackbar("Failed to Update Manufacture Request...", { variant: "error" });
                    console.error(e);
                }
            })
    }

    // print the component as a PDF
    const { toPDF, targetRef } = usePDF({
        filename: "Manufacture_Request_Table.pdf"
    });

    return (
        <div>
            <Typography color='primary' align="center" variant="h5">
                New Manufacture Requests
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} my={2} mx={2} >
                {/* <SearchBar onChange={(q) => setSearchQuery(q)} /> */}
                <Tooltip title="Download table as PDF" arrow>
                    <PictureAsPdfIcon fontSize='large' htmlColor='rgba(0, 58, 43, 0.8)' onClick={() => toPDF()} />
                </Tooltip>
            </Box>
            {/* <Box flexGrow={1}></Box> */}
            <Paper sx={{ marginTop: '2rem', width: '100%', overflow: 'hidden' }} ref={targetRef} >
                <Typography color='primary' align="center" variant="h6" gutterBottom>
                    New Manufacture Requests Table
                </Typography>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Medicine Name</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Requested Date</TableCell>
                                <TableCell>Priority</TableCell>
                                <TableCell>Progress</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {manufactureReqData
                                .toReversed()
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

                                .filter((row: any) => {
                                    if (searchQuery) {
                                        return (row.Medicine.Item.name.search(searchQuery) !== -1);
                                    }

                                    else {
                                        return row;
                                    }
                                })
                                .map((row: any) => {
                                    if (row.progress === "Pending") {
                                        return (
                                            <TableRow hover role="checkbox" key={row.id}
                                                onClick={() => {
                                                    setUpdateRequest(row);
                                                    handleOpen();
                                                }}>
                                                <TableCell>{row.id}</TableCell>
                                                <TableCell>{row.Medicine?.Item?.name}</TableCell>
                                                <TableCell>{row.amount}</TableCell>
                                                <TableCell>{formatDate(row.createdAt)}</TableCell>
                                                <TableCell>{row.isPriority}</TableCell>
                                                <TableCell>{row.progress}</TableCell>
                                            </TableRow>
                                        );
                                    }
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={manufactureReqData.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <NewRequestModal open={open} handleClose={handleClose} updateRequest={updateRequest} updateProgress={updateProgress} />

        </div >
    )
}

export default NewRequests;
