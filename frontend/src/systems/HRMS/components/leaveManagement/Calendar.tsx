import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";

function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [openLeaveForm, setOpenLeaveForm] = useState(false);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    setOpenLeaveForm(true);
  };

  const handleCloseLeaveForm = () => {
    setOpenLeaveForm(false);
  };

  const LeaveForm: React.FC<{
    open: boolean;
    onClose: () => void;
    selectedDate: Date | null;
  }> = ({ open, onClose, selectedDate }) => {
    const [leaveReason, setLeaveReason] = useState("");

    const handleSubmit = () => {
      // Handle leave submission logic here
      console.log(
        "Submitting leave for date:",
        selectedDate,
        "with reason:",
        leaveReason
      );
      onClose();
    };

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Apply for Leave</DialogTitle>
        <DialogContent>
          <TextField
            id="leave-reason"
            label="Reason for Leave"
            value={leaveReason}
            onChange={(e) => setLeaveReason(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            id="leave-date"
            label="Leave Date"
            type="date"
            value={selectedDate ? selectedDate.toISOString().split("T")[0] : ""}
            InputLabelProps={{
              shrink: true,
            }}
            fullWidth
            margin="normal"
            disabled
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div>
      <h2>Calendar</h2>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={handleDateChange}
          renderInput={(params: any) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <LeaveForm
        open={openLeaveForm}
        onClose={handleCloseLeaveForm}
        selectedDate={selectedDate}
      />
    </div>
  );
}

export default Calendar;
