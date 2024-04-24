import React from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { enqueueSnackbar } from "notistack";
import ShowImageModal from "./ShowImageModal";

const ExternalPrescriptionTable = () => {
  const [externalPrescription, setExternalPrescription] = React.useState<any>(
    []
  );
  const [openImageModal, setOpenImageModal] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [deleteId, setDeleteId] = React.useState<number | null>(null);
  const [prescriptionImage, setPrescriptionImage] = React.useState("");

  const getExternalPrescription = async () => {
    await axios.get("/api/pms/getExternalPrescription").then((res: any) => {
      setExternalPrescription(res.data);
    });
  };

  React.useEffect(() => {
    getExternalPrescription();
  }, []);

  const handleClickOpen = (id: number) => {
    setOpen(true);
    setDeleteId(id);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id: number) => {
    await axios
      .delete(`/api/pms/deleteExternalPrescription/${id}`)
      .then(() => {
        enqueueSnackbar("Prescription deleted successfully!", {
          variant: "success",
        });
        getExternalPrescription(); // Refresh the list after deletion
      })
      .catch((err) => {
        console.error("Error deleting prescription", err);
        alert("Failed to delete prescription.");
      });
    setOpen(false); // Close the dialog after operation
  };

  //handle the show the image
  const handleClick = () => {
    setOpenImageModal(true);
  };

  // update external prescription status
  const updateExternalPrescriptionStatus = async (
    id: number,
    status: string
  ) => {
    await axios
      // this is the way to send the id with parameter and send the data inside the body
      .put(`/api/pms/updateExternalPrescriptionStatus/${id}`, { status })
      .then(() => {
        enqueueSnackbar(`Prescription status updated as ${status}!`, {
          variant: "success",
        });

        getExternalPrescription();
      })
      .catch((err) => {
        console.error("Error updating prescription status", err);
        alert("Failed to update prescription status.");
      });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Uploaded Date</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>File</TableCell>
              <TableCell>Update Status</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {externalPrescription ? (
              externalPrescription.map((row: any) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.phone}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    {new Date(Date.parse(row.createdAt)).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setOpenImageModal(true);
                        setPrescriptionImage(row.file);
                      }}
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
                      Show
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() =>
                        updateExternalPrescriptionStatus(row.id, "Approved")
                      }
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
                      onClick={() =>
                        updateExternalPrescriptionStatus(row.id, "Rejected")
                      }
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
                  <TableCell>
                    <Button onClick={() => handleClickOpen(row.id)}>
                      <DeleteIcon sx={{ color: "#0d4838" }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={9} style={{ textAlign: "center" }}>
                  Loading...
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this prescription?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => deleteId && handleDelete(deleteId)}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <ShowImageModal
        open={openImageModal}
        handleClose={() => {
          setOpenImageModal(false);
        }}
        image={prescriptionImage}
      />
    </>
  );
};

export default ExternalPrescriptionTable;
