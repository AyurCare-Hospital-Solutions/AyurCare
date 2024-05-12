import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


interface StaffFormData {
  name: string;
  address: string;
  dateHired: string;
  designation: string;
  qualification: string;
  email: string;
  phone: string;
  homePhone: string;
}

export default function FormDialog({ addStaff }: { addStaff: (data: any) => void }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<StaffFormData>({
    name: '',
    address: '',
    dateHired: '',
    qualification: '',
    designation: '',
    email: '',
    phone: '',
    homePhone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addStaff(formData);
    handleClose();

    try {

      // Clear form data after successful submission
      setFormData({
        name: '',
        address: '',
        designation: '',
        dateHired: '',
        qualification: '',
        email: '',
        phone: '',
        homePhone: '',
      });

      handleClose();
    } catch (error) {
      console.error('Error adding staff:', error);
      // Handle error (display error message to user, etc.)
    }
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        + Add Staff
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: handleSubmit,
        }}
      >
        <DialogTitle>Add New Staff</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please fill out the form below to add a new staff member.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            value={formData.name}
            onChange={handleChange}
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Designation</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name='designation'
              value={formData.designation}
              label="Designation"
              onChange={handleChange as any}
            >
              <MenuItem value={"Doctor"}>Doctor</MenuItem>
              <MenuItem value={"Nurse"}>Nurse</MenuItem>
              <MenuItem value={"Mangement"}>Mangement</MenuItem>
            </Select>
          </FormControl>
          <TextField
            required
            margin="dense"
            id="address"
            name="address"
            label="Address"
            type="text"
            fullWidth
            value={formData.address}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="dateHired"
            name="dateHired"
            label="Date Hired"
            type="date"
            fullWidth
            value={formData.dateHired}
            onChange={handleChange}
            InputLabelProps={{ shrink: true, style: { fontSize: 'small' } }}
          />

          <TextField
            required
            margin="dense"
            id="qualification"
            name="qualification"
            label="Qualification"
            type="text"
            fullWidth
            value={formData.qualification}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            fullWidth
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            required
            margin="dense"
            id="phone"
            name="phone"
            label="Phone"
            type="tel"
            fullWidth
            value={formData.phone}
            onChange={handleChange}
            inputProps={{ pattern: "[0-9]{10}", title: "Phone number must be 10 digits" }}
          />
          <TextField
            required
            margin="dense"
            id="homePhone"
            name="homePhone"
            label="Home Phone"
            type="tel"
            fullWidth
            value={formData.homePhone}
            onChange={handleChange}
            inputProps={{ pattern: "[0-9]{10}", title: "Home phone number must be 10 digits" }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>


  );
}
