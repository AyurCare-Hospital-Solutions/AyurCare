import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import ImageIcon from "@mui/icons-material/Image";
import { Box, Typography } from "@mui/material";

// "http://localhost:5000/api/pms/getExternalPrescriptionImage/filename

const baseURL =
  import.meta.env.VITE_BACKEND_URL + "api/pms/getExternalPrescriptionImage/";

export default function MedicineDialog({
  open,
  handleClose,
  image,
}: {
  open: boolean;
  handleClose: () => any;
  image: string;
}) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleClose();
          },
        }}
      >
        {/* add title here */}
        <Box sx={{ display: "flex", m: "15px", alignItems: "center" }}>
          <ImageIcon fontSize="large" />
          <Typography>Prescription Viewer </Typography>
        </Box>

        <img src={baseURL + image} alt="" />
        <DialogActions>
          <a href={baseURL + image} download>
            Download
          </a>

          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
