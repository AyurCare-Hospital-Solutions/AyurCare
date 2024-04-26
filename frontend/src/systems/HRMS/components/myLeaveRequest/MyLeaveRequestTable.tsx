import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import { TableHead } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Chip from "@mui/material/Chip";
import UpdateLeaveRequestDialog from "./UpdateLeaveRequestDialog"; // Import your update dialog component
import axios from "axios";
import { ChangeEvent, MouseEvent, useEffect, useState } from "react";
import { LeaveTypeData, MyLeaveRequestData } from "../../types";
import { Dayjs } from "dayjs";

export default function MyLeaveRequestTable({
  rows,
  deleteLeaveRequest,
}: {
  rows: MyLeaveRequestData[];
  deleteLeaveRequest: (id: number) => void;
}) {
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<MyLeaveRequestData | null>(
    null
  );

  // const handleEdit = (row: RowData) => {
  //   setSelectedRow(row);
  //   setOpen(true);
  // };

  // useEffect(() => {
  //   const fetchAllLeaveRequests = async () => {
  //     const allLeaveRequests = await axios.get("/api/hrms/leave/user");
  //     const leaveRequestData = allLeaveRequests.data;

  //     setRowData(leaveRequestData);
  //   };

  //   fetchAllLeaveRequests();
  // }, []);

  const [page, setPage] = useState(0);
  const [rowDataPerPage, setrowDataPerPage] = useState(5);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedLeaveRequest, setSelectedLeaveRequest] =
    useState<MyLeaveRequestData | null>(null);

  const [rowData, setRowData] = useState<MyLeaveRequestData[]>([]);

  const emptyrowData =
    page > 0 ? Math.max(0, (1 + page) * rowDataPerPage - rowData.length) : 0;

  const handleChangePage = (
    _event: MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangerowDataPerPage = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setrowDataPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEditClick = (row: MyLeaveRequestData) => {
    setSelectedLeaveRequest(row);
    console.log(row);
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              <TableCell>Leave ID</TableCell>
              <TableCell align="right">Reason</TableCell>
              <TableCell align="right">Type</TableCell>
              <TableCell align="right">Hours</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Start Date</TableCell>
              <TableCell align="right">End Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowDataPerPage > 0
              ? rowData.slice(
                  page * rowDataPerPage,
                  page * rowDataPerPage + rowDataPerPage
                )
              : rows
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.leaveReason}</TableCell>
                <TableCell align="right">{row.leaveType?.name}</TableCell>
                <TableCell align="right">{row.hours}</TableCell>
                <TableCell align="right">
                  <Chip
                    label={row.status}
                    color={
                      row.status === "Approved"
                        ? "success"
                        : row.status === "Rejected"
                        ? "error"
                        : row.status === "Pending"
                        ? "warning"
                        : "default"
                    }
                  />
                </TableCell>
                <TableCell align="right">{row.startDate}</TableCell>
                <TableCell align="right">
                  {row.endDate ?? row.startDate}
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="edit"
                    onClick={() => handleEditClick(row)}
                    color="inherit"
                  >
                    <EditIcon style={{ color: "black" }} />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    color="inherit"
                    onClick={() => deleteLeaveRequest(row.id)}
                  >
                    <DeleteIcon style={{ color: "red" }} />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {emptyrowData > 0 && (
              <TableRow style={{ height: 53 * emptyrowData }}>
                <TableCell colSpan={8} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={8}
                count={rowData.length}
                rowsPerPage={rowDataPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangerowDataPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>

      <UpdateLeaveRequestDialog
        open={openUpdateDialog}
        onClose={() => setOpenUpdateDialog(false)}
        leaveRequestData={selectedLeaveRequest}
      />
    </>
  );
}
