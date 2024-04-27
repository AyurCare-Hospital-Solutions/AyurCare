import React, { useState } from "react";
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
import axios from "axios";
import { enqueueSnackbar } from "notistack";

interface LeaveRequestTableProps {
  leaveRequests: LeaveRequestData[];
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => void;
  page: number;
  rowsPerPage: number;
  pendingView: boolean;
}

const LeaveRequestTable: React.FC<LeaveRequestTableProps> = ({
  leaveRequests,
  onPageChange,
  page,
  rowsPerPage,
  pendingView,
}) => {
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - leaveRequests.length) : 0;

  const [rows, setRows] = useState([]);
  const handleAccept = async (index: number) => {
    try {
      const leaveRequest = leaveRequests[index];
      const requestData = {
        id: leaveRequest.id,
        status: "Approved",
        startDate: leaveRequest.start_date,
        endDate: leaveRequest.end_date,
        type: leaveRequest.LeaveType.id,
        hours: leaveRequest.hours,
        registration: leaveRequest.registration,
        reason: leaveRequest.reason,
      };

      console.log(requestData);

      const response = await axios.put(
        `/api/hrms/leave/${leaveRequest.id}`,
        requestData
      );
      if (response.status === 200) {
        leaveRequest.status = "Approved";

        enqueueSnackbar("Leave request approved", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar("Error approving leave request", { variant: "error" });
    }
  };

  const handleReject = async (index: number) => {
    try {
      const leaveRequest = leaveRequests[index];
      const requestData = {
        id: leaveRequest.id,
        status: "Approved",
        startDate: leaveRequest.start_date,
        endDate: leaveRequest.end_date,
        type: leaveRequest.LeaveType.id,
        hours: leaveRequest.hours,
        registration: leaveRequest.registration,
        reason: leaveRequest.reason,
      };

      const response = await axios.put(
        `/api/hrms/leave/${leaveRequest.id}`,
        requestData
      );
      if (response.status === 200) {
        leaveRequest.status = "Approved";

        enqueueSnackbar("Leave request approved", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar("Error approving leave request", { variant: "error" });
    }
  };

  const handleDelete = async (index: number) => {
    try {
      const leaveRequest = leaveRequests[index];
      const response = await axios.delete(`/api/hrms/leave/${leaveRequest.id}`);
      if (response.status === 200) {
        leaveRequests.splice(index, 1);
        enqueueSnackbar("Leave request deleted", { variant: "success" });
      }
    } catch (error) {
      enqueueSnackbar("Error deleting leave request", { variant: "error" });
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="custom pagination table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Staff ID</TableCell>
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
          {(rowsPerPage > 0
            ? leaveRequests.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              )
            : leaveRequests
          ).map((row, index) => (
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
                {pendingView && (
                  <>
                    <IconButton
                      onClick={() => handleAccept(index)}
                      aria-label="accept"
                      disabled={row.status !== "Pending"}
                    >
                      <CheckCircleIcon style={{ color: "green" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleReject(index)}
                      aria-label="reject"
                      disabled={row.status !== "Pending"}
                    >
                      <CancelIcon style={{ color: "red" }} />
                    </IconButton>
                  </>
                )}
                {!pendingView && (
                  <>
                    <IconButton
                      onClick={() => handleAccept(index)}
                      aria-label="accept"
                      disabled={row.status !== "Pending"}
                    >
                      <CheckCircleIcon style={{ color: "green" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleReject(index)}
                      aria-label="reject"
                      disabled={row.status !== "Pending"}
                    >
                      <CancelIcon style={{ color: "red" }} />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete && handleDelete(index)}
                      aria-label="delete"
                    >
                      <DeleteIcon style={{ color: "red" }} />
                    </IconButton>
                  </>
                )}
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
