import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function LeaveTypeDialog({addLeaveType}: {addLeaveType: (data: any) => any} ) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const [duration, setDuration] = React.useState(0);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Leave Type
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            addLeaveType({name, duration});
            handleClose();
          },
        }}
      >
        <DialogTitle>Add new leave type</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae maxime! 
          </DialogContentText>
          
          <TextField
            autoFocus
            required
            margin="dense"
            name="name"
            label="Leave Type Name"
            type="text"
            variant="standard"
            onChange ={(e) => setName(e.target.value)}
          />

          <br/>

          <TextField
            autoFocus
            required
            margin="dense"
            name="duration"
            label="Duration (hours)"
            type="text"
            variant="standard"
            onChange={(e) => setDuration(Number.parseInt(e.target.value))}
            style={{textAlign: 'right', width: 'fit-content'}}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add Leave Type</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}