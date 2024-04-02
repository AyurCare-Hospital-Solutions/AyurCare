import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, CircularProgress, IconButton, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

function AccessoriesTable({ accessorydata, query, setUpdatedAccessory, handleUpdateOpen }: { accessorydata: any, query: string, setUpdatedAccessory: (arg: any) => any, handleUpdateOpen:()=> any }) {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    // stock indicator
    const colorIndicator = (amount: number) => {
        if (amount === 0) {
            return '#ff7979';
        }
        else {
            return '';
        }
    }

    return (
        <Paper sx={{ width: '100%' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" >
                                ID
                            </TableCell>
                            <TableCell align="center">
                                Name
                            </TableCell>
                            <TableCell align="center" >
                                Amount
                            </TableCell>
                            <TableCell align="center">
                                Re-Order Buffer
                            </TableCell>
                            <TableCell align="center">
                                Unit
                            </TableCell>
                            <TableCell align="center" colSpan={3}>
                                Action
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accessorydata ? accessorydata
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .filter((row: any) => {
                                if (query) {
                                    return (row.Item.name.startsWith(query));
                                }

                                else {
                                    return row;
                                }
                            })
                            .map((row: any) => {
                                return (
                                    <TableRow hover sx={{backgroundColor:colorIndicator(row.amount)}} role="checkbox" tabIndex={-1} key={row.id}>
                                        <TableCell align="center" >
                                            {row.id}
                                        </TableCell>
                                        <TableCell align="center" >
                                            {row.Item.name}
                                        </TableCell>
                                        <TableCell align="center" >
                                            {row.amount}
                                        </TableCell>
                                        <TableCell align="center" >
                                            {row.Item.reOrderBuffer}
                                        </TableCell>
                                        <TableCell align="center" >
                                            {row.Item.unit}
                                        </TableCell>
                                        <TableCell align="center" >
                                            <IconButton
                                                color='primary'
                                                size='small'
                                                onClick={()=>{
                                                    setUpdatedAccessory(row);
                                                    handleUpdateOpen();
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color='secondary'
                                                size='small'
                                            >
                                                <DeleteForeverIcon />
                                            </IconButton>

                                        </TableCell>
                                    </TableRow>
                                );
                            })
                            :
                            <TableRow>
                                <TableCell rowSpan={2} colSpan={6}>
                                    <Box width={"100%"} display={"flex"} flexDirection={"column"} sx={{ alignItems: "center" }}>
                                        <CircularProgress />
                                    </Box>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={accessorydata ? accessorydata.length : 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
            <Box mx={10} my={1} display='flex'>
                <Box height='15px' width='15px' mx={1} sx={{ backgroundColor: '#ff7979' }}></Box> <Typography>Accessories out-of-stock</Typography>
            </Box>
        </Paper>
    );
}

export default AccessoriesTable
