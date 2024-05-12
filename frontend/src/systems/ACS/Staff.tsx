import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { Link, useNavigate } from "react-router-dom";
import FormDialog from "./AddStaff";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import axios from "axios";

interface Row {
  id: number;
  name: string;
  speciality: string;
  phoneNumber: string;
  dateHired: string;
  homePhone: string;
  email: string;
  qualification: string;
}

const Staff = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Row[]>([]);
  const [_selectedRow, setSelectedRow] = useState<number | null>(null);
  // ([
  //   { id: 1, name: 'Nevil Perera', speciality: 'Doctor', phoneNumber: '0712345678', homePhone: '0112345678', email: 'samantha.perera@example.com', qualification: 'Bachelor of Ayurveda Medicine and Surgery (BAMS)', dateHired: '2022-01-15' },
  //   { id: 2, name: 'Kamal Silva', speciality: 'Management', phoneNumber: '0773456789', homePhone: '0113456789', email: 'kamal.silva@example.com', qualification: 'MBA in Hospital Management', dateHired: '2022-03-20' },
  //   // Add more sample data as needed
  // ]);

  const handlePreview = (id: number) => {
    setSelectedRow(id);
    navigate(`/previewStaff/${id}`); // Redirect to PreviewStaff component with the selected row ID
  };

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setSelectedMemberId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    // Logic for deleting the member with selectedMemberId
    setRows(rows.filter((row) => row.id !== selectedMemberId));
    deleteStaff(selectedMemberId);
    setDeleteDialogOpen(false);
  };

  const closeDeleteDialog = () => {
    setSelectedMemberId(null);
    setDeleteDialogOpen(false);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 40 },
    { field: "name", headerName: "Name", width: 180 },
    { field: "speciality", headerName: "Speciality", width: 110 },
    { field: "phoneNumber", headerName: "Phone Number", width: 130 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "qualification", headerName: "Qualifications", width: 250 },

    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => (
        <>
          {/* <IconButton onClick={() => {
            handlePreview(params.row.id);
            setRows(params.row.id);
          }} >
            <InfoIcon />
          </IconButton> */}

          <Link
            to={`../editStaff/${params.row.id}`}
            style={{ textDecoration: "none" }}
          >
            <IconButton>
              <EditIcon />
            </IconButton>
          </Link>

          <IconButton onClick={() => handleDelete(params.row.id)}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  useEffect(() => {
    getStaff();
  }, []);

  // add staff member
  const addStaff = (data: any) => {
    axios
      .post("api/acs/staff", data)
      .then((res) => {
        console.log(res.data);
        getStaff();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // get staff members details
  const getStaff = async () => {
    await axios.get("api/acs/staff").then((res) => {
      formatData(res.data);
    });
  };

  // format data for display
  const formatData = (data: any) => {
    const stf = data.map((row: any) => {
      return {
        id: row.id,
        name: row.name,
        speciality: row.designation,
        phoneNumber: row.phone,
        homePhone: row.homePhone,
        email: row.email,
        qualification: row.qualification,
        dateHired: row.dateHired,
      };
    });
    setRows(stf);
  };

  // delete staff member
  const deleteStaff = (id: number | null) => {
    axios.delete(`api/acs/staff/${id}`).then((res) => {
      console.log(res.data);
    });
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            fontFamily: "Arial, sans-serif",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Staff Info
        </h2>
        {/* Render the FormDialog component */}
        <FormDialog addStaff={addStaff} />
      </div>
      <div style={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          pageSizeOptions={[10, 20]}
        />
      </div>
      {/* Delete confirmation dialog */}
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Delete Member</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this member?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={confirmDelete} color='error'>
            Delete
          </Button>
          <Button onClick={closeDeleteDialog} color='inherit'>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      {/* <Box>
        <ViewStaffDialog  
          row = {rows}
          open = {}
          handleClose={() => ()}
        />
      </Box> */}
    </div>
  );
};

export default Staff;
