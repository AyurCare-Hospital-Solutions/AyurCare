import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const ViewLeaveRequestModal = ({ open, handleClose, leaveRequest }) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>View Leave Request</DialogTitle>
      <DialogContent>
        <p>Staff ID: {leaveRequest.id}</p>
        <p>Staff Name: {leaveRequest.name}</p>
        <p>Leave Type: {leaveRequest.leaveType}</p>
        <p>Start Date: {leaveRequest.startDate}</p>
        <p>End Date: {leaveRequest.endDate}</p>
        <p>Registration: {leaveRequest.registration}</p>
        <p>Hours: {leaveRequest.hours}</p>
        <p>Status: {leaveRequest.status}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewLeaveRequestModal;
