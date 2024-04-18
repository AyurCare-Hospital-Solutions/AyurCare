import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormEvent, useEffect, useState } from 'react';
import { ward } from '../types';


export default ({ open, data, action, onClose, onSubmit }: { open: boolean, action: string, data?: ward, onClose: () => any, onSubmit: (name: string) => any }) => {

    const [wardValue, setWardValue] = useState('')
    const [wardError, setWardError] = useState('');

    const [canSubmit, setCanSubmit] = useState(false);

    useEffect(() => {
        if (data) {
            updateWardValue(data.name);
        } else {
            setCanSubmit(false);
            setWardError('');
            setWardValue('');
        }
    }, [open, data])

    useEffect(() => {
        setCanSubmit(wardError === '');
    }, [wardError])

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
                        onSubmit(formData.get("name") as string);
                        onClose()
                    }
                }}
            >
                <DialogTitle>{action} Ward</DialogTitle>
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
                    <Button type="submit" disabled={!canSubmit}>{action}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}