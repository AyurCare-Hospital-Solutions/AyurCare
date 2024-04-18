import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormEvent, useEffect, useState } from 'react';


export default ({ open, onClose, onSubmit }: { open: boolean, onClose: () => any, onSubmit: (log: string) => any }) => {

    const [logValue, setLogValue] = useState('')
    const [logError, setLogError] = useState('');

    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        setCanSubmit(false);
        setLogError('');
        setLogValue('');
    }, [open])

    useEffect(() => {
        setCanSubmit(logError === '');
    }, [logError])

    const updateLogValue = (v: string) => {
        if (v.length < 3) {
            setLogError("Log message is too short");
        } else if (v.length > 500) {
            setLogError("Log message is too long");
        } else {
            setLogError("");
        }

        setLogValue(v);
    }


    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                fullWidth={true}
                PaperProps={{
                    component: 'form',
                    onSubmit: (event: FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        const formData = new FormData(event.currentTarget);
                        onSubmit(formData.get("name") as string);
                        onClose()
                    }
                }}
            >
                <DialogTitle>Add Log Message</DialogTitle>
                <DialogContent>
                    <br />
                    <TextField
                        autoFocus
                        required
                        name="name"
                        label="Message"
                        type="text"
                        fullWidth={true}
                        multiline
                        rows={6}
                        error={logError !== ''}
                        helperText={logError}
                        value={logValue}
                        onChange={(e) => updateLogValue(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}>Cancel</Button>
                    <Button type="submit" disabled={!canSubmit}>Add</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}