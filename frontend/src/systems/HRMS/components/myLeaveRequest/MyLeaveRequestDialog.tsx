import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker } from "@mui/x-date-pickers";
import { Autocomplete, Box, FormControlLabel, Switch } from "@mui/material";
import { LeaveTypeData } from "../../types";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { Dayjs } from "dayjs";

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
  const [registration, setRegistration] = useState<string>("");
  const [hours, setHours] = useState<string>("");
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

  const updateRegistration = (newRegistration: string) => {
    let registrationMessage = "";
    if (isMultipleDays) {
      setRegistration("Multiple Day");
    } else if (isFullDay) {
      setRegistration("Full Day");
    } else {
      setRegistration("Part Day");
    }
  };

  const updateHours = (newHours: string) => {
    let hoursErrorMessage = "";
    setHours(newHours);
  };

  const updateStartDate = (newStartDate: Dayjs | null) => {
    let startDateErrorMessage = "";
    setStartDate(newStartDate?.format("YYYY-MM-DD") || null); // format to YYYY-MM-DD or set to null
  };

  const updateEndDate = (newEndDate: Dayjs | null) => {
    let endDateErrorMessage = "";
    setEndDate(newEndDate?.format("YYYY-MM-DD") || null); // format to YYYY-MM-DD or set to null
  };

  const updateLeaveTypeId = (newLeaveTypeId: LeaveTypeData | null) => {
    if (newLeaveTypeId) {
      setLeaveType(newLeaveTypeId);
    }
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
  }, [leaveTypes]); // Dependency array includes leaveTypes

  const handleFullDayChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsFullDay(event.target.checked);
    if (!event.target.checked) {
      setIsMultipleDays(false);
    }
  };

  const handleMultipleDaysChange = (event: ChangeEvent<HTMLInputElement>) => {
    setIsMultipleDays(event.target.checked);
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
            addLeaveRequest({
              reason,
              registration,
              hours,
              status,
              start_date,
              end_date,
              leave_type,
            });
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
              onChange={(e) => updateStartDate(e)}
            />
            {isMultipleDays && (
              <DatePicker label="End Date" onChange={(e) => updateEndDate(e)} />
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
              onChange={(e) => updateRegistration(e.target.value)}
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
