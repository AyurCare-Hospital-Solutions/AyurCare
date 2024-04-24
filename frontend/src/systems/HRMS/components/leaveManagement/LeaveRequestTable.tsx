// LeaveRequestTable.tsx

import React from "react";
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
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";

interface LeaveRequest {
  name: string;
  reason: string;
  start_date: string;
  end_date: string;
  registration: string;
  hours: number;
}

interface LeaveRequestTableProps {
  leaveRequests: LeaveRequest[];
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
  page: number;
  rowsPerPage: number;
  handleAccept: (index: number) => void;
  handleReject: (index: number) => void;
  pendingView: boolean;
}

const LeaveRequestTable: React.FC<LeaveRequestTableProps> = ({
  leaveRequests,
  onPageChange,
  page,
  rowsPerPage,
  handleAccept,
  handleReject,
  pendingView,
}) => {
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - leaveRequests.length) : 0;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell>Staff Name</TableCell>
            <TableCell align="right">Reason</TableCell>
            <TableCell align="right">Start Date</TableCell>
            <TableCell align="right">End Date</TableCell>
            <TableCell align="right">Registration</TableCell>
            <TableCell align="right">Hours</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? leaveRequests.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : leaveRequests
          ).map((row, index) => (
            <TableRow key={index}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.reason}</TableCell>
              <TableCell align="right">{row.start_date}</TableCell>
              <TableCell align="right">{row.end_date}</TableCell>
              <TableCell align="right">{row.registration}</TableCell>
              <TableCell align="right">{row.hours}</TableCell>
              <TableCell align="right">
                {/* Edit button */}
                <IconButton disabled={pendingView} aria-label="edit">
                  <EditIcon style={{ color: "blue" }} />
                </IconButton>
                {/* Accept button */}
                <IconButton
                  onClick={() => handleAccept(index)}
                  aria-label="accept"
                >
                  <CheckCircleIcon style={{ color: "green" }} />
                </IconButton>
                {/* Reject button */}
                <IconButton
                  onClick={() => handleReject(index)}
                  aria-label="reject"
                >
                  <CancelIcon style={{ color: "red" }} />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={7} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
              colSpan={7}
              count={leaveRequests.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onPageChange}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default LeaveRequestTable;
