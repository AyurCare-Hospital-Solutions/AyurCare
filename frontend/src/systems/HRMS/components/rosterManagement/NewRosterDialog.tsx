import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import Autocomplete from "@mui/material/Autocomplete";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// Sample options for the autocomplete
const shiftTypes = [
  { label: "Morning Shift", value: "morning" },
  { label: "Afternoon Shift", value: "afternoon" },
  { label: "Night Shift", value: "night" },
];

export default function NewRosterDialog() {
  const [open, setOpen] = React.useState(false);
  const [searchedEmployees, setSearchedEmployees] = React.useState([]);
  const [selectedEmployees, setSelectedEmployees] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEmployeeSearch = (event, value) => {
    // Perform employee search logic here and set the results to searchedEmployees state
    setSearchedEmployees([
      { name: "John Doe" },
      { name: "Jane Doe" },
      { name: "Michael Smith" },
    ]);
  };

  const handleAddEmployee = (event, values) => {
    setSelectedEmployees(values);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add new Shift
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            console.log(formJson);
            handleClose();
          },
        }}
      >
        <DialogTitle>Enter Shift Table</DialogTitle>
        <DialogContent sx={{ width: 400 }}>
          {" "}
          {/* Adjust the width value as needed */}
          <DialogContentText>
            Please enter the shift details below:
          </DialogContentText>
          <DatePicker sx={{ my: 2 }} />
          <Autocomplete
            multiple
            options={shiftTypes}
            getOptionLabel={(option) => option.label}
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
          <Autocomplete
            multiple
            freeSolo
            options={searchedEmployees}
            getOptionLabel={(option) => option.name}
            onInputChange={handleEmployeeSearch}
            onChange={handleAddEmployee}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                id="employee-search"
                label="Search Employee"
                fullWidth
                variant="outlined"
              />
            )}
          />
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {selectedEmployees.map((employee, index) => (
                  <TableRow key={index}>
                    <TableCell>{employee.name}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
