import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useState, ChangeEvent, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Admission, AdmissionListSchema } from './types';
import { Box, FormControlLabel, Switch, TableHead, Typography } from '@mui/material';
import SearchInput from './components/SearchInput';
import { useNavigate } from 'react-router-dom';





const PatientList = () => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [data, setData] = useState<Admission[]>([]);
    const [search, setSearch] = useState<string>();
    const [admittedOnly, setAdmittedOnly] = useState(true);

    const navigator = useNavigate();

    const rows = useMemo(() => {
        if (search) {
            let filter = RegExp(search);
            return data?.filter((v) => {
                return v.Patient.name.search(filter) !== -1;
            })
        }
        return data;

    }, [data, search]);

    useEffect(() => {
        axios.get(`/api/icms/patients?admitted=${admittedOnly}`).then((res) => {
            setData(AdmissionListSchema.cast(res.data));
        })
    }, [admittedOnly])

    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (_: any, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return <>
        <Typography variant="h5" mx={1} my={2}>Patients</Typography>

        <Box sx={{ display: "flex" }} my={4} mx={2}>
            <SearchInput onChange={(s) => setSearch(s)} ></SearchInput>
            <FormControlLabel sx={{ my: "auto", ml: "auto" }} control={
                <Switch value={admittedOnly} onChange={(_, v) => setAdmittedOnly(!v)} />
            } label="Show Discharged patients" labelPlacement="end" />
        </Box>

        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
                <TableHead>
                    <TableRow>
                        <TableCell>Admission No</TableCell>
                        <TableCell>Patient Name</TableCell>
                        <TableCell size='small'>Ward</TableCell>
                        <TableCell size='small'>Bed No</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(rowsPerPage > 0
                        ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        : rows
                    ).map((row) => (
                        <TableRow key={row.id} hover={true} onClick={() => navigator("/icms/patient/" + row.id)}>
                            <TableCell >
                                {row.id}
                            </TableCell>
                            <TableCell component="th" scope="row">
                                {row.Patient.name}
                            </TableCell>
                            <TableCell size='small'>
                                {row.Bed.Ward.name}
                            </TableCell>
                            <TableCell size='small'>
                                {row.Bed.id}
                            </TableCell>
                        </TableRow>
                    ))}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                            <TableCell colSpan={6} />
                        </TableRow>
                    )}
                    {rows.length > 0 ? null : <TableRow>
                        <TableCell colSpan={4}>No Patients Found</TableCell>
                    </TableRow>}
                </TableBody>
                <TableFooter>
                    <TableRow>
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
    </>

}



export default PatientList;