import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormEvent, useEffect, useState } from 'react';


export default ({ open, onClose, onSubmit }: { open: boolean, onClose: () => any, onSubmit: (v: any) => any }) => {

    const [wardValue, setWardValue] = useState('')
    const [wardError, setWardError] = useState('');

    const [canSubmit, setCanSubmit] = useState(false);



    useEffect(() => {
        setCanSubmit(wardError === '');
    }, [wardError]);

    useEffect(() => {
        setCanSubmit(false);
        setWardError('');
        setWardValue('')
    }, [open])

    const updateWardValue = (v: string) => {
        if (v.length < 3) {
            setWardError("Name is too short");
        } else if (v.length > 100) {
            setWardError("Name is too long");
        } else {
            setWardError("");
        }

        setWardValue(v);
    }


    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        const formJson = Object.fromEntries((formData as any).entries());
                        onSubmit(formJson);
                        onClose()
                    }
                }}
            >
                <DialogTitle>Create Ward</DialogTitle>
                <DialogContent>
                    <br />
                    <TextField
                        autoFocus
                        required
                        name="name"
                        label="Ward Name"
                        type="text"
                        error={wardError !== ''}
                        helperText={wardError}
                        value={wardValue}
                        onChange={(e) => updateWardValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" disabled={!canSubmit}>Create</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}