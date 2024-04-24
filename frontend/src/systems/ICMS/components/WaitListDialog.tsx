import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Table, TableBody, TableCell, TableRow, TextField, Typography, Autocomplete, CircularProgress } from "@mui/material";
import { Bed, BedArraySchema, WaitList, Ward } from "../types";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import axios from "axios";

const WaitListDialog = ({ row, wards, open, onAdmit, onClose }: {
    row?: WaitList,
    wards: Ward[],
    open: boolean,
    onAdmit: (bed: Bed) => void,
    onClose: () => void
}) => {
    const [admitOpen, setAdmitOpen] = useState(false);
    const [availableBeds, setAvailableBeds] = useState<Bed[]>([]);
    const [bedsLoading, setBedsLoading] = useState(false);

    const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
    const [selectedBed, setSelectedBed] = useState<Bed | null>(null);

    useEffect(() => {
        if (!bedsLoading || !selectedWard) return;
        axios.get(`/api/icms/beds/available/${selectedWard.id}`).then((res) => {
            setAvailableBeds(BedArraySchema.cast(res.data));
            setBedsLoading(false)
        })
    }, [selectedWard]);

    useEffect(() => {
        setAdmitOpen(false);
        setAvailableBeds([]);
        setSelectedWard(null);
        setSelectedBed(null);
        setBedsLoading(false);
    }, [open])


    const handleAdmitClose = () => {
        setAdmitOpen(false);
    }

    return <>
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
        >
            <DialogTitle>Patient Info</DialogTitle>
            <DialogContent>
                <Table size="small" >
                    <TableBody>
                        <TableRow>
                            <TableCell>Tracking No</TableCell>
                            <TableCell>
                                <Typography>{row?.Patient.tracking_no}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>
                                <Typography>{row?.Patient.name}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Gender</TableCell>
                            <TableCell>
                                <Typography>{row?.Patient.gender}</Typography>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Age</TableCell>
                            <TableCell>{row ? dayjs().diff(row.Patient.dob, "years") + " year(s)" : null}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Is Priority</TableCell>
                            <TableCell>{row?.is_priority ? "Yes" : "No"}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Date Added</TableCell>
                            <TableCell>{row ? dayjs(row.createdAt).format("DD/MM/YYYY HH:mm:ss") : null}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setAdmitOpen(true)}>Admit Patient</Button>
                <Button onClick={onClose} >Close</Button>
            </DialogActions>
        </Dialog>

        <Dialog
            open={admitOpen}
            onClose={handleAdmitClose}
            fullWidth
            PaperProps={{
                component: 'form',
                onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                    event.preventDefault();
                    if (selectedBed) onAdmit(selectedBed);
                    setAdmitOpen(false);
                    onClose();
                },
            }}
        >
            <DialogTitle>Admit Patient</DialogTitle>
            <DialogContent sx={{ display: "flex" }}>
                <Autocomplete
                    sx={{ mt: 1, flexGrow: 1 }}
                    getOptionLabel={(option) => option.name}
                    options={wards}
                    value={selectedWard}
                    onChange={(_, v) => { setSelectedWard(v), setBedsLoading(v != null); setAvailableBeds([]) }}
                    renderInput={(params) => <TextField {...params} label="Ward" />}
                />
                <Autocomplete
                    sx={{ mt: 1, ml: 2, flexGrow: 1 }}
                    getOptionLabel={(option) => option.id.toString()}
                    options={availableBeds}
                    loading={bedsLoading}
                    value={selectedBed}
                    onChange={(_, v) => { setSelectedBed(v) }}
                    disabled={!selectedWard}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Bed"
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <>
                                        {bedsLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                        {params.InputProps.endAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleAdmitClose}>Cancel</Button>
                <Button type="submit" disabled={!selectedBed}>Admit Patient</Button>
            </DialogActions>
        </Dialog>
    </>
};

export default WaitListDialog;