import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";

export default function NewShiftTypeDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  return (
    <>
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

          <TextField
            sx={{ mt: 3 }}
            id="name"
            name="name"
            fullWidth
            required
            value={name}
            label="Shift Type"
            variant="outlined"
            onChange={(name) => setName(name.target.value)}
          />

          <div style={{ display: "flex", gap: "16px", marginTop: "1rem" }}>
            <DatePicker label="Start Time" />

            <DatePicker label="End Time" />
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
