import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TableLoader from '../../../components/TableLoader';



export default function MedicineTable({medicine} : {medicine: any}) {

return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell > Medicine No</TableCell>
            <TableCell > Medicine Name</TableCell>
            <TableCell > Expiry Date</TableCell>
            <TableCell > Stock Level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {
                medicine? medicine.map((row: any) => {
                    return <TableRow>
                        <TableCell> {row.id} </TableCell>
                        <TableCell> {row.Medicine.Item.name} </TableCell>
                        <TableCell> {row.expire_date} </TableCell>
                        <TableCell> {row.id} </TableCell>
                    </TableRow>
                })
                
                
                
                
                
                
                : <TableLoader columns={5} />
            }
        </TableBody>
      </Table>
    </TableContainer>
  );
}
