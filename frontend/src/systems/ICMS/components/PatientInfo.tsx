import { Card, Typography, Table, TableBody, TableRow, TableCell } from "@mui/material"
import { Admission } from "../types";
import dayjs from "dayjs";

const PatientInfo = ({ admission }: { admission: Admission | undefined }) => {
    return <>
        <Card sx={{ px: "16px", pb: 0, pt: "24px", mt: 2, mb: 4 }} variant="outlined">
            <Typography variant="h6" >Patient Details</Typography>
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
                        <TableCell>Age</TableCell>
                        <TableCell>{admission ? dayjs().diff(admission.Patient.dob, "years") + " year(s)" : null}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>DOB</TableCell>
                        <TableCell>{admission?.Patient.dob.toLocaleDateString()}</TableCell>
                    </TableRow>
                    <TableRow >
                        <TableCell sx={{ borderBottomStyle: "none" }}>Gender</TableCell>
                        <TableCell sx={{ borderBottomStyle: "none" }}>{admission?.Patient.gender}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </Card >
        <Card sx={{ px: "16px", pb: 0, pt: "24px", }} variant="outlined">
            <Typography variant="h6" >Admission Details</Typography>
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
                        <TableCell sx={{ borderBottomStyle: "none" }}>Bed No</TableCell>
                        <TableCell sx={{ borderBottomStyle: "none" }}>{admission?.Bed.id}</TableCell>
                    </TableRow>

                </TableBody>
            </Table>
        </Card>
    </>
}

export default PatientInfo;