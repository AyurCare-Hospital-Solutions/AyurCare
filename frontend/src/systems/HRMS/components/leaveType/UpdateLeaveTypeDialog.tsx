import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React from "react";
import { LeaveTypeData } from "../../types";

export default function UpdateLeaveTypeDialog({
  selectedRow,
  handleClose,
  open,
  onSubmit,
}: {
  selectedRow: LeaveTypeData | null;
  handleClose: () => void;
  open: boolean;
  onSubmit: (name: string, duration: number) => void;
}) {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");

  const [error, setError] = React.useState({
    nameError: "",
    durationError: "",
  });
  const [canSubmit, setCanSubmit] = React.useState(false);

  const updateName = (newName: string) => {
    let nameErrorMessage = "";

    if (newName === "") {
      nameErrorMessage = "Name cannot be empty";
    } else if (newName.length > 50) {
      nameErrorMessage = "Name cannot be longer than 50 characters";
    } else if (newName.length < 3) {
      nameErrorMessage = "Name must be at least 3 characters long";
    } else if (!/^[a-zA-Z ]+$/.test(newName)) {
      nameErrorMessage = "Name must contain only letters and spaces";
    }

    setName(newName);
    setError({ ...error, nameError: nameErrorMessage });
    setCanSubmit(nameErrorMessage === "" && error.durationError === "");
  };

  const updateDuration = (newDurationStr: string) => {
    const newDuration = parseFloat(newDurationStr);
    let durationErrorMessage = "";

    if (Number.isNaN(newDuration)) {
      durationErrorMessage = "Duration must be a number";
    } else if (newDuration <= 0) {
      durationErrorMessage = "Duration must be greater than 0";
    } else if (newDuration > 8) {
      durationErrorMessage = "Duration cannot be greater than 8 hours";
    }

    setDuration(newDurationStr);
    setError({ ...error, durationError: durationErrorMessage });
    setCanSubmit(error.nameError === "" && durationErrorMessage === "");
  };

  const handleModalClose = () => {
    setName("");
    setDuration("");
    handleClose();
  };

  useEffect(() => {
    if (selectedRow !== null) {
      setName(selectedRow.name);
      setDuration(selectedRow.hours.toString());
    }

    setError({ nameError: "", durationError: "" });
    setCanSubmit(false);
  }, [selectedRow]);

  return (
    <Dialog
      open={open}
      onClose={handleModalClose}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          onSubmit(name, parseFloat(duration));
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
          value={name}
          error={error.nameError !== ""}
          helperText={error.nameError}
          variant="standard"
          onChange={(e) => {
            updateName(e.target.value);
          }}
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
          error={error.durationError !== ""}
          helperText={error.durationError}
          value={duration}
          onChange={(e) => updateDuration(e.target.value)}
          style={{ textAlign: "right", width: "fit-content" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button type="submit" disabled={!canSubmit}>
          Update Leave Type
        </Button>
      </DialogActions>
    </Dialog>
  );
}
