import React, { useMemo, useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Paper,
  IconButton,
  Chip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import DeleteIcon from "@mui/icons-material/Delete";
import { LeaveRequestData } from "../../types";

interface LeaveRequestTableProps {
  leaveRequests: LeaveRequestData[];
  handleAction: (index: number, approve: boolean) => void;
  handleDelete: (index: number) => void;
  type: "Pending" | "Processed" | "All";
}

const LeaveRequestTable: React.FC<LeaveRequestTableProps> = ({
  leaveRequests,
  handleAction,
  handleDelete,
  type,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const rows = useMemo((): LeaveRequestData[] => {
    let data = leaveRequests;

    if (type === "Pending") {
      data = data.filter((v) => v.status === "Pending");
    } else if (type === "Processed") {
      data = data.filter(
        (v) => v.status === "Rejected" || v.status === "Approved"
      );
    }

    if (rowsPerPage > 0) {
      data = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }

    return data;
  }, [leaveRequests, page, rowsPerPage, type]);

  console.log(rows);
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Leave ID</TableCell>
            <TableCell align="center">Staff Name</TableCell>
            <TableCell align="center">Reason</TableCell>
            <TableCell align="center">Leave Type</TableCell>
            <TableCell align="center">Start Date</TableCell>
            <TableCell align="center">End Date</TableCell>
            <TableCell align="center">Registration</TableCell>
            <TableCell align="center">Hours</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              <TableCell align="center">{row.id}</TableCell>
              <TableCell align="center">{row.Staff?.name}</TableCell>
              <TableCell align="center">{row.reason}</TableCell>
              <TableCell align="center">{row.LeaveType?.name}</TableCell>
              <TableCell align="center">{row.start_date}</TableCell>
              <TableCell align="center">{row.end_date}</TableCell>
              <TableCell align="center">{row.registration}</TableCell>
              <TableCell align="center">{row.hours}</TableCell>
              <TableCell align="center">
                <Chip
                  label={row.status}
                  color={
                    row.status === "Approved"
                      ? "success"
                      : row.status === "Rejected"
                      ? "error"
                      : "warning"
                  }
                />
              </TableCell>
              <TableCell align="center">
                <>
                  <IconButton
                    onClick={() => handleAction(row.id, true)}
                    aria-label="accept"
                    disabled={row.status === "Approved"}
                    color="success"
                  >
                    <CheckCircleIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleAction(row.id, false)}
                    aria-label="reject"
                    disabled={row.status === "Rejected"}
                    color="error"
                  >
                    <CancelIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handleDelete && handleDelete(row.id)}
                    aria-label="delete"
                    disabled={row.status !== "Pending"}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={9} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={9}
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
  );
};

export default LeaveRequestTable;
