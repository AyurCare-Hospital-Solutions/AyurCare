import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker } from "@mui/x-date-pickers";
import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";

export default function UpdateLeaveRequestDialog({
  open,
  onClose,
  leaveRequestData, // Existing leave request data to pre-fill the form
}: {
  open: boolean;
  onClose: () => void;
  leaveRequestData: any; // Data of the leave request being updated
}) {
  const [isFullDay, setIsFullDay] = React.useState(true);
  const [isMultipleDays, setIsMultipleDays] = React.useState(false);
  const [leaveType, setLeaveType] = React.useState<string>(
    leaveRequestData.leaveType || ""
  );
  const [availableLeaves, setAvailableLeaves] = React.useState<number>(0);

  // Pre-fill the form fields when the leave request data changes
  React.useEffect(() => {
    if (leaveRequestData.leaveType === "Annual") {
      setAvailableLeaves(20);
    } else if (leaveRequestData.leaveType === "Sick") {
      setAvailableLeaves(10);
    } else {
      setAvailableLeaves(0); // Default value
    }
  }, [leaveRequestData]);

  const handleFullDayChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsFullDay(event.target.checked);
    if (!event.target.checked) {
      setIsMultipleDays(false);
    }
  };

  const handleMultipleDaysChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsMultipleDays(event.target.checked);
  };

  const handleLeaveTypeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setLeaveType(event.target.value as string);
    // Set available leaves based on selected leave type
    if (event.target.value === "Annual") {
      setAvailableLeaves(20);
    } else if (event.target.value === "Sick") {
      setAvailableLeaves(10);
    } else {
      setAvailableLeaves(0); // Default value
    }
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
            const formData = new FormData(event.currentTarget);
            const formJson: { [key: string]: string } = Object.fromEntries(
              formData.entries() as Iterable<[string, string]>
            );
            const email = formJson.email;
            console.log(email);
            onClose();
          },
        }}
      >
        <DialogTitle>Update Leave Request</DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column" }}>
          <DialogContentText>
            To update the leave request, please modify the following details.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="leaveReason"
            label="Leave Reason"
            type="text"
            variant="standard"
            defaultValue={leaveRequestData.leaveReason}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={isFullDay}
                  onChange={handleFullDayChange}
                  name="fullDay"
                  color="primary"
                />
              }
              label="Full Day"
            />
            {isFullDay && (
              <FormControlLabel
                control={
                  <Switch
                    checked={isMultipleDays}
                    onChange={handleMultipleDaysChange}
                    name="multipleDays"
                    color="primary"
                    disabled={!isFullDay}
                  />
                }
                label="Multiple Days"
              />
            )}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: 3,
            }}
          >
            <Box sx={{ flexGrow: 1, mr: 1 }}>
              <FormControl sx={{ minWidth: 300 }}>
                <InputLabel id="leave-type-label">Type</InputLabel>
                <Select
                  labelId="leave-type-label"
                  id="leave-type-select"
                  value={leaveType}
                  //onChange={handleLeaveTypeChange}
                  label="Type"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Annual">Annual</MenuItem>
                  <MenuItem value="Sick">Sick</MenuItem>
                  {/* Add more leave types here */}
                </Select>
              </FormControl>
            </Box>

            <TextField
              sx={{ ml: 3 }}
              required
              margin="dense"
              label="Available Leaves"
              type="text"
              value={availableLeaves}
              variant="standard"
              InputProps={{
                readOnly: true,
                disabled: true,
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 3,
            }}
          >
            <DatePicker
              label={isMultipleDays ? "Start Date" : "Date"}
              value={leaveRequestData.startDate}
            />
            {isMultipleDays && (
              <DatePicker label="End Date" value={leaveRequestData.endDate} />
            )}
          </Box>
          {!isFullDay && (
            <TextField
              autoFocus
              required
              margin="dense"
              name="Hours"
              label="Hours"
              type="text"
              variant="standard"
              sx={{ mt: 3 }}
              defaultValue={leaveRequestData.hours}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Update Leave</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
