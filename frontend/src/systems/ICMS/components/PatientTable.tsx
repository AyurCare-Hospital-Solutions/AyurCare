import { Launch } from "@mui/icons-material"
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Tooltip, TableFooter, TablePagination } from "@mui/material"
import TableLoader from "../../../components/TableLoader"
import { useMemo, ChangeEvent, useState } from "react"
import { useNavigate } from "react-router"
import { Admission } from "../types"

const PatientTable = ({ loading, print, search, data }: { loading: boolean, print?: boolean, search?: RegExp, data: Admission[] }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(print ? -1 : 10);

    const navigator = useNavigate();

    const rows = useMemo(() => {
        if (search) {
            return data?.filter((v) => {
                return v.Patient.name.search(search) !== -1;
            })
        }
        return data;

    }, [data, search]);

    let emptyRows = 0;
    if (page > 0 || rows.length < rowsPerPage)
        emptyRows = Math.max(0, (1 + page) * rowsPerPage - rows.length);
    else if (!loading && rows.length == 0)
        emptyRows = rowsPerPage - 1;

    const handleChangePage = (_: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };


    return <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} >
            <TableHead>
                <TableRow>
                    <TableCell>Admission No</TableCell>
                    <TableCell>Patient Name</TableCell>
                    <TableCell size='small'>Ward</TableCell>
                    <TableCell size='small' sx={{ pr: 0 }}>Bed No</TableCell>
                    <TableCell sx={{ maxWidth: "32px", pl: 0 }}></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {(rowsPerPage > 0
                    ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    : rows
                ).map((row) => (
                    <TableRow key={row.id}
                        sx={{ height: "58px" }}
                        hover={true} onClick={() => navigator("/icms/patient/" + row.id)}>
                        <TableCell >
                            {row.id}
                        </TableCell>
                        <TableCell scope="row">
                            {row.Patient.name}
                        </TableCell>
                        <TableCell size='small'>
                            {row.Bed?.Ward?.name}
                        </TableCell>
                        <TableCell size='small' sx={{ pr: 0 }}>
                            {row.Bed?.number}
                        </TableCell>
                        <TableCell sx={{ maxWidth: "32px", pl: 0, display: print ? "none" : "" }}>
                            <Tooltip title="View Patient Details">
                                <Launch sx={{ fontSize: "1.24em" }} />
                            </Tooltip>
                        </TableCell>
                    </TableRow>
                ))}
                {!loading && rows.length == 0 ? <TableRow>
                    <TableCell colSpan={5} sx={{ borderBottom: "none" }}>No Patients Found</TableCell>
                </TableRow> : null}
                {loading ? <TableLoader columns={5} /> : null}
                {emptyRows > 0 && (
                    <TableRow style={{ height: 58 * emptyRows }}>
                        <TableCell colSpan={6} />
                    </TableRow>
                )}
            </TableBody>
            <TableFooter>
                <TableRow sx={{ display: print ? "none" : "" }}>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, { label: 'All', value: -1 }]}
                        colSpan={3}
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    </TableContainer>
}

export default PatientTable;