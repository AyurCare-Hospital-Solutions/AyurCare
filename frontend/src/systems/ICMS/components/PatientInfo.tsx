import { Grid, Card, Typography, Table, TableBody, TableRow, TableCell } from "@mui/material"
import { Admission } from "../types";

const PatientInfo = ({ admission }: { admission: Admission | undefined }) => {
    return <>
        <Typography variant="h5"> Patient Details</Typography>
        <Grid container pt={3} justifyContent="space-around">
            <Grid item xs={5}>
                <Card sx={{ p: "16px" }}>
                    <Typography fontWeight="550">Patient Details</Typography>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Patient ID</TableCell>
                                <TableCell>{admission?.Patient.id}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{admission?.Patient.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>DOB</TableCell>
                                <TableCell>{admission?.Patient.dob.toLocaleDateString()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Gender</TableCell>
                                <TableCell>{admission?.Patient.gender}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </Card>
            </Grid>
            <Grid item xs={5}>
                <Card sx={{ p: "16px" }}>
                    <Typography fontWeight="550">Admission Details</Typography>
                    <Table  >
                        <TableBody>
                            <TableRow>
                                <TableCell>Admission No</TableCell>
                                <TableCell>{admission?.id}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>{admission?.createdAt.toLocaleDateString()}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Ward</TableCell>
                                <TableCell>{admission?.Bed.Ward.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Bed No</TableCell>
                                <TableCell>{admission?.Bed.id}</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </Card>
            </Grid>
        </Grid>
    </>
}

export default PatientInfo;