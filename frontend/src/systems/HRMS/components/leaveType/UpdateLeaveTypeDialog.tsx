import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";

interface Row {
  id: number;
  name: string;
  hours: string;
}

export default function UpdateLeaveTypeDialog({
  selectedRowId,
  handleClose,
  open,
}: {
  selectedRowId: number | null;
  handleClose: () => void;
  open: boolean;
}) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  const handleSubmit = async () => {
    try {
      await axios.put(`/api/hrms/leaveType/${selectedRowId}`, {
        name: name,
        hours: duration,
      });
      handleClose();
    } catch (error) {
      console.error("Error updating leave type:", error);
    }
  };

  const handleModalClose = () => {
    setName("");
    setDuration("");
    handleClose();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (selectedRowId !== null) {
          const response = await axios.get<Row>(
            `/api/hrms/leaveType/${selectedRowId}`
          );
          setName(response.data.name);
          setDuration(response.data.hours);
        }
      } catch (error) {
        console.error("Error fetching leave type data:", error);
      }
    };

    fetchData();
  }, [selectedRowId]);

  return (
    <Dialog
      open={open}
      onClose={handleModalClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          handleSubmit();
        },
      }}
    >
      <DialogTitle>Update Leave Type</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Update the leave type and its duration.
        </DialogContentText>

        <TextField
          autoFocus
          required
          margin="dense"
          name="name"
          label="Leave Type Name"
          type="text"
          variant="standard"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />

        <TextField
          autoFocus
          required
          margin="dense"
          name="duration"
          label="Duration (hours)"
          type="text"
          variant="standard"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={{ textAlign: "right", width: "fit-content" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose}>Cancel</Button>
        <Button type="submit">Update Leave Type</Button>
      </DialogActions>
    </Dialog>
  );
}
