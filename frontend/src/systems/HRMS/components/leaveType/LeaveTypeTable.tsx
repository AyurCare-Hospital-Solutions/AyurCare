import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  id: number,
  leaveType: string,
  duration: string,
) {
  return { id, leaveType, duration };
}

const rows = [
  createData(1, 'Sick Leave', '3 days'),
  createData(2, 'Vacation', '5 days'),
  createData(3, 'Maternity Leave', '12 weeks'),
  createData(4, 'Paternity Leave', '2 weeks'),
  createData(5, 'Sick Leave', '1 day'),
];

export default function LeaveTypeTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Leave Type</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.leaveType}</TableCell>
              <TableCell>{row.duration}</TableCell>
              <TableCell>Action Button</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
