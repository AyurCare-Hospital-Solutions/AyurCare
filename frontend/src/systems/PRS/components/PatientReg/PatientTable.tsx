import * as React from "react";
import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

// Assuming you have these functions defined elsewhere
// async function getPatients(page, rowsPerPage) {
//   // Implement logic to fetch data from your database using Sequelize
//   // This example uses placeholder data
//   const patients = [
//     {
//       name: "John Doe",
//       nic: "123456789V",
//       phone: "0123456789",
//       dob: "1990-01-01",
//       gender: "Male",
//       email: "john.doe@example.com",
//       address: "123 Main St",
//       tracking_no: "ABC123",
//     },
//     // Add more patient data here
//   ];
//   return patients.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
// }

// function getTotalPatientsCount() {
//   // Implement logic to get total patient count from your database
//   // This example uses a placeholder value
//   return 100;
// }

const useStyles = makeStyles({
  tableCell: {
    minWidth: 150,
  },
});

export default function PatientTable() {
  const classes = useStyles();

  const [patients, setPatients] = React.useState([]);
  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getPatients(page, rowsPerPage);
  //     setPatients(data);
  //   };
  //   fetchData();
  // }, [page, rowsPerPage]);

  const columns = [
    { id: "name", label: "Name" },
    { id: "nic", label: "NIC" },
    { id: "phone", label: "Phone" },
    { id: "dob", label: "DoB" },
    { id: "gender", label: "Gender" },
    { id: "email", label: "Email" },
    { id: "address", label: "Address" },
    { id: "tracking_no", label: "Tracking No" },
  ];

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} className={classes.tableCell}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map((row) => (
              <TableRow hover role='checkbox' tabIndex={-1} key={row}>
                {columns.map((column) => (
                  <TableCell key={column.id} className={classes.tableCell}>
                    {row[column.id]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={getTotalPatientsCount()}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
