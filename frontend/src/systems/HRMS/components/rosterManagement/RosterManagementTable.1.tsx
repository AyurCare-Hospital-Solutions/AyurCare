import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { ShiftData } from "../../types";
import SearchBar from "../SearchBar";
import { Box } from "@mui/material";

export default function RosterManagementTable({
  shiftData,
  setSelectedShift,
}: {
  shiftData: ShiftData[];
  setSelectedShift: (row: ShiftData) => void;
}) {
  const [onSearch, setOnSearch] = React.useState<RegExp | undefined>();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Box sx={{ m: 4 }}>
        <SearchBar onChange={(e) => setOnSearch(e)} />
      </Box>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Employees</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {shiftData
              .filter((v) => {
                if (onSearch) return v.ShiftType.name.search(onSearch) !== -1;
                return true;
              })
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow
                    onClick={() => {
                      setSelectedShift(row);
                    }}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>{row.ShiftType.name}</TableCell>
                    <TableCell>{row.Staffs.length.toString()}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={shiftData?.length ?? 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
