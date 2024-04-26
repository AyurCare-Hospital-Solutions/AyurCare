import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


export default function ManufactureRequestTable({ manufactureReqData, deleteManufactureRequest }: { manufactureReqData: any, deleteManufactureRequest: (arg: number) => any }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);


    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const colorIndicator = (progress: string) => {
        if (progress === 'Rejected' || progress === 'Manufacture Error') {
            return '#ff7979';
        } else if (progress === 'Completed') {
            return '#4aee78';
        }
    }

    return (
        <Paper sx={{ marginTop: '1rem', width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Medicine Name</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Requested Date</TableCell>
                            <TableCell>Manufactured Date</TableCell>
                            <TableCell>Status</TableCell>
                            <center><TableCell>Action</TableCell></center>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {manufactureReqData
                            .toReversed()
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: any) => {
                                console.log(row);

                                return (
                                    <TableRow hover role="checkbox" key={row.id} sx={{ backgroundColor: colorIndicator(row.progress) }}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.Medicine.Item?.name}</TableCell>
                                        <TableCell>{row.amount}</TableCell>
                                        <TableCell>{row.createdAt.slice(0, 19)}</TableCell>
                                        <TableCell>{row.progress === "Completed" ? row.updatedAt.slice(0, 19) : ''}</TableCell>
                                        <TableCell>{row.progress}</TableCell>
                                        <center><IconButton
                                            color='secondary'
                                            size='small'
                                            disabled={row.progress !== "Pending"}
                                            onClick={() => {
                                                deleteManufactureRequest(row.id);
                                            }}
                                        >
                                            <DeleteForeverIcon />
                                        </IconButton></center>
                                    </TableRow>
                                );
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
    );
}

