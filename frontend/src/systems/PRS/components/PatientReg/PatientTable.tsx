import React, { useEffect, useState } from "react";
import { DataGrid, GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreIcon from "@mui/icons-material/More";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Box, ThemeProvider } from "@mui/material";
import PatientRegForm from "./PatientRegForm";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function DataGridTest() {
  const [data, setData] = React.useState<any>([]);

  async function getNBATeamData() {
    await axios.get("/api/prss/get-patients").then((res) => {
      setData(res.data);
    });
  }

  useEffect(() => {
    getNBATeamData();
  }, []);

  // create columns
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 100 },
    { field: "idDb", headerName: "IdPk", width: 100 },
    { field: "tracking_no", headerName: "Tracking No", width: 100 },
    { field: "name", headerName: "Name", width: 300 },
    { field: "nic", headerName: "NIC", width: 150 },
    { field: "gender", headerName: "Gender", width: 90 },
    { field: "phone", headerName: "Phone", width: 150 },
    // { field: "email", headerName: "Email", width: 150 },
    {
      field: "actions",
      width: 150,
      renderCell: (params) => [
        <GridActionsCellItem
          icon={<MoreIcon />}
          label='View_More'
          onClick={() => handleClickMoreDetails(params.row.id)}
        />,
        <GridActionsCellItem
          icon={<EditIcon />}
          label='Edit'
          onClick={() => handleClickEdit(params.row.id)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label='Delete'
          onClick={() => handleClickDeleteIcon(params.row.id)}
        />,
      ],
    },
  ];

  // cosnt setOpenedit state
  const [openEdit, setOpenEdit] = React.useState(false);

  // handleEditClose
  const handleEditClose = () => {
    setOpenEdit(false);
    setSelectedRowData(null);
  };

  // handle the edit Item
  function handleClickEdit(id: number) {
    setOpenEdit(true);
    setSelectedRowData(data[id]);
  }

  // set the rows
  const rows = data.map((row: any, index = 0) => ({
    id: index++,
    tracking_no: row.tracking_no,
    name: row.name,
    nic: row.nic,
    gender: row.gender,
    phone: row.phone,
    idID: row.id,
    // email: row.email,
  }));

  // dialog box
  const [open, setOpen] = React.useState(false);

  // Define state for storing selected row data
  const [selectedRowData, setSelectedRowData] = React.useState<any | null>(
    null
  );

  function handleClickMoreDetails(id: number) {
    setOpen(true);
    setSelectedRowData(data[id]);
  }

  // handle the delete Item
  async function handleClickDeleteIcon(id: number) {
    console.log(id);
    const patient = data[id];
    const res = await axios.delete(`/api/prss/delete-patient/${patient.id}`);
    if (res.data.msg) {
      alert(res.data.msg);
    }
    getNBATeamData();
  }

  // console.log(selectedRowData);

  const handleClose = () => {
    setOpen(false);
    setSelectedRowData(null);
  };

  return (
    <div>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
          columns: {
            columnVisibilityModel: {
              id: false,
              idDb: false,
              email: false,
            },
          },
        }}
      />
      <React.Fragment>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby='customized-dialog-title'
          open={open}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
            Patient's Details
          </DialogTitle>
          <IconButton
            aria-label='close'
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent
            dividers
            sx={{ justifyContent: "left", display: "flex", gap: 2 }}
          >
            <AccountCircleIcon
              sx={{
                color: "#1e3620",
                fontSize: 100,
              }}
            />
            <ThemeProvider
              theme={{
                palette: {
                  primary: {
                    main: "#ffffff",
                    dark: "#dce3e2",
                  },
                },
              }}
            >
              <Box
                boxShadow={3}
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: 3,
                  bgcolor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
                pl={2}
                pt={1}
              >
                <Typography
                  gutterBottom
                  variant='h4'
                  sx={{ fontWeight: "semibold" }}
                >
                  {selectedRowData && selectedRowData.name}
                  <Typography color='text.secondary'>
                    {selectedRowData &&
                    selectedRowData.gender.toLowerCase() === "male"
                      ? "Mr."
                      : "Mrs."}
                  </Typography>
                  <Typography color='text.secondary'>
                    Tracking No:{" "}
                    {selectedRowData && selectedRowData.tracking_no}
                  </Typography>
                </Typography>
              </Box>
            </ThemeProvider>
          </DialogContent>
          <DialogContent
            sx={{ justifyContent: "left", display: "flex", gap: 1 }}
          >
            <ThemeProvider
              theme={{
                palette: {
                  primary: {
                    main: "#ffffff",
                    dark: "#dce3e2",
                  },
                },
              }}
            >
              <Box
                boxShadow={3}
                sx={{
                  width: 500,
                  height: "auto",
                  borderRadius: 3,
                  bgcolor: "primary.main",
                  "&:hover": {
                    bgcolor: "primary.dark",
                  },
                }}
                pl={2}
                pt={1}
                pr={2}
                pb={1}
              >
                <Typography color='text.secondary'>
                  <b>Gender:</b> {selectedRowData && selectedRowData.gender}
                </Typography>
                <Typography color='text.secondary'>
                  <b>National ID No: </b>
                  {selectedRowData && selectedRowData.nic}
                </Typography>
                <Typography color='text.secondary'>
                  <b>BirthDay: </b>
                  {selectedRowData && selectedRowData.dob}
                </Typography>
                <Typography color='text.secondary'>
                  <b>Phone No: </b>
                  {selectedRowData && selectedRowData.phone}
                </Typography>
                <Typography color='text.secondary'>
                  <b>Email: </b>
                  {selectedRowData && selectedRowData.email}
                </Typography>
                <Typography color='text.secondary'>
                  <b>Address: </b>
                  {selectedRowData && selectedRowData.address}
                </Typography>
                <Typography color='text.secondary'>
                  <b>Profile Created: </b>
                  {selectedRowData &&
                    new Date(selectedRowData.createdAt).toLocaleString()}
                </Typography>
                <Typography color='text.secondary'>
                  <b>Profile Updated: </b>
                  {selectedRowData &&
                    new Date(selectedRowData.updatedAt).toLocaleString()}
                </Typography>
              </Box>
            </ThemeProvider>
          </DialogContent>
        </BootstrapDialog>
      </React.Fragment>
      <React.Fragment>
        <BootstrapDialog
          onClose={handleEditClose}
          aria-labelledby='customized-dialog-title'
          open={openEdit}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id='customized-dialog-title'>
            Edit Patient's Details
          </DialogTitle>
          <IconButton
            aria-label='close'
            onClick={handleEditClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent
            sx={{ justifyContent: "left", display: "flex", gap: 1 }}
          >
            <PatientRegForm patientDetails={selectedRowData} />
          </DialogContent>
        </BootstrapDialog>
      </React.Fragment>
    </div>
  );
}

export default DataGridTest;
