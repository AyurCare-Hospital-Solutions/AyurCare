import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box, Autocomplete, CircularProgress, FormControlLabel, Switch } from "@mui/material";
import { Patient, PatientListSchema } from "../types";
import { useEffect, useState } from "react";
import axios from "axios";

const WaitListAddDialog = ({ open, onClose, onAdd }: {
    open: boolean,
    onClose: () => void
    onAdd: (reason: string, patientId: number, isPriority: boolean) => void
}) => {
    const [patients, setPatients] = useState<Patient[]>([]);
    const [patientsLoading, setPatientsLoading] = useState(true);

    const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

    const [reason, setReason] = useState('');
    const [reasonError, setReasonError] = useState('');
    const [isPriority, setIsPriority] = useState(false);


    useEffect(() => {
        if (!patientsLoading) return;

        axios.get(`/api/icms/patients/all`).then((res) => {
            setPatients(PatientListSchema.cast(res.data));
            setPatientsLoading(false)
        })
    }, []);

    useEffect(() => {
        setSelectedPatient(null);
        setPatientsLoading(false);
        setReason("");
        setIsPriority(false);
    }, [open]);

    const updateReason = (v: string) => {
        if (v.length < 4) {
            setReasonError("Reason is too short");
        } else if (v.length > 100) {
            setReasonError("Reason is too long");
        } else {
            setReasonError("")
        }
        setReason(v)
    }

    const onSubmit = () => {
        if (!selectedPatient) return;
        onAdd(reason, selectedPatient.id, isPriority);
        onClose();
    }



    return <>
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
        >
            <DialogTitle>Add patient to list</DialogTitle>

            <DialogContent >
                <Box >

                    <Autocomplete
                        getOptionLabel={(option) => option.name}
                        options={patients}
                        loading={patientsLoading}
                        value={selectedPatient}
                        sx={{ mt: 2 }}
                        onChange={(_, v) => { setSelectedPatient(v) }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Patient"
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <>
                                            {patientsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </>
                                    ),
                                }}
                            />

                        )}
                    />
                    <Box display="flex" justifyContent="space-between">
                        <TextField
                            autoFocus
                            required
                            label="Reason"
                            type="text"
                            sx={{ mt: 2 }}
                            error={reasonError !== ''}
                            helperText={reasonError}
                            value={reason}
                            onChange={(e) => updateReason(e.target.value)}
                        />

                        <FormControlLabel sx={{ my: "auto" }} control={<Switch onChange={(_, v) => setIsPriority(v)} value={isPriority} />} label="Is Priority" />
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={onSubmit} disabled={reason === "" || selectedPatient === null || reasonError !== ""}>Add Patient</Button>
                <Button onClick={onClose} >Close</Button>
            </DialogActions>
        </Dialog>

    </>
};

export default WaitListAddDialog;