import { useState } from "react";
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
import UpdateShiftTypeDialog from "./UpdateShiftTypeDialog";
import { ShiftTypeData } from "../../types";
import { Dayjs } from "dayjs";

const ShiftTypeTable = ({
  rows,
  deleteShiftType,
  updateShiftType,
}: {
  rows: ShiftTypeData[];
  deleteShiftType: (id: number) => void;
  updateShiftType: (
    row: ShiftTypeData,
    name: string,
    startTime: Dayjs,
    endTime: Dayjs
  ) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ShiftTypeData | null>(null);

  const handleEdit = (row: ShiftTypeData) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleUpdate = (name: string, startTime: Dayjs, endTime: Dayjs) => {
    if (selectedRow !== null) {
      updateShiftType(selectedRow, name, startTime, endTime);
      setOpen(false);
    }
  };

  return (
    <>
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
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell style={{ flexGrow: 1 }}>{row.name}</TableCell>
                <TableCell style={{ flexGrow: 1 }}>{row.startTime}</TableCell>
                <TableCell style={{ flexGrow: 1 }}>{row.endTime}</TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    style={{ color: "black" }}
                    onClick={() => handleEdit(row)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    aria-label="delete"
                    onClick={() => deleteShiftType(row.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <UpdateShiftTypeDialog
        shiftData={selectedRow}
        handleClose={() => setOpen(false)}
        open={open}
        onSubmit={handleUpdate}
      />
    </>
  );
};

export default ShiftTypeTable;
