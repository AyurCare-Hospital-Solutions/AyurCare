import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import axios from "axios";

const baseURL = "/api/pms/";

export default function MedicineDialog({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => any;
}) {
  const [id, setId] = React.useState<number>();
  const [qty, setQty] = React.useState<number>();
  const [expDate, setExpDate] = React.useState<any>();

  const addPharmacyMedicine = (id: any, qty: any, expDate: any) => {
    /*
      EXPLAIN:
      As you can see, we are using axios.post. And inside axios.post,
      we have the API endpoint, which we created earlier.
      Then, we have the form fields wrapped in curly brackets.
    */

    // one para is path to call the backend
    // another one is what are that data we want to share with backend
    // TODO: ADD NOTIFICATIO AND VERIFICATION
    axios.post(`${baseURL}setPharmacyMadicine`, { id, qty, expDate });
    console.log("adding");
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            // we have to call that method
            addPharmacyMedicine(id, qty, expDate);
            handleClose();
          },
        }}
      >
        <DialogTitle>Add A New Medicine </DialogTitle>
        <DialogContent>
          {/* <MedicineList /> */}
          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="email"
            label="Medicine Name"
            type="number"
            fullWidth
            variant="standard"
            InputLabelProps={{ shrink: true }}
            onChange={(e) => {
              setId(Number(e.target.value));
            }}
          />

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
            InputLabelProps={{ shrink: true }}
            // here we have to specify the what kinda data becuase input field is retruning a string value
            onChange={(e) => {
              setQty(Number(e.target.value));
            }}
          />

          <TextField
            autoFocus
            required
            margin="dense"
            id="name"
            name="expirydate"
            label="Expriry Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            variant="standard"
            onChange={(e) => {
              setExpDate(e.target.value);
            }}
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
