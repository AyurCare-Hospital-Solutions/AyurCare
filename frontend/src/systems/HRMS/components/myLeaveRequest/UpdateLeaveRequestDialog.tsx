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
  Autocomplete,
  Box,
  FormControl,
  FormControlLabel,
  Switch,
} from "@mui/material";
import dayjs from "dayjs";
import axios from "axios";
import { LeaveTypeData } from "../../types";

export default function UpdateLeaveRequestDialog({
  open,
  onClose,
  leaveTypes,
  updateRequest,
  leaveRequestData, // Existing leave request data to pre-fill the form
}: {
  open: boolean;
  onClose: () => void;
  leaveTypes: LeaveTypeData[];
  updateRequest: (id: number, v: any) => void,
  leaveRequestData: any; // Data of the leave request being updated
}) {
  const [isFullDay, setIsFullDay] = React.useState(true);
  const [isMultipleDays, setIsMultipleDays] = React.useState(false);
  const [availableLeaves, setAvailableLeaves] = React.useState<number>(0);
  const [updateLeaveRequestData, setUpdateLeaveRequestData] =
    React.useState<any>({
      LeaveType: null,
      reason: "",
      start_date: null,
      end_date: null,
      hours: ""
    });


  React.useEffect(() => {
    if (!leaveRequestData) {

      return;
    }

    if (!leaveTypes) {
      return;
    }

    let newLeaveType = leaveTypes.find((v) => v.id == leaveRequestData.LeaveType.id);
    if (!newLeaveType) {
      throw "Leave type not valid"
    }

    leaveRequestData.LeaveType = newLeaveType;

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

    setUpdateLeaveRequestData(leaveRequestData);

  }, [leaveRequestData]);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      type: updateLeaveRequestData.LeaveType.id,
      reason: updateLeaveRequestData.reason,
      startDate: updateLeaveRequestData.start_date,
      endDate: updateLeaveRequestData.end_date,
      registration: getRegistration(),
      hours: parseFloat(updateLeaveRequestData.hours),
    };

    updateRequest(updateLeaveRequestData.id, data);
    onClose();
  };

  const getRegistration = () => {
    if (isMultipleDays) {
      return "Multiple Day";
    } else if (isFullDay) {
      return "Full Day";
    } else {
      return "Part Day";
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
            onChange={(e) => {
              setUpdateLeaveRequestData({
                ...updateLeaveRequestData,
                reason: e.target.value,
              })
            }}
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
                <Autocomplete
                  options={leaveTypes}
                  value={updateLeaveRequestData?.LeaveType || null}
                  getOptionLabel={v => v.name ?? ""}
                  isOptionEqualToValue={(a, b) => a.id == b.id}
                  onChange={(_, lt) =>
                    setUpdateLeaveRequestData({
                      ...updateLeaveRequestData,
                      LeaveType: lt,
                    })
                  }
                  renderInput={(params) => <TextField {...params} label="Type" />}
                />
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
              value={dayjs(updateLeaveRequestData?.start_date)}
              onChange={v => setUpdateLeaveRequestData({
                ...updateLeaveRequestData,
                start_date: v
              })}
            />
            {isMultipleDays && (
              <DatePicker
                label="End Date"
                value={dayjs(updateLeaveRequestData?.end_date)}
                onChange={v => setUpdateLeaveRequestData({
                  ...updateLeaveRequestData,
                  end_date: v
                })}
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
              onChange={(e) => {
                setUpdateLeaveRequestData({
                  ...updateLeaveRequestData,
                  hours: e.target.value
                })
              }}
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
