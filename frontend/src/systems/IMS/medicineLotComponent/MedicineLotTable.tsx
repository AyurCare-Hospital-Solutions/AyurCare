import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import axios from 'axios';

function MedicineLotTable({ id }: { id: number }) {
    const [medicineLotData, setMedicineLotData] = useState([]);
    // get medidcine lot data
    const getMedicineLot = () => {
        if (id === undefined) {
            return;
        }
        axios.get(`/api/ims/medicineLot/${id}`)
            .then((res: any) => {
                setMedicineLotData(res.data);
                console.log(res.data);

            })
    }

    useEffect(() => {
        getMedicineLot();
    }, [id])

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 50 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Manufacturer</TableCell>
                        <TableCell align="center">Amount</TableCell>
                        <TableCell align="center">Expire date</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {medicineLotData.map((row: any) => (
                        <TableRow
                            hover
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center" component="th" scope="row">
                                {row.manufacturer}
                            </TableCell>
                            <TableCell align="center">{row.amount}</TableCell>
                            <TableCell align="right">{row.expire_date}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default MedicineLotTable
