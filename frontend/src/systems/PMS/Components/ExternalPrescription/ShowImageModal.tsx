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
          <Button
            href={`${baseURL}${image}`} // Construct the download link
            download // Enable the download attribute
            variant="contained" // Use the contained button style
            color="error" // Use the theme's error color which is often red
            sx={{
              color: "white", // Ensure text color is white for better contrast
              "&:hover": {
                backgroundColor: "darkred", // Darker red on hover for better UX
              },
            }}
          >
            Download
          </Button>

          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
