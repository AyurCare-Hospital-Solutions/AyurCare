import { Box, Button, Card, Table, TableBody, TableCell, TableRow, TextField, Typography } from "@mui/material";
import { CarePlan } from "../types"
import { useState } from "react";
import { useConfirm } from "material-ui-confirm";

const CarePlanInfo = ({ data, onEdit }: { data?: CarePlan | null, onEdit: (c: CarePlan & { id: number | null }) => void }) => {
    const [edit, setEdit] = useState(false);
    const [diagnosis, setDiagnosis] = useState("");
    const [condition, setCondition] = useState("");
    const [treatment, setTreatment] = useState("");

    const [errors, setError] = useState({ diagnosis: '', condition: '', treatment: '' });

    const confirm = useConfirm();


    const onSubmit = async () => {
        await confirm({ description: "Update care plan" });
        onEdit({
            id: data ? data.id : null as any,
            diagnosis: diagnosis,
            treatmentPlan: treatment,
            condition: condition,
        });
        setEdit(false);
    }

    const onCancel = async () => {
        await confirm({ description: "Discard Changes?" });
        setEdit(false);
    };

    const enableEdit = () => {
        setEdit(true);
        setDiagnosis(data?.diagnosis ?? "");
        setCondition(data?.condition ?? "");
        setTreatment(data?.treatmentPlan ?? "");
    }

    const updateTreatmentPlan = (v: string) => {
        setTreatment(v);
        if (v.length < 4) {
            setError({ ...errors, treatment: "Treatment plan must be at least 4 characters" })
        } else if (v.length > 1000) {
            setError({ ...errors, treatment: "Treatment plan must be less that 1000 characters" })
        } else {
            setError({ ...errors, treatment: "" })
        }
        setTreatment(v)
    }

    const updateCondition = (v: string) => {
        if (v.length < 4) {
            setError({ ...errors, condition: "Condition must be at least 4 characters" })
        } else if (v.length > 100) {
            setError({ ...errors, condition: "Treatment plan must be less that 100 characters" })
        } else {
            setError({ ...errors, condition: "" })
        }
        setCondition(v)
    }

    const updateDiagnosis = (v: string) => {
        if (v.length < 4) {
            setError({ ...errors, diagnosis: "Diagnosis must be at least 4 characters" })
        } else if (v.length > 100) {
            setError({ ...errors, diagnosis: "Treatment plan must be less that 100 characters" })
        } else {
            setError({ ...errors, diagnosis: "" })
        }
        setDiagnosis(v)
    }



    return <>
        <Box sx={{ py: 4 }}>
            <Typography variant="h5">Care Plan</Typography>
            <Card variant="outlined" sx={{ py: "16px" }}>
                {data || edit ? <>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Diagnosis</TableCell>
                                <TableCell>
                                    {edit ? <TextField
                                        type="text"
                                        fullWidth
                                        hiddenLabel
                                        error={errors.diagnosis !== ""}
                                        helperText={errors.diagnosis}
                                        value={diagnosis}
                                        onChange={(e) => { updateDiagnosis(e.target.value) }}
                                    /> : <Typography>{data?.diagnosis}</Typography>}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Condition</TableCell>
                                <TableCell>
                                    {edit ? <TextField
                                        type="text"
                                        fullWidth
                                        hiddenLabel
                                        error={errors.condition !== ""}
                                        helperText={errors.condition}
                                        value={condition}
                                        onChange={(e) => { updateCondition(e.target.value) }}
                                    /> : <Typography>{data?.condition}</Typography>}
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>
                                    <Typography sx={{ verticalAlign: "start" }}>Treatment Plan</Typography>
                                </TableCell>
                                <TableCell >
                                    {edit ? <TextField
                                        type="text"
                                        fullWidth
                                        hiddenLabel
                                        error={errors.treatment !== ""}
                                        helperText={errors.treatment}
                                        value={treatment}
                                        onChange={(e) => { updateTreatmentPlan(e.target.value) }}
                                        multiline
                                    /> : <Typography component="pre">{data?.treatmentPlan}</Typography>}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Box sx={{ m: 3, display: "flex" }}>
                        {edit ?
                            <>
                                <Button sx={{ ml: "auto" }} variant="contained" onClick={onCancel} color="secondary">Cancel</Button>
                                <Button sx={{ ml: 2 }} variant="contained" onClick={onSubmit} color="primary" disabled={errors.condition !== "" || errors.diagnosis !== "" || errors.treatment !== "" || condition == "" || treatment == "" || diagnosis == ""}>Submit</Button>
                            </> :
                            <Button sx={{ ml: "auto" }} variant="contained" onClick={enableEdit}>Edit</Button>
                        }

                    </Box>
                </>
                    : <Box sx={{ my: 2, mx: 4 }}>
                        <Typography >No Care plan found</Typography>
                        <Box sx={{ m: 3, display: "flex" }}>
                            <Button sx={{ ml: "auto" }} variant="contained" onClick={enableEdit}>Create</Button>
                        </Box>
                    </Box>}
            </Card >

        </Box >
    </>
}

export default CarePlanInfo;