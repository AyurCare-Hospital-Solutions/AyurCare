import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker } from "@mui/x-date-pickers";
import Autocomplete from "@mui/material/Autocomplete";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ShiftTypeData, EmployeeData, ShiftData } from "../../types";
import ShiftEmployeeTable from "./ShiftEmployeeTable";
import { Alert, Box } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";

export default function NewRosterDialog({
  selectedShift,
  open,
  onClose,
  addNewRoster,
  updateRoster,
}: {
  open: boolean;
  onClose: () => void;
  addNewRoster: (data: any) => void;
  updateRoster: (data: any) => void;
  selectedShift: ShiftData | null;
}) {
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState<GridRowId[]>([]);
  const [shiftTypes, setShiftTypes] = useState<ShiftTypeData[]>([]);
  const [shiftType, setShiftType] = useState<ShiftTypeData | null>(null);
  const [date, setDate] = useState<Dayjs | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error" | "warning" | "info"
  >("success");

  useEffect(() => {
    if (selectedShift && employees) {
      setDate(selectedShift.date ? dayjs(selectedShift.date) : null);
      setShiftType(selectedShift.ShiftType);
      setSelectedEmployees(selectedShift.Staffs.map((row) => row.id));
    } else {
      setDate(null);
      setShiftType(null);
      setSelectedEmployees([]);
    }
  }, [selectedShift, employees]);

  useEffect(() => {
    axios
      .get("/api/hrms/shiftType")
      .then((res) => {
        setShiftTypes(res.data);
      })
      .catch((error) => {
        console.error("Error fetching shift types:", error);
      });

    axios.get("/api/hrms/employees").then((res) => {
      setEmployees(res.data);
    });
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const errors: string[] = [];

    if (!date) {
      errors.push("Date is required.");
    }
    if (!shiftType) {
      errors.push("Shift type is required.");
    }
    if (selectedEmployees.length === 0) {
      errors.push("At least one employee must be selected.");
    }

    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    if (selectedShift) {
      updateRoster({
        id: selectedShift.id,
        date: date?.toISOString(),
        type: shiftType?.id,
        employees: selectedEmployees,
      });
    } else {
      addNewRoster({
        date: date?.toISOString(),
        type: shiftType?.id,
        employees: selectedEmployees,
      });
    }

    setSnackbarMessage("Roster submitted successfully.");
    setSnackbarSeverity("success");
    setSnackbarOpen(true);
    onClose();
    setDate(null);
    setShiftType(null);
    setSelectedEmployees([]);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Dialog fullWidth open={open} onClose={onClose}>
        <DialogTitle>
          {selectedShift ? "Update Shift Table" : "Enter Shift Table"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the shift details below:
          </DialogContentText>
          <DatePicker
            sx={{ my: 1, width: "100%" }}
            onChange={setDate}
            value={date}
          />
          {validationErrors.includes("Date is required.") && (
            <MuiAlert severity="error">Date is required.</MuiAlert>
          )}
          <Autocomplete
            options={shiftTypes}
            onChange={(e, value) => setShiftType(value)}
            value={shiftType}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => (
              <TextField
                {...params}
                required
                margin="dense"
                id="type"
                name="type"
                label="Type"
                fullWidth
                variant="outlined"
              />
            )}
          />
          {validationErrors.includes("Shift type is required.") && (
            <MuiAlert severity="error">Shift type is required.</MuiAlert>
          )}
          <Box sx={{ mt: 2 }}>
            <ShiftEmployeeTable
              employees={employees}
              selected={selectedEmployees}
              setSelected={setSelectedEmployees}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
