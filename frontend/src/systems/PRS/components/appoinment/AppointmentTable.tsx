import React, { useEffect, useState } from "react";
import {
  DataGrid,
  GridActionsCellItem,
  GridCloseIcon,
  GridColDef,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import SendIcon from "@mui/icons-material/Send";
import {
  Box,
  Button,
  Card,
  CardContent,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import Appointment from "../../Appointment";
import { useConfirm } from "material-ui-confirm";
import axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface Appointment {
  id: number;
  PatientId: number;
  status: string;
  Patient?: any;
}

function AppointmentTable({ appointments }: { appointments?: Appointment[] }) {
  // state to the appointment data
  const [appointmentData, setAppointmentData] = useState<any>([]);

  // useState for the selectedRow details
  const [selectedRowData, setSelectedRowData] = React.useState<Appointment>({
    id: 0,
    PatientId: 0,
    status: "",
    Patient: {},
  });

  // dialog box
  const [open, setOpen] = React.useState(false);

  // consfirm
  const confirm = useConfirm();

  useEffect(() => {
    if (appointments) {
      setAppointmentData(appointments);
    }
  }, [appointments]);

  // create columns
  const columns: GridColDef[] = [
    { field: "id", headerName: "Appointment No", width: 150, align: "center" },
    { field: "Aid", headerName: "Appointmant ID", width: 150 },
    {
      field: "patientId",
      headerName: "Patient ID",
      width: 100,
      align: "center",
    },
    {
      field: "patientName",
      headerName: "Patient Name",
      width: 200,
      align: "center",
    },
    {
      field: "tracking_no",
      headerName: "Tracking No",
      width: 150,
      align: "center",
    },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      align: "center",
      renderCell: (params) => {
        return (
          <Stack>
            <Box
              sx={{
                backgroundColor:
                  params.row.status === "pending" ? "red" : "green",
                color: "white",
                borderRadius: 2,
                textAlign: "center",
                width: 100,
              }}
            >
              {params.row.status}
            </Box>
          </Stack>
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      align: "center",
      width: 150,
      renderCell: (params) => [
        <Tooltip title='Edit appointment details' arrow>
          <GridActionsCellItem
            icon={<EditIcon />}
            label='Edit'
            onClick={() => handleClickEdit(params.row.id)}
          />
        </Tooltip>,
        <Tooltip title='Delete Appointment record' arrow>
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label='Delete'
            onClick={() => handleClickDeleteIcon(params.row.id)}
          />
        </Tooltip>,
      ],
    },
  ];

  console.log("data", appointmentData);
  const rows = (appointmentData ?? []).map((row: any, index = 1) => ({
    id: index++,
    Aid: row.id,
    patientId: row.PatientId,
    patientName: row.Patient?.name,
    tracking_no: row.Patient?.tracking_no,
    status: row.status,
  }));

  // handle the edit Item
  async function handleClickEdit(id: number) {
    // set the selected row data
    setSelectedRowData({ ...appointmentData[id] });
    setOpen(true);
  }

  // handle the delete button click
  async function handleClickDeleteIcon(id: number) {
    const appoinmentId = appointmentData[id].id;
    await confirm({
      description: "Are you sure you want to delete this appointment?",
    });
    const res = await axios.delete(
      `/api/prss/delete-appointments/${appoinmentId}`
    );
    if (res.data.msg) {
      enqueueSnackbar(res.data.msg, { variant: "success" });
    }
  }

  // handle the edit close
  const handleEditClose = () => {
    setOpen(false);
    setSelectedRowData({
      id: 0,
      PatientId: 0,
      status: "",
      Patient: { name: "", tracking_no: "" },
    });
  };

  // handle form submission
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // getting the confirmation
    await confirm({
      description: "Are you sure you want to edit this appointment?",
    });

    try {
      await axios.put(
        `/api/prss/update-appointments/${selectedRowData.id}`,
        selectedRowData
      );
      enqueueSnackbar("Patient Updated Successfully", { variant: "success" });

      const appointment = appointmentData.find(
        (i: any) => i.id === selectedRowData.id
      );

      if (appointment) {
        appointment.status = selectedRowData.status;
      }

      setAppointmentData([...appointmentData]);

      // Reset the form after successful submission
      setSelectedRowData({
        id: 0,
        PatientId: 0,
        status: "",
        Patient: { name: "", tracking_no: "" },
      });
      setOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <DataGrid
        sx={{
          marginTop: 2,
          minHeight: 596,
        }}
        rows={rows}
        columns={columns}
        pagination
        getRowId={(row) => row.id}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10, page: 0 } },
          columns: {
            columnVisibilityModel: {
              Aid: false,
            },
          },
        }}
      />
      <React.Fragment>
        <BootstrapDialog
          onClose={handleEditClose}
          aria-labelledby='customized-dialog-title'
          open={open}
        >
          <DialogTitle
            sx={{ m: 0, p: 2, width: 500 }}
            id='customized-dialog-title'
          >
            Edit Appointment's Details
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
            <GridCloseIcon />
          </IconButton>
          <DialogContent
            sx={{
              justifyContent: "left",
              display: "flex",
              gap: 1,
            }}
          >
            <form>
              <Card sx={{ minWidth: 275, width: 500, boxShadow: 2 }}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    "& .MuiTextField-root": { width: "auto" },
                  }}
                >
                  <TextField
                    fullWidth
                    id='id'
                    label='Appointment No'
                    variant='standard'
                    margin='normal'
                    value={selectedRowData.id}
                  />
                  <TextField
                    fullWidth
                    id='PatientId'
                    label='Patient No'
                    variant='standard'
                    margin='normal'
                    value={selectedRowData.PatientId}
                  />
                  <TextField
                    fullWidth
                    id='status'
                    label='Status'
                    variant='standard'
                    margin='normal'
                    value={selectedRowData.status}
                    onChange={(e) => {
                      setSelectedRowData({
                        ...selectedRowData,
                        status: e.target.value,
                      });
                    }}
                  />
                  <TextField
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                    id='patientName'
                    label='Patient Name'
                    variant='standard'
                    margin='normal'
                    value={selectedRowData.Patient?.name}
                  />
                  <TextField
                    fullWidth
                    InputProps={{
                      readOnly: true,
                    }}
                    id='tracking_no'
                    label='Tracking No'
                    variant='standard'
                    margin='normal'
                    value={selectedRowData.Patient?.tracking_no}
                  />
                  <Stack spacing={2} direction='row' alignSelf={"center"}>
                    <Button
                      onClick={submitHandler}
                      variant='contained'
                      endIcon={<SendIcon />}
                    >
                      Submit
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </form>
          </DialogContent>
        </BootstrapDialog>
      </React.Fragment>
    </div>
  );
}

export default AppointmentTable;
