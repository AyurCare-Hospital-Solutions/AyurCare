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
const InternalPrescriptionSummary = () => {
  return (
    <div>
      <Paper elevation={24} sx={{ p: 5 }}>
        <Typography
          variant="h5"
          sx={{ textAlign: "center", mb: 3, fontWeight: "bold" }}
        >
          Internal Prescription Summary
        </Typography>

        <PrescriptionPieChart />
        <List sx={style}>
          <ListItem>
            <ListItemText primary="Approved prescriptions: " />
          </ListItem>
          <Divider component="li" />
          <ListItem>
            <ListItemText primary="Rejected prescriptions: " />
          </ListItem>
          <Divider variant="inset" component="li" />
        </List>
      </Paper>
    </div>
  );
};

export default  InternalPrescriptionSummary;
