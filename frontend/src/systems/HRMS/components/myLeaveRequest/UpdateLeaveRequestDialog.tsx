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
  Typography,
} from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { LeaveTypeData } from "../../types";
import { FormEvent, useEffect, useState } from "react";
import { useConfirm } from "material-ui-confirm";

export default function UpdateLeaveRequestDialog({
  open,
  onClose,
  leaveTypes,
  updateRequest,
  leaveRequestData,
}: {
  open: boolean;
  onClose: () => void;
  leaveTypes: LeaveTypeData[];
  updateRequest: (id: number, v: any) => void;
  leaveRequestData: any;
}) {
  const confirm = useConfirm();

  const [isFullDay, setIsFullDay] = useState(true);
  const [isMultipleDays, setIsMultipleDays] = useState(false);
  const [updateLeaveRequestData, setUpdateLeaveRequestData] = useState<any>({
    LeaveType: null,
    reason: "",
    start_date: null,
    end_date: null,
    hours: "",
  });

  const [errors, setErrors] = useState({
    reasonError: "",
    registrationError: "",
    hoursError: "",
    startDateError: "",
    endDateError: "",
    leaveTypeError: "",
  });

  const [canSubmit, setCanSubmit] = useState(false);

  useEffect(() => {
    if (!leaveRequestData) {
      return;
    }

    if (!leaveTypes) {
      return;
    }

    let newLeaveType = leaveTypes.find(
      (v) => v.id === leaveRequestData.LeaveType.id
    );
    if (!newLeaveType) {
      throw "Leave type not valid";
    }

    leaveRequestData.LeaveType = newLeaveType;

    if (leaveRequestData.registration === "Multiple Day") {
      setIsMultipleDays(true);
      setIsFullDay(true);
    } else if (leaveRequestData.registration === "Full Day") {
      setIsFullDay(true);
      setIsMultipleDays(false);
    } else {
      setIsFullDay(false);
      setIsMultipleDays(false);
    }

    setUpdateLeaveRequestData(leaveRequestData);
  }, [leaveRequestData]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (canSubmit) {
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
    }
  };

  const updateReason = (newReason: string) => {
    let reasonErrorMessage = "";

    if (newReason === "") {
      reasonErrorMessage = "Reason cannot be empty";
    } else if (newReason.length > 50) {
      reasonErrorMessage = "Reason cannot be longer than 50 characters";
    } else if (newReason.length < 3) {
      reasonErrorMessage = "Reason must be at least 3 characters long";
    } else if (!/^[a-zA-Z ]+$/.test(newReason)) {
      reasonErrorMessage = "Reason must contain only letters and spaces";
    }

    setUpdateLeaveRequestData({ ...updateLeaveRequestData, reason: newReason });
    setErrors({ ...errors, reasonError: reasonErrorMessage });
    setCanSubmit(
      reasonErrorMessage === "" &&
        errors.leaveTypeError === "" &&
        errors.startDateError === "" &&
        errors.endDateError === ""
    );
  };

  const updateHours = (newHours: string) => {
    let hoursErrorMessage = "";

    if (newHours === "") {
      hoursErrorMessage = "Hours cannot be empty";
    } else if (isNaN(parseFloat(newHours))) {
      hoursErrorMessage = "Hours must be a valid number";
    } else {
      const hoursValue = parseFloat(newHours);
      if (hoursValue < 0 || hoursValue > 24) {
        hoursErrorMessage = "Hours must be between 0 and 24";
      }
    }

    setUpdateLeaveRequestData({ ...updateLeaveRequestData, hours: newHours });
    setErrors({ ...errors, hoursError: hoursErrorMessage });
    setCanSubmit(
      hoursErrorMessage === "" &&
        errors.reasonError === "" &&
        errors.startDateError === "" &&
        errors.endDateError === ""
    );
  };

  const updateStartDate = (newStartDate: Dayjs | null) => {
    let startDateErrorMessage = "";

    if (!newStartDate) {
      startDateErrorMessage = "Start Date is required";
    }

    setUpdateLeaveRequestData({
      ...updateLeaveRequestData,
      start_date: newStartDate,
    });
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
    const start_date = updateLeaveRequestData.start_date;
    const endDate = newEndDate || start_date;

    if (!isMultipleDays) {
      endDateErrorMessage = "";
    } else if (!endDate && isMultipleDays) {
      endDateErrorMessage = "End Date is required";
    } else if (endDate.isBefore(updateLeaveRequestData.start_date)) {
      endDateErrorMessage = "End Date cannot be before Start Date";
    } else if (endDate.isSame(updateLeaveRequestData.start_date, "day")) {
      endDateErrorMessage =
        "End Date cannot be the same as Start Date. If so, disable Multiple Days.";
    }

    setUpdateLeaveRequestData({ ...updateLeaveRequestData, end_date: endDate });
    setErrors({ ...errors, endDateError: endDateErrorMessage });
    setCanSubmit(
      endDateErrorMessage === "" &&
        errors.reasonError === "" &&
        errors.startDateError === "" &&
        errors.leaveTypeError === ""
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

  const updateLeaveTypeId = (
    newLeaveTypeId: LeaveTypeData | null,
    isFullDay: boolean
  ) => {
    let leaveTypeErrorMessage = "";

    if (!isFullDay) {
      if (
        newLeaveTypeId &&
        newLeaveTypeId.name.toLowerCase().trim() === "short leave"
      ) {
        setUpdateLeaveRequestData({
          ...updateLeaveRequestData,
          hours: "1.5",
        });
      } else {
        setUpdateLeaveRequestData({
          ...updateLeaveRequestData,
          hours: "4.0",
        });
      }
    }

    if (!newLeaveTypeId) {
      leaveTypeErrorMessage = "Leave type cannot be empty";
    }

    setUpdateLeaveRequestData({
      ...updateLeaveRequestData,
      LeaveType: newLeaveTypeId,
    });

    setErrors({ ...errors, leaveTypeError: leaveTypeErrorMessage });
    setCanSubmit(
      leaveTypeErrorMessage === "" &&
        errors.reasonError === "" &&
        errors.startDateError === "" &&
        errors.endDateError === ""
    );
  };

  return (
    <>
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
            onChange={(e) => updateReason(e.target.value)}
            value={updateLeaveRequestData?.reason}
            error={Boolean(errors.reasonError)}
            helperText={errors.reasonError}
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
                  disabled={isMultipleDays}
                />
              }
              label="Full Day"
            />
            {isFullDay && (
              <FormControlLabel
                control={
                  <Switch
                    checked={isMultipleDays}
                    onChange={() => {
                      setIsMultipleDays(!isMultipleDays);
                      if (isMultipleDays) {
                        setIsFullDay(true);
                      }
                    }}
                    name="multipleDays"
                    color="primary"
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
                  getOptionLabel={(v) => v.name ?? ""}
                  isOptionEqualToValue={(a, b) => a.id === b.id}
                  onChange={(_, lt) => updateLeaveTypeId(lt, isFullDay)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Type"
                      error={Boolean(errors.leaveTypeError)}
                      helperText={errors.leaveTypeError}
                    />
                  )}
                />
              </FormControl>
            </Box>

            <TextField
              sx={{ ml: 3 }}
              required
              margin="dense"
              label="Available Leaves"
              type="text"
              value={"0"}
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
              onChange={(v) => updateStartDate(v)}
            />
            {isMultipleDays && (
              <DatePicker
                label="End Date"
                value={dayjs(updateLeaveRequestData?.end_date)}
                onChange={(v) => updateEndDate(v)}
              />
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
              sx={{ mt: 3 }}
              onChange={(e) => updateHours(e.target.value)}
              value={updateLeaveRequestData?.hours || ""}
              error={Boolean(errors.hoursError)}
              helperText={errors.hoursError}
              disabled={true}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={!canSubmit}>
            Update Leave
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
