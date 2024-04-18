import { useEffect, useState } from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';

interface Row {
  id: number;
  name: string;
  hours: string;
}

export default function LeaveTypeTable() {
  const [rows, setRows] = useState<Row[]>([]);

  useEffect(() => {
    fetchLeaveTypes();
  }, []);

  const fetchLeaveTypes = async () => {
    try {
      const response = await axios.get<Row[]>('/api/hrms/leaveType');
      setRows(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleEdit = (id: number) => {
    // Redirect or show edit dialog for the leave type with this id
    console.log(`Editing row with ID: ${id}`);
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`/api/hrms/leaveType/${id}`);
      setRows(prevRows => prevRows.filter(row => row.id !== id));
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell style={{ flex: '0 0 50px' }}>ID</TableCell>
            <TableCell style={{ flex: '1 1 auto' }}>Leave Type</TableCell>
            <TableCell style={{ flex: '0 0 100px' }}>Hours</TableCell>
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
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.hours}</TableCell>
              <TableCell>
                <IconButton
                  color="secondary"
                  aria-label="delete"
                  onClick={() => handleDelete(row.id)}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  color="primary"
                  aria-label="edit"
                  onClick={() => handleEdit(row.id)}
                >
                  <EditIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
