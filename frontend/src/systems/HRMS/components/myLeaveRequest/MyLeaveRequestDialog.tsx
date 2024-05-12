import { useState, useEffect, ChangeEvent, FormEvent } from "react";
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
  Typography,
} from "@mui/material";
import { LeaveTypeData } from "../../types";
import { Dayjs } from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";

export default function MyLeaveRequestDialog({
  addLeaveRequest,
  open,
  onClose,
  leaveTypes,
}: {
  addLeaveRequest: (data: any) => any;
  leaveTypes: LeaveTypeData[];
  open: boolean;
  onClose: () => void;
}) {
  const [reason, setReason] = useState("");
  const [hours, setHours] = useState<string>("");
  const [start_date, setStartDate] = useState<Dayjs | null>(null);
  const [end_date, setEndDate] = useState<Dayjs | null>(null);
  const [leave_type, setLeaveType] = useState<LeaveTypeData | null>(null);

  const [isFullDay, setIsFullDay] = useState(true);
  const [isMultipleDays, setIsMultipleDays] = useState(false);
  const [availableLeaves] = useState<number>(0);

  const [errors, setErrors] = useState({
    reasonError: "",
    registrationError: "",
    hoursError: "",
    startDateError: "",
    endDateError: "",
    leaveTypeError: "",
  });

  const [canSubmit, setCanSubmit] = useState(false);

  const updateReason = (newReason: string) => {
    let reasonErrorMessage = "";

    if (newReason === "") {
      reasonErrorMessage = "Name cannot be empty";
    } else if (newReason.length > 50) {
      reasonErrorMessage = "Name cannot be longer than 50 characters";
    } else if (newReason.length < 3) {
      reasonErrorMessage = "Name must be at least 3 characters long";
    } else if (!/^[a-zA-Z ]+$/.test(newReason)) {
      reasonErrorMessage = "Name must contain only letters and spaces";
    }

    setReason(newReason);
    setErrors({ ...errors, reasonError: reasonErrorMessage });
    setCanSubmit(
      reasonErrorMessage === "" &&
        errors.leaveTypeError === "" &&
        errors.startDateError === "" &&
        errors.endDateError === ""
    );
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

  const updateHours = (newHours: string) => {
    setHours(newHours);
  };

  const updateStartDate = (newStartDate: Dayjs | null) => {
    let startDateErrorMessage = "";

    if (!newStartDate) {
      startDateErrorMessage = "Start Date is required.";
    } else {
      setStartDate(newStartDate);
    }
    setErrors({ ...errors, startDateError: startDateErrorMessage });
    setCanSubmit(
      startDateErrorMessage === "" &&
        errors.reasonError === "" &&
        errors.endDateError === "" &&
        errors.leaveTypeError === ""
    );
  };

  const updateEndDate = (newEndDate: Dayjs | null) => {
    let endDateErrorMessage = "";

    const endDate = newEndDate || start_date;

    if (isMultipleDays && !endDate) {
      endDateErrorMessage = "End Date is required";
    } else if (isMultipleDays && endDate && endDate.isBefore(start_date)) {
      endDateErrorMessage = "End Date cannot be before Start Date";
    } else if (endDate && endDate.isSame(start_date, "day")) {
      endDateErrorMessage =
        "End Date cannot be the same as Start Date. If so disbale Multiple Days.";
    }

    setEndDate(endDate);
    setErrors({ ...errors, endDateError: endDateErrorMessage });
    setCanSubmit(
      endDateErrorMessage === "" &&
        errors.reasonError === "" &&
        errors.startDateError === "" &&
        errors.leaveTypeError === ""
    );
  };

  const updateLeaveTypeId = (newLeaveTypeId: LeaveTypeData | null) => {
    let leaveTypeErrorMessage = "";

    if (!newLeaveTypeId) {
      leaveTypeErrorMessage = "Leave type cannot be empty";
    }

    if (newLeaveTypeId) {
      setLeaveType(newLeaveTypeId);

      // Update hours based on leave type and full day status
      if (!isFullDay) {
        if (newLeaveTypeId.name.toLowerCase().trim() === "short leave") {
          setHours("1.5");
        } else {
          setHours("4.0");
        }
      }
    }

    setErrors({ ...errors, leaveTypeError: leaveTypeErrorMessage });
    setCanSubmit(
      leaveTypeErrorMessage === "" &&
        errors.reasonError === "" &&
        errors.startDateError === "" &&
        errors.endDateError === ""
    );
  };

  const handleSubmit = () => {
    addLeaveRequest({
      reason,
      registration: getRegistration(),
      hours: Number.parseFloat(hours),
      start_date,
      end_date: end_date ?? start_date,
      leave_type,
    });
  };

  useEffect(() => {
    setErrors({
      reasonError: "",
      registrationError: "",
      hoursError: "",
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
            error={errors.reasonError !== ""}
            helperText={errors.reasonError}
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
              <Typography variant="caption" color="#d32f2f">
                {errors.leaveTypeError}
              </Typography>
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
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <DatePicker
                label={isMultipleDays ? "Start Date" : "Date"}
                onChange={(e: any) => updateStartDate(e)}
              />
            </Box>
            {isMultipleDays && (
              <Box>
                <DatePicker
                  sx={{ mx: 1 }}
                  label="End Date"
                  onChange={(e: any) => updateEndDate(e)}
                />
              </Box>
            )}
          </Box>
          <Typography variant="caption" color="#d32f2f" sx={{ pt: 1 }}>
            {errors.startDateError}
            {errors.endDateError}
          </Typography>
          {!isFullDay && (
            <TextField
              autoFocus
              required
              margin="dense"
              name="Hours"
              label="Hours"
              type="text"
              variant="standard"
              value={hours}
              disabled={true}
              error={errors.hoursError !== ""}
              helperText={errors.hoursError}
              onChange={(e) => updateHours(e.target.value)}
              sx={{ mt: 3 }}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={!canSubmit}>
            Request Leave
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
