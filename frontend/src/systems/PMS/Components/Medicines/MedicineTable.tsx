import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableLoader from "../../../../components/TableLoader";

export default function MedicineTable({
  medicine,
  query,
}: {
  medicine: any[];
  query: string;
}) {
  // Ensure medicine is initialized with an empty array if it's undefined
  const medicineData = medicine || [];

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> Medicine No </TableCell>
              <TableCell> Medicine Name </TableCell>
              <TableCell> Expiry Date </TableCell>
              <TableCell> Stock Level </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {medicineData.length > 0 ? (
              medicineData
                .filter((e: any) => {
                  if (query) {
                    return e.Medicine.Item.name.search(query) !== -1;
                  }
                  return true;
                })
                .map((row: any) => (
                  <TableRow key={row.id}>
                    <TableCell> {row.id} </TableCell>
                    <TableCell> {row.Medicine.Item.name} </TableCell>
                    <TableCell> {row.expire_date} </TableCell>
                    <TableCell> {row.id} </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableLoader columns={4} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
