import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const data = [
  {
    id: 1,
    name: "John",
    startTime: "9:00 AM",
    endTime: "5:00 PM",
    designation: "Manager",
  },
  {
    id: 2,
    name: "Alice",
    startTime: "10:00 AM",
    endTime: "6:00 PM",
    designation: "Developer",
  },
  // Add more data as needed
];

const ShiftTypeTable = () => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell style={{ flexGrow: 1 }}>Name</TableCell>
            <TableCell style={{ flexGrow: 1 }}>Start Time</TableCell>
            <TableCell style={{ flexGrow: 1 }}>End Time</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.id}</TableCell>
              <TableCell style={{ flexGrow: 1 }}>{row.name}</TableCell>
              <TableCell style={{ flexGrow: 1 }}>{row.startTime}</TableCell>
              <TableCell style={{ flexGrow: 1 }}>{row.endTime}</TableCell>
              <TableCell align="right">
                <IconButton aria-label="edit" style={{ color: "black" }}>
                  <EditIcon />
                </IconButton>
                <IconButton aria-label="delete" style={{ color: "red" }}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ShiftTypeTable;
