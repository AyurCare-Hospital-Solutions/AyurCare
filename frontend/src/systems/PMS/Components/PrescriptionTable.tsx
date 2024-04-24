import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Button, Typography } from "@mui/material";

function PrescriptionTable() {
  const [prescription, setPrescription] = React.useState<any>([]);

  const getPrescription = async () => {
    await axios.get("/api/pms/getAllPrescription").then((res: any) => {
      setPrescription(res.data);
    });
  };

  React.useEffect(() => {
    getPrescription();
  }, []);

  return (
    <>
      <Typography variant="h5">Prescription Section</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> No </TableCell>
              <TableCell> Patient Name </TableCell>
              <TableCell> Diagnosis </TableCell>
              <TableCell> Dispensed Date </TableCell>
              <TableCell> Note </TableCell>
              <TableCell> Status</TableCell>
              <TableCell> Update Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prescription.map((row: any) => {
              console.log(row);
              return (
                <TableRow>
                  <TableCell> {row.id} </TableCell>
                  <TableCell> {row.PatientId} </TableCell>
                  <TableCell> {row.diagnosis}</TableCell>
                  <TableCell>
                    {new Date(
                      Date.parse(row.dispensed_date)
                    ).toLocaleDateString()}
                  </TableCell>
                  <TableCell> {row.note} </TableCell>
                  <TableCell> {row.status} </TableCell>
                  <TableCell>
                    <Button
                      sx={{
                        backgroundColor: "#0d4838",
                        fontSize: 10,
                        color: "white",
                        mr: 2,
                        transition: "opacity 0.3s ease",
                        "&:hover": {
                          backgroundColor: "#0d4838",
                          opacity: 0.7,
                        },
                      }}
                    >
                      Approve
                    </Button>
                    <Button
                      sx={{
                        backgroundColor: "red",
                        fontSize: 10,
                        color: "white",
                        transition: "opacity 0.3s ease",
                        "&:hover": {
                          backgroundColor: "red",
                          opacity: 0.7,
                        },
                      }}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
