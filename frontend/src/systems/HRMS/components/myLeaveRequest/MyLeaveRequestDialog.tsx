import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Switch,
  FormControlLabel,
  Box,
  Autocomplete,
} from "@mui/material";
import { LeaveTypeData } from "../../types";
import axios from "axios";
import { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

export default function MyLeaveRequestDialog({
  addLeaveRequest,
  open,
  onClose,
}: {
  addLeaveRequest: (data: any) => any;
  open: boolean;
  onClose: () => void;
}) {
  const [reason, setReason] = useState("");
  const [registration, setRegistration] = useState("");
  const [hours, setHours] = useState<number>(0);
  const [status, setStatus] = useState<string>("");
  const [start_date, setStartDate] = useState<string | null>(null);
  const [end_date, setEndDate] = useState<string | null>(null);
  const [leave_type, setLeaveType] = useState<LeaveTypeData | null>(null);

  const [leaveTypes, setLeaveTypes] = useState<LeaveTypeData[]>([]);
  const [isFullDay, setIsFullDay] = useState(true);
  const [isMultipleDays, setIsMultipleDays] = useState(false);
  const [availableLeaves] = useState<number>(0);

  const [errors, setErrors] = useState({
    reasonError: "",
    registrationError: "",
    hoursError: "",
    statusError: "",
    startDateError: "",
    endDateError: "",
    leaveTypeError: "",
  });

  const [canSubmit, setCanSubmit] = useState(false);

  const updateReason = (newReason: string) => {
    let reasonErrorMessage = "";
    setReason(newReason);
  };

  const updateRegistration = () => {
    let registrationValue = "";
    if (isMultipleDays) {
      registrationValue = "Multiple Day";
    } else if (isFullDay) {
      registrationValue = "Full Day";
    } else {
      registrationValue = "Part Day";
    }
    setRegistration(registrationValue);
  };

  const updateHours = (newHours: number) => {
    let hoursErrorMessage = "";
    setHours(newHours);
  };

  const updateStartDate = (newStartDate: Dayjs | null) => {
    let startDateErrorMessage = "";
    setStartDate(newStartDate?.format("YYYY-MM-DD") || null); // format to YYYY-MM-DD or set to null
  };

  const updateEndDate = (newEndDate: Dayjs | null, startDate: Dayjs) => {
    // Set a default error message (optional)
    let endDateErrorMessage = "";

    // Assign start date if newEndDate is null
    const endDate = newEndDate || startDate;

    // Optional validation (check if endDate is still null)
    if (!endDate) {
      endDateErrorMessage = "Both start and end dates are null."; // Customize message as needed
    }

    // Format and set endDate
    setEndDate(endDate.format("YYYY-MM-DD"));
  };

  const updateLeaveTypeId = (newLeaveTypeId: LeaveTypeData | null) => {
    if (newLeaveTypeId) {
      setLeaveType(newLeaveTypeId);
    }
  };

  const handleSubmit = () => {
    updateRegistration();
    console.log();

    addLeaveRequest({
      reason,
      registration,
      hours,
      status,
      start_date,
      end_date,
      leave_type,
    });
  };

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      const allLeaveTypes = await axios.get("/api/hrms/leaveType");
      const leaveTypeData = allLeaveTypes.data;

      leaveTypeData.forEach((leaveType: LeaveTypeData) => {
        (leaveType as any).label = leaveType.name;
      });

      setLeaveTypes(leaveTypeData);
    };

    // Fetch leave types data and set initial errors and submission state
    fetchLeaveTypes();

    // Reset errors and submission state when leave types change
    setErrors({
      reasonError: "",
      registrationError: "",
      hoursError: "",
      statusError: "",
      startDateError: "",
      endDateError: "",
      leaveTypeError: "",
    });
    setCanSubmit(false);
  }, []);

  const handleFullDayChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsFullDay(event.target.checked);
    if (!event.target.checked) {
      setIsMultipleDays(false);
    }
  };

  const handleMultipleDaysChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsMultipleDays(event.target.checked);
    if (!event.target.checked) {
      setIsFullDay(false);
      setEndDate(start_date);
    } else {
      setIsFullDay(true);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleSubmit();
            onClose();
          },
        }}
      >
        <DialogTitle>Request Leaves</DialogTitle>
        <DialogContent style={{ display: "flex", flexDirection: "column" }}>
          <DialogContentText>
            To request for a leave, please provide the following details.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            name="leaveReason"
            label="Leave Reason"
            type="text"
            variant="standard"
            onChange={(e) => updateReason(e.target.value)}
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
              <Autocomplete
                options={leaveTypes}
                onChange={(_e, value) => {
                  updateLeaveTypeId(value as LeaveTypeData);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Leave Type" />
                )}
              />
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
              onChange={(e: any) => updateStartDate(e)}
            />
            {isMultipleDays && (
              <DatePicker
                label="End Date"
                onChange={(e: any) => updateEndDate(e)}
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
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Request Leave</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
