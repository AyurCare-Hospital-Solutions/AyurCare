import { useState } from "react";
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
import UpdateLeaveTypeDialog from "./UpdateLeaveTypeDialog";
import { LeaveTypeData } from "../../types";
import { Box } from "@mui/material";

export default function LeaveTypeTable({
  rows,
  deleteLeaveType,
  updateLeaveType,
}: {
  rows: LeaveTypeData[];
  deleteLeaveType: (id: number) => void;
  updateLeaveType: (row: LeaveTypeData, name: string, duration: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<LeaveTypeData | null>(null);
  const handleEdit = (row: LeaveTypeData) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleUpdate = (name: string, duration: number) => {
    if (selectedRow !== null) {
      updateLeaveType(selectedRow, name, duration);
      setOpen(false);
    }
  };

  return (
    <>
      <Box sx={{ m: 4 }}>
        <TableContainer component={Paper} sx={{ mx: "auto" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={{ flex: "0 0 50px" }}>ID</TableCell>
                <TableCell style={{ flex: "1 1 auto" }}>Leave Type</TableCell>
                <TableCell style={{ flex: "0 0 100px" }}>Hours</TableCell>
                <TableCell style={{ flex: "0 0 " }}></TableCell>
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
                  <TableCell sx={{ display: "flex" }}>
                    <IconButton
                      color="primary"
                      aria-label="edit"
                      onClick={() => handleEdit(row)}
                      sx={{ ml: "auto" }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      aria-label="delete"
                      onClick={() => deleteLeaveType(row.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <UpdateLeaveTypeDialog
          selectedRow={selectedRow}
          handleClose={() => setOpen(false)}
          open={open}
          onSubmit={handleUpdate}
        />
      </Box>
    </>
  );
}
