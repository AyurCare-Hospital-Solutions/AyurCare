import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

export default function NewShiftTypeDialog({
  open,
  onClose,
  addShiftType,
}: {
  open: boolean;
  onClose: () => void;
  addShiftType: (data: any) => void;
}) {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [error, setError] = useState({
    nameError: "",
    timeError: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name === "") {
      setError({ ...error, nameError: "Shift Type cannot be empty" });
      return;
    }
    if (!startTime || !endTime) {
      setError({
        ...error,
        timeError: "Please select both start and end time",
      });
      return;
    }
    const shiftData = { name, startTime, endTime };
    addShiftType(shiftData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add New Shift Type</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details for the new shift type:
          </DialogContentText>

          <TextField
            sx={{ mt: 3 }}
            id="name"
            name="name"
            fullWidth
            required
            value={name}
            label="Shift Type"
            variant="outlined"
            error={error.nameError !== ""}
            helperText={error.nameError}
            onChange={(e) => {
              setName(e.target.value);
              setError({ ...error, nameError: "" });
            }}
          />

          <div style={{ display: "flex", gap: "16px", marginTop: "1rem" }}>
            <TimePicker
              label="Start Time"
              value={startTime ? dayjs(startTime) : null}
              onChange={(newValue: Dayjs | null) => {
                setStartTime(newValue ? newValue : null);
                setError({ ...error, timeError: "" });
              }}
            />

            <TimePicker
              label="End Time"
              value={endTime ? dayjs(endTime) : null}
              onChange={(newValue: Dayjs | null) => {
                setEndTime(newValue ? newValue : null);
                setError({ ...error, timeError: "" });
              }}
            />
          </div>
          {error.timeError && (
            <DialogContentText style={{ color: "red" }}>
              {error.timeError}
            </DialogContentText>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
