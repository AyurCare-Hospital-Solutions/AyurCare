import { Card, Divider, Grid, List, ListItem, ListItemText, Table, TableBody, TableCell, TableRow, Typography } from "@mui/material";


const CarePlan = () => {
    return <>
        <Typography variant="h5"> Patient Details</Typography>
        <Divider />

        <Grid container pt={3} justifyContent="space-around">
            <Grid item xs={5}>
                <Card sx={{ p: "16px" }}>
                    <Typography fontWeight="550">Patient Details</Typography>
                    <Table size="small">
                        <TableBody>
                            <TableRow>
                                <TableCell>Patient ID</TableCell>
                                <TableCell>12</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>nkgndinhienr</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>DOB</TableCell>
                                <TableCell>01/02/2003</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Gender</TableCell>
                                <TableCell>Male</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </Card>
            </Grid>
            <Grid item xs={5}>
                <Card sx={{ p: "16px" }}>
                    <Typography fontWeight="550">Admission Details</Typography>
                    <Table size="small" >
                        <TableBody>
                            <TableRow>
                                <TableCell>Admission No</TableCell>
                                <TableCell>1223</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>01/02/2003</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Ward</TableCell>
                                <TableCell>12</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Bed No</TableCell>
                                <TableCell>1</TableCell>
                            </TableRow>

                        </TableBody>
                    </Table>
                </Card>
            </Grid>
        </Grid>
    </>
}

export default CarePlan;