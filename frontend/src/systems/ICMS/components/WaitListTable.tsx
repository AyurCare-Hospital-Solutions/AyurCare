import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TablePagination } from "@mui/material";
import TableLoader from "../../../components/TableLoader";
import { WaitList } from "../types";
import { useState, ChangeEvent } from "react";


const WaitListTable = ({ rows, onSelect, loading }: { rows: WaitList[], onSelect: (l: WaitList) => void, loading: boolean }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return <Paper>
        <TableContainer >
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell size="small">Trk No</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell size="small">Priority</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        loading ? <TableLoader columns={3} /> : rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(v => {
                                return <TableRow key={v.id} hover={true} onClick={() => onSelect(v)} >
                                    <TableCell >{v.Patient.tracking_no}</TableCell>
                                    <TableCell>{v.Patient.name}</TableCell>
                                    <TableCell>{v.reason}</TableCell>
                                    <TableCell>{v.is_priority ? "Yes" : "No"}</TableCell>
                                </TableRow>
                            })
                    }

                    {
                        !loading && rows.length == 0 ? <TableRow>
                            <TableCell colSpan={3}>No records found</TableCell>
                        </TableRow> : undefined
                    }

                </TableBody>
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_: any, newPage) => { setPage(newPage) }}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>
};

export default WaitListTable;