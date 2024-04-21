import { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import UpdateLeaveTypeDialog from "./UpdateLeaveTypeDialog"; // Import the UpdateLeaveTypeDialog component
import { LeaveTypeData } from "../../types";

export default function LeaveTypeTable({
  rows,
  deleteLeaveType,
  updateLeaveType,
}: {
  rows: LeaveTypeData[];
  deleteLeaveType: (id: number) => void;
  updateLeaveType: (row: LeaveTypeData, name: string, duration: number) => void;
}) {
  const [open, setOpen] = useState(false); // State for modal
  const [selectedRow, setSelectedRow] = useState<LeaveTypeData | null>(null); // State for selected row ID

  const handleEdit = (row: LeaveTypeData) => {
    setSelectedRow(row); // Set the selected row ID
    setOpen(true); // Open the modal
  };

  const handleUpdate = (name: string, duration: number) => {
    if (selectedRow !== null) {
      updateLeaveType(selectedRow, name, duration); // Call updateLeaveType function
      setOpen(false); // Close the modal
    }
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell style={{ flex: "0 0 50px" }}>ID</TableCell>
              <TableCell style={{ flex: "1 1 auto" }}>Leave Type</TableCell>
              <TableCell style={{ flex: "0 0 100px" }}>Hours</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.hours}</TableCell>
                <TableCell>
                  <IconButton
                    color="secondary"
                    aria-label="delete"
                    onClick={() => deleteLeaveType(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    aria-label="edit"
                    onClick={() => handleEdit(row)}
                  >
                    <EditIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Render UpdateLeaveTypeDialog component with props */}
      <UpdateLeaveTypeDialog
        selectedRow={selectedRow} // Pass selected row ID as prop
        handleClose={() => setOpen(false)} // Pass handleClose function
        open={open} // Pass open state
        onSubmit={handleUpdate} // Pass handleUpdate function
      />
    </div>
  );
}
