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

interface FormData {
  leaveType: LeaveTypeData | null;
  leaveReason: string;
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  hours: string | null;
}

export default function MyLeaveRequestDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [isFullDay, setIsFullDay] = useState(true);
  const [isMultipleDays, setIsMultipleDays] = useState(false);
  const [availableLeaves] = useState<number>(0);
  const [leaveTypes, setLeaveTypes] = useState<LeaveTypeData[]>([]);
  const [formData, setFormData] = useState<FormData>({
    leaveType: null,
    leaveReason: "",
    startDate: null,
    endDate: null,
    hours: null,
  });

  useEffect(() => {
    const fetchLeaveTypes = async () => {
      const allLeaveTypes = await axios.get("/api/hrms/leaveType");
      const leaveTypeData = allLeaveTypes.data;

      leaveTypeData.forEach((leaveType: LeaveTypeData) => {
        (leaveType as any).label = leaveType.name;
      });

      setLeaveTypes(leaveTypeData);
    };

    fetchLeaveTypes();
  }, []);

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
            axios.post("/api/hrms/leave", {
              type: formData.leaveType?.id,
              reason: formData.leaveReason,
              startDate: formData.startDate,
              registration: isMultipleDays
                ? "Multiple Days"
                : isFullDay
                ? "Full Day"
                : "Part Day",
              endDate: formData.endDate,
              hours: formData.hours ? Number.parseFloat(formData.hours) : null,
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
            onChange={(e) =>
              setFormData({ ...formData, leaveReason: e.target.value })
            }
            value={formData.leaveReason}
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
                  setFormData({ ...formData, leaveType: value });
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
                disabled: true, // make it look deactivated
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
              onChange={(e) => setFormData({ ...formData, startDate: e })}
              value={formData.startDate}
            />
            {isMultipleDays && (
              <DatePicker
                label="End Date"
                onChange={(e) => setFormData({ ...formData, endDate: e })}
                value={formData.endDate}
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
              onChange={(e) =>
                setFormData({ ...formData, hours: e.target.value })
              }
              value={formData.hours}
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
