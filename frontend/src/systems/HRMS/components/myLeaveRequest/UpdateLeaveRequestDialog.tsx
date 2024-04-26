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
import dayjs from "dayjs";
import axios from "axios";
import { LeaveTypeData } from "../../types";

export default function UpdateLeaveRequestDialog({
  open,
  onClose,
  leaveTypes,
  leaveRequestData, // Existing leave request data to pre-fill the form
}: {
  open: boolean;
  onClose: () => void;
  leaveTypes: LeaveTypeData[];
  leaveRequestData: any; // Data of the leave request being updated
}) {
  const [isFullDay, setIsFullDay] = React.useState(true);
  const [isMultipleDays, setIsMultipleDays] = React.useState(false);
  const [availableLeaves, setAvailableLeaves] = React.useState<number>(0);
  const [updateLeaveRequestData, setUpdateLeaveRequestData] =
    React.useState<any>({});

  React.useEffect(() => {
    if (!leaveRequestData) {
      return;
    }

    setUpdateLeaveRequestData(leaveRequestData);
    if (leaveRequestData.registration == "Multiple Day") {
      setIsMultipleDays(true);
      setIsFullDay(true)
    } else if (leaveRequestData.registration == "Full Day") {
      setIsFullDay(true);
      setIsMultipleDays(false);
    } else {
      setIsFullDay(false);
      setIsMultipleDays(false);
    }
  }, [leaveRequestData]);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson: { [key: string]: string } = Object.fromEntries(
      formData.entries() as Iterable<[string, string]>
    );

    // Make the Axios request to update leave request
    try {
      const response = await axios.put(
        "your-backend-api-endpoint", // Replace this with your actual API endpoint
        formJson
      );
      console.log("Leave request updated successfully:", response.data);
      onClose(); // Close the dialog after successful submission
    } catch (error) {
      console.error("Error updating leave request:", error);
    }
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: "form",
          onSubmit: handleSubmit,
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
            value={updateLeaveRequestData?.reason}
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
                  onChange={() => setIsFullDay(!isFullDay)}
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
                    onChange={() => setIsMultipleDays(!isMultipleDays)}
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
                  value={updateLeaveRequestData?.LeaveType || ""}
                  onChange={(e) =>
                    setUpdateLeaveRequestData({
                      ...updateLeaveRequestData,
                      LeaveType: e.target.value,
                    })
                  }
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
              value={dayjs(updateLeaveRequestData?.startDate)}
            />
            {isMultipleDays && (
              <DatePicker
                label="End Date"
                value={dayjs(updateLeaveRequestData?.endDate)}
              />
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
              value={updateLeaveRequestData?.hours || ""}
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
