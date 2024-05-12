import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker } from "@mui/x-date-pickers";
import Autocomplete from "@mui/material/Autocomplete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import axios from "axios";
import { ShiftTypeData, EmployeeData, ShiftData } from "../../types";
import ShiftEmployeeTable from "./ShiftEmployeeTable";
import { Box } from "@mui/material";
import { GridRowId } from "@mui/x-data-grid";
import dayjs, { Dayjs } from "dayjs";

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

  // const selectedRowsData = selectedEmployees.map((id) =>
  //   employees.find((row) => row.id === id)
  // );

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (selectedShift) {
      updateRoster({
        id: selectedShift.id,
        date: date?.toISOString(),
        type: shiftType?.id,
        employees: selectedEmployees,
      });
      return;
    } else {
      addNewRoster({
        date: date?.toISOString(),
        type: shiftType?.id,
        employees: selectedEmployees,
      });
    }
  };
  return (
    <>
      <Dialog fullWidth open={open} onClose={onClose}>
        <DialogTitle>
          {selectedShift ? "Update Shift Table" : "Enter Shift Table"}
        </DialogTitle>
        <DialogContent>
          {" "}
          {/* Adjust the width value as needed */}
          <DialogContentText>
            Please enter the shift details below:
          </DialogContentText>
          <DatePicker
            sx={{ my: 1, width: "100%" }}
            onChange={setDate}
            value={date}
          />
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
    </>
  );
}
