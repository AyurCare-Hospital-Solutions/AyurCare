import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function NewShiftTypeDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [designations, setDesignations] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");

  const handleAddDesignation = () => {
    //setDesignations([...designations, searchTerm]);
    setSearchTerm("");
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(formData.entries());
            const email = formJson.email;
            console.log(email);
            onClose();
          },
        }}
      >
        <DialogTitle>Add New Shift Type</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill in the details for the new shift type:
          </DialogContentText>

          <div style={{ display: "flex", gap: "16px" }}>
            <TextField
              required
              margin="dense"
              id="startTime"
              name="startTime"
              label="Start Time"
              type="time"
              fullWidth
              variant="standard"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <TextField
              required
              margin="dense"
              id="endTime"
              name="endTime"
              label="End Time"
              type="time"
              fullWidth
              variant="standard"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
          <DialogContentText>Designations:</DialogContentText>
          <TextField
            margin="dense"
            id="search"
            label="Search Designations"
            fullWidth
            variant="standard"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="outlined" onClick={handleAddDesignation}>
            Add Designation
          </Button>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                {designations.map((designation, index) => (
                  <TableRow key={index}>
                    <TableCell>{designation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
