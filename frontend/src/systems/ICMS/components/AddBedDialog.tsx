import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Bed } from "../types";
import { FormEvent, useEffect, useState } from "react";

const AddBedDialog = ({ open, onClose, beds, onSubmit }: {
    open: boolean,
    onClose: () => any,
    beds: Bed[],
    onSubmit: (name: number) => any
}) => {
    const [bedNo, setBedNo] = useState<string>("");
    const [error, setError] = useState<string>("");
    const [canSubmit, setCanSubmit] = useState(false);
    const existing = beds.map(v => v.number);

    useEffect(() => {
        setError("");
        setBedNo("");
        setCanSubmit(false);
    }, [open])

    useEffect(() => {
        if (bedNo === "") {
            setError("");
            setCanSubmit(false);
            return;
        }

        const parsed = Number(bedNo as any);
        if (!Number.isInteger(parsed)) {
            setError("Bed number must be an integer")
            setCanSubmit(false);
        } else if (existing.indexOf(parsed) !== -1) {
            setError("Bed number already exists")
            setCanSubmit(false);
        } else {
            setError("");
            setCanSubmit(true)
        }
    }, [bedNo])

    return <Dialog
        open={open}
        onClose={onClose}
        PaperProps={{
            component: 'form',
            onSubmit: (e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();
                onSubmit(Number(bedNo));
                onClose()
            }
        }}
    >
        <DialogTitle>Add Bed</DialogTitle>
        <DialogContent>
            <TextField
                autoFocus
                required
                margin="dense"
                label="Bed number"
                type="text"
                fullWidth
                error={error !== ""}
                helperText={error}
                value={bedNo}
                onChange={(e) => setBedNo(e.currentTarget.value)}
                variant="standard"
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={!canSubmit}>Create</Button>
        </DialogActions>
    </Dialog>
}

export default AddBedDialog;