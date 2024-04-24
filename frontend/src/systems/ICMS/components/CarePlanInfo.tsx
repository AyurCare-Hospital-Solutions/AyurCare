import { Box, Button, Card, Table, TableBody, TableCell, TableRow, TextField, Typography } from "@mui/material";
import { CarePlan } from "../types"
import { useState } from "react";
import { useConfirm } from "material-ui-confirm";

const CarePlanInfo = ({ data, onEdit }: { data: CarePlan | undefined, onEdit: (c: CarePlan) => void }) => {
    const [edit, setEdit] = useState(false);
    const [diagnosis, setDiagnosis] = useState("");
    const [condition, setCondition] = useState("");
    const [treatment, setTreatment] = useState("");

    const confirm = useConfirm();

    const onSubmit = async () => {
        if (!data) {
            return;
        }

        await confirm({ description: "Update care plan" });
        onEdit({
            id: data?.id,
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



    return <>
        <Box sx={{ py: 4 }}>
            <Typography variant="h5">Care Plan</Typography>
            <Card variant="outlined" sx={{ py: "16px" }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Diagnosis</TableCell>
                            <TableCell>
                                {edit ? <TextField
                                    type="text"
                                    fullWidth
                                    hiddenLabel
                                    value={diagnosis}
                                    onChange={(e) => { setDiagnosis(e.target.value) }}
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
                                    value={condition}
                                    onChange={(e) => { setCondition(e.target.value) }}
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
                                    value={treatment}
                                    onChange={(e) => { setTreatment(e.target.value) }}
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
                            <Button sx={{ ml: 2 }} variant="contained" onClick={onSubmit} color="primary">Submit</Button>
                        </> :
                        <Button sx={{ ml: "auto" }} variant="contained" onClick={enableEdit}>Edit</Button>
                    }

                </Box>
            </Card>
        </Box>
    </>
}

export default CarePlanInfo;