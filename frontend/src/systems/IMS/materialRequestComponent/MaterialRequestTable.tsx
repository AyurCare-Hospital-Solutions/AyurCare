import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

export default function MaterialRequestTable({ materialReqData }: { materialReqData: any }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (_event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const colorIndicator = (status: string) => {
        if (status === 'Rejected') {
            return '#ff7979';
        }
        else if (status === 'Accepted') {
            return '#4aee78';
        }
    }

    return (
        <Paper sx={{ marginTop: '1rem', width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Request ID</TableCell>
                            <TableCell>Material</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Unit</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {materialReqData
                            .toReversed()
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row: any) => {
                                return (
                                    <TableRow hover role="checkbox" key={row.id} sx={{ backgroundColor: colorIndicator(row.status) }}>
                                        <TableCell>{row.id}</TableCell>
                                        <TableCell>{row.Material.Item.name}</TableCell>
                                        <TableCell>{row.amount}</TableCell>
                                        <TableCell>{row.Material.Item.unit}</TableCell>
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
                count={materialReqData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}