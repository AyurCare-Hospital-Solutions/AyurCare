import {
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import PrescriptionPieChart from "../Charts/PrescriptionPieChart";

const style = {
  py: 0,
  width: "100%",
  maxWidth: 360,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};
const InternalPrescriptionSummary = ({
  PrescriptionData,
}: {
  PrescriptionData: any;
}) => {
  return (
    <div>
      <Paper elevation={24} sx={{ p: 5, mt: 7 }}>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}
        >
          Internal Prescription Summary
        </Typography>

        <PrescriptionPieChart PrescriptionData={PrescriptionData} />
        <List sx={style}>
          <ListItem>
            <ListItemText primary="Approved prescriptions: " />
            {PrescriptionData.approved}
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary="Rejected prescriptions: " />
            {PrescriptionData.rejected}
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </Paper>
    </div>
  );
};

export default InternalPrescriptionSummary;
