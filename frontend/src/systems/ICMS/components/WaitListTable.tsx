import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Tooltip } from "@mui/material";
import TableLoader from "../../../components/TableLoader";
import { WaitList } from "../types";
import { useState, ChangeEvent, useMemo } from "react";
import { Launch } from "@mui/icons-material";


const WaitListTable = ({ data, onSelect, loading, search, print }: { data: WaitList[], onSelect: (l: WaitList) => void, search?: RegExp, loading: boolean, print?: boolean }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(print ? -1 : 10);

    const rows = useMemo(() => {
        if (search) {
            return data.filter((v) => {
                return v.Patient.name.search(search) !== -1 || v.Patient.tracking_no.search(search) !== -1 || v.reason.search(search) !== -1;
            })
        }
        return data;

    }, [data, search]);


    const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    let emptyRows = 0;
    if (page > 0 || rows.length < rowsPerPage)
        emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);
    else if (!loading && rows.length == 0)
        emptyRows = rowsPerPage;


    return <>
        <TableContainer component={Paper}>
            <Table >
                <TableHead>
                    <TableRow>
                        <TableCell size="small">Trk No</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Reason</TableCell>
                        <TableCell size="small" sx={{ pr: 0, maxWidth: "32px" }}>Priority</TableCell>
                        <TableCell sx={{ maxWidth: "32px", pl: 0 }}></TableCell>
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
                                    <TableCell sx={{ pr: 0, maxWidth: "32px" }}>{v.is_priority ? "Yes" : "No"}</TableCell>
                                    <TableCell sx={{ maxWidth: "32px", pl: 0, display: print ? "none" : "" }}>
                                        <Tooltip title="View Patient Details">
                                            <Launch sx={{ fontSize: "1.24em" }} />
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            })
                    }

                    {
                        !loading && rows.length == 0 ? <TableRow>
                            <TableCell colSpan={3}>No records found</TableCell>
                        </TableRow> : undefined
                    }
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 58 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <TablePagination
                sx={{ display: print ? "none" : "" }}
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(_: any, newPage) => { setPage(newPage) }}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </TableContainer>
    </>
};

export default WaitListTable;