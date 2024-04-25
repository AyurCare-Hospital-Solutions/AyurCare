import { Grid, Paper, Typography } from "@mui/material";
import { Gauge } from "@mui/x-charts/Gauge";

const SingleComponet = () => {
  return (
    <div>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        sx={{
          my: "20px",
          mb: "40px",
          textAlign: "center",
          height: "30vh",
        }}
      >
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%", // This makes sure the item takes full height of the container
          }}
        >
          <Paper
            elevation={24}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: "40px",
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
              Internal Prescription <br /> Summary
            </Typography>
            <Gauge
              value={79}
              width={130}
              height={130}
              text={({ value, valueMax }) => `${value} / ${valueMax}`}
            />
          </Paper>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "300px", // This makes sure the item takes full height of the container
          }}
        >
          <Paper
            elevation={24}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: "40px",
              height: "300px",
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
              Customer Support
            </Typography>
            <Gauge
              value={79}
              width={130}
              height={130}
              text={({ value, valueMax }) => `${value} / ${valueMax}`}
            />
          </Paper>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%", // This makes sure the item takes full height of the container
          }}
        >
          <Paper
            elevation={24}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              p: "40px",
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
              External Prescription <br /> Summary
            </Typography>
            <Gauge
              value={79}
              width={130}
              height={130}
              text={({ value, valueMax }) => `${value} / ${valueMax}`}
            />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default SingleComponet;
