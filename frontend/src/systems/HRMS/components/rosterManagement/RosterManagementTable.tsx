import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Column {
  id: "id" | "date" | "type" | "doctor" | "nurse" | "others" | "status"; // New column IDs
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "ID", minWidth: 100 },
  { id: "date", label: "Date", minWidth: 170 },
  { id: "type", label: "Type", minWidth: 170 },
  { id: "doctor", label: "Doctor", minWidth: 170 },
  { id: "nurse", label: "Nurse", minWidth: 170 },
  { id: "others", label: "Others", minWidth: 170 },
  { id: "status", label: "Status", minWidth: 170 },
];

interface Data {
  id: number;
  date: string;
  type: string;
  doctor: number;
  nurse: number;
  others: number;
  status: string;
}

function createData(
  id: number,
  date: string,
  type: string,
  doctor: number,
  nurse: number,
  others: number,
  status: string
): Data {
  return { id, date, type, doctor, nurse, others, status };
}

const rows = [
  createData(1, "2024-05-10", "Surgery", 5, 8, 2, "Completed"),
  createData(2, "2024-05-09", "Checkup", 3, 6, 1, "Pending"),
  createData(3, "2024-05-08", "Emergency", 7, 4, 3, "In Progress"),
  createData(4, "2024-05-07", "Consultation", 4, 5, 2, "Completed"),
  createData(5, "2024-05-06", "Routine", 6, 7, 2, "Pending"),
  createData(6, "2024-05-05", "Treatment", 5, 3, 2, "In Progress"),
  createData(7, "2024-05-04", "Follow-up", 2, 4, 1, "Completed"),
  createData(8, "2024-05-03", "Therapy", 3, 6, 2, "Pending"),
  createData(9, "2024-05-02", "Medication", 4, 5, 3, "In Progress"),
  createData(10, "2024-05-01", "Diagnostic", 6, 7, 2, "Completed"),
  createData(11, "2024-04-30", "Screening", 5, 3, 2, "Pending"),
  createData(12, "2024-04-29", "Rehabilitation", 2, 4, 1, "In Progress"),
  createData(13, "2024-04-28", "Counseling", 3, 6, 2, "Completed"),
  createData(14, "2024-04-27", "Observation", 4, 5, 3, "Pending"),
  createData(15, "2024-04-26", "Intervention", 6, 7, 2, "In Progress"),
];

export default function RosterManagementTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
