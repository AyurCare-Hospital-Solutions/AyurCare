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
import { ShiftTypeData, EmployeeData } from "../../types";
import ShiftEmployeeTable from "./ShiftEmployeeTable";
import { Box } from "@mui/material";

export default function NewRosterDialog({
  open,
  onClose,
  addNewRoster,
}: {
  open: boolean;
  onClose: () => void;
  addNewRoster: (data: any) => void;
}) {
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

  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const [shiftTypes, setShiftTypes] = useState<ShiftTypeData[]>([]);

  return (
    <>
      <Dialog fullWidth open={open} onClose={onClose}>
        <DialogTitle>Enter Shift Table</DialogTitle>
        <DialogContent>
          {" "}
          {/* Adjust the width value as needed */}
          <DialogContentText>
            Please enter the shift details below:
          </DialogContentText>
          <DatePicker sx={{ my: 1, width: "100%" }} />
          <Autocomplete
            options={shiftTypes}
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
            <ShiftEmployeeTable />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
