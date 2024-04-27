
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Box, CircularProgress, IconButton } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

function MedicineMaterialTable(): any {
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>

            <TableContainer sx={{ maxHeight: "80vh" }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell size="small">ID</TableCell>
                            <TableCell>Madicene Name</TableCell>
                            <TableCell>Created Date</TableCell>
                            <TableCell>Unit</TableCell>
                            <TableCell size="medium">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>

                        <TableRow hover role="checkbox" tabIndex={-1}
                        >
                            <TableCell size="small"></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell size="medium">
                                <IconButton
                                    color='success'
                                    size='small'
                                >
                                    <MoreVertIcon />
                                </IconButton>
                                <IconButton
                                    color='primary'
                                    size='small'
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
                        <TableRow>
                            <TableCell rowSpan={2} colSpan={6}>
                                <Box width={"100%"} display={"flex"} flexDirection={"column"} sx={{ alignItems: "center" }}>
                                    <CircularProgress />
                                </Box>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
}
export default MedicineMaterialTable;