import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import BackButton from "../Components/Common/BackButton";
import MedicineSummary from "../Components/Report/SummarySections/MedicineSummary";
import InventorySummary from "../Components/Report/SummarySections/InventorySummary";
import UserConcernsSummary from "../Components/Report/SummarySections/UserConcernsSummary";
import PrescriptionSummary from "../Components/Report/SummarySections/InternalPrescriptionSummary";
import ExternalPrescriptionSummary from "../Components/Report/SummarySections/ExternalPrescriptionSummary";
import SingleComponet from "../Components/Report/SummarySections/SingleComponet";

const style = {
  py: 0,
  width: "100%",
  maxWidth: 360,
  borderRadius: 2,
  border: "1px solid",
  borderColor: "divider",
  backgroundColor: "background.paper",
};

const Report = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          mb: "20px",
        }}
      >
        <BackButton />
        <Typography sx={{ mb: 3, flexGrow: 1 }} variant="h5">
          Operations Report
        </Typography>
        <Button
          sx={{
            backgroundColor: "#0d4838",
            "&:hover": {
              backgroundColor: "#0c6c52", // Background color on hover
            },
            p: "6px",
            hover: "#287762",
          }}
        >
          <Typography
            sx={{
              p: "4px",
              fontSize: "14px",
              color: "white",
              textSizeAdjust: "none",
            }}
          >
            Generate Report
          </Typography>
        </Button>
      </Box>

      <Grid container spacing={7}>
        {/* Customer Support */}
        <Grid item xs={12}>
          <SingleComponet />
        </Grid>

        {/* Prescription Management */}
        <Grid item xs={6}>
          <PrescriptionSummary />
        </Grid>
        {/* External Prescription Management */}
        <Grid item xs={6}>
          <ExternalPrescriptionSummary />
        </Grid>
        {/* MEDICINE summary */}
        <Grid item xs={12}>
          <MedicineSummary />
        </Grid>
        {/* Inventory summary */}
        <Grid item xs={12}>
          <InventorySummary />
        </Grid>
      </Grid>
    </div>
  );
};

export default Report;
