import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect } from "react";

export default function LeaveTypeDialog({
  addLeaveType,
  open,
  onClose,
}: {
  addLeaveType: (data: any) => any;
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = React.useState("");
  const [duration, setDuration] = React.useState(0);
  const [error, setError] = React.useState({
    nameError: "",
    durationError: "",
  });
  const [canSubmit, setCanSubmit] = React.useState(false);

  useEffect(() => {
    setError({ nameError: "", durationError: "" });
    setCanSubmit(false);
  }, [open]);

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

    setDuration(newDuration);
    setError({ ...error, durationError: durationErrorMessage });
    setCanSubmit(error.nameError === "" && durationErrorMessage === "");
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            addLeaveType({ name, duration });
            onClose();
          },
        }}
      >
        <DialogTitle>Add new leave type</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Provide the leave type & the duration of the leave to create a new
            leave type.
          </DialogContentText>

          <TextField
            autoFocus
            required
            margin="dense"
            name="name"
            label="Leave Type Name"
            type="text"
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
            onChange={(e) => updateDuration(e.target.value)}
            style={{ textAlign: "right", width: "fit-content" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={!canSubmit}>
            Add Leave Type
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
