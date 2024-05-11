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
import { Box, Tooltip, Typography, IconButton } from '@mui/material';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { usePDF } from 'react-to-pdf';
import dayjs from 'dayjs';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import AssignmentReturnedSharpIcon from '@mui/icons-material/AssignmentReturnedSharp';

function ManageManufactureRequest() {
    const [manufactureReqData, setManufactureReqData] = useState<any>([]);
    const [searchQuery, setSearchQuery] = useState<RegExp>();  // for search query
    const [sortByRequestedDate, setSortByRequestedDate] = useState<boolean>(false);
    const [sortByProgress, setSortByProgress] = useState<boolean>(false);

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

    const colorIndicator = (progress: string) => {
        if (progress === 'Rejected') {
            return '#ff7979';
        } else if (progress === 'Completed') {
            return '#4aee78';
        } else if (progress === 'Manufacture Error') {
            return '#FF5733';
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

    // 
    const handleSortByRequestedDate = () => {
        setSortByRequestedDate(!sortByRequestedDate);
    };

    const handleSortByProgress = () => {
        setSortByProgress(!sortByProgress);
    };

    //Export whole Table as a CSV
    const exportToCSV = () => {
        // Define column headers in desired order
        const headers = ["Order ID", "Medicine ID", "Medicine Name", "Priority", "Amount", "Requested Date", "Manufactured Date", "Progress"];

        // Create CSV content with headers
        let csvContent = "data:text/csv;charset=utf-8," + headers.join(",") + "\n";

        // Add rows to CSV content
        csvContent += manufactureReqData
            .map((row: any) => {
                const formattedRow = [
                    row.id,
                    row.Medicine?.Item?.id,
                    row.Medicine?.Item?.name,
                    row.isPriority ? 'Is Priority' : 'Not Priority',
                    row.amount,
                    row.createdAt ? formatDate(row.createdAt) : '',
                    row.progress === "Completed" || row.progress === "Rejected" || row.progress === "Manufacture Error" ?
                        formatDate(row.updatedAt) : '',
                    row.progress
                ].join(",");
                return formattedRow;
            })
            .join("\n");

        // Encode CSV content URI
        const encodedUri = encodeURI(csvContent);

        // Create link element and trigger download
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "all_manufacture_requests.csv");
        document.body.appendChild(link);
        link.click();
    };

    return (
        <div>
            <Typography color='primary' align="center" variant="h5">
                Manage Manufacture Requests
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }} my={2} mx={2} >
                <SearchBar onChange={(q) => setSearchQuery(q)} />
                <Box>
                    <Tooltip title="Download table as PDF" arrow>
                        <PictureAsPdfIcon fontSize='large' htmlColor='rgba(0, 58, 43, 0.8)' onClick={() => toPDF()} />
                    </Tooltip>
                    <Tooltip title="Export table as CSV" arrow>
                        <IconButton onClick={exportToCSV}>
                            <AssignmentReturnedSharpIcon fontSize='large' />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            {/* <Box flexGrow={1}></Box> */}
            <Paper sx={{ marginTop: '2rem', width: '100%', overflow: 'hidden' }} ref={targetRef} >
                <Typography color='primary' align="center" variant="h6" gutterBottom>
                    Manage Manufacture Requests Table
                </Typography>
                <TableContainer sx={{ maxHeight: 440 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Order ID</TableCell>
                                <TableCell>Medicine Name</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Requested Date
                                    <IconButton onClick={handleSortByRequestedDate}>
                                        {sortByRequestedDate ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                                    </IconButton>
                                </TableCell>
                                <TableCell>Manufactured Date</TableCell>
                                <TableCell>Progress
                                    <IconButton onClick={handleSortByProgress}>
                                        {sortByProgress ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />}
                                    </IconButton>
                                </TableCell>
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
                                .sort((a: any, b: any) => {
                                    if (sortByRequestedDate) {
                                        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                                    }
                                    if (sortByProgress) {
                                        return a.progress.localeCompare(b.progress);
                                    }
                                    return 0;
                                })
                                .map((row: any) => {
                                    if (row.progress !== "Pending") {
                                        return (
                                            <TableRow hover role="checkbox" key={row.id} sx={{ backgroundColor: colorIndicator(row.progress) }}
                                                onClick={() => {
                                                    setUpdateRequest(row);
                                                    handleOpen();
                                                }}
                                            >
                                                <TableCell>{row.id}</TableCell>
                                                <TableCell>{row.Medicine?.Item?.name}</TableCell>
                                                <TableCell>{row.amount}</TableCell>
                                                <TableCell>{formatDate(row.createdAt)}</TableCell>
                                                <TableCell>{row.progress === "Completed" || row.progress === "Rejected" || row.progress === "Manufacture Error" ?
                                                    formatDate(row.updatedAt) : ''}</TableCell>
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
            <MedicineRequestModal open={open} handleClose={handleClose} updateRequest={updateRequest} updateProgress={updateProgress} /*deleteManufactureRequest={deleteManufactureRequest}*/ />

        </div >
    )
}

export default ManageManufactureRequest;
