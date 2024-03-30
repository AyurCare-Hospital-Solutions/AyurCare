import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MedicineList from './MedicinceList';

export default function MedicineDialog({open, handleClose} :{open:  boolean, handleClose: () => any},) {
  
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add A New Medicine </DialogTitle>
        <DialogContent>
          
          <MedicineList />
        
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Quantity"
            type="number"
            fullWidth
            variant="standard"
            InputLabelProps={{shrink: true}}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="expirydate"
            label="Expriry Date"
            type="date"
            InputLabelProps={{shrink: true}}
            fullWidth
            variant="standard"
          />
          
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
