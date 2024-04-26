import { Grid, Paper, Typography } from "@mui/material";
import { Gauge } from "@mui/x-charts/Gauge";

const SingleComponet = ({ PrescriptionData }: { PrescriptionData: any }) => {
  return (
    <div>
      <Paper
        elevation={13}
        // style={{
        //   transform: "rotate(90deg)",
        //   transformOrigin: "center center",
        //   transition: "transform 0.3s ease-in-out",
        // }}
        sx={{
          p: 2,
          fontSize: 30,
          width: "80%",
          marginBottom: "40px",
          textAlign: "center",
          marginX: "auto",
          fontFamily: "Helvitica",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {PrescriptionData.name}
        </Typography>
      </Paper>

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
            elevation={13}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "60%",
              p: "40px",
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
              Pending
            </Typography>
            <Gauge
              value={Math.round(
                (PrescriptionData.pending / PrescriptionData.total) * 100
              )}
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
            elevation={13}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "60%",
              p: "40px",
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
              Approved
            </Typography>

            <Gauge
              value={Math.round(
                (PrescriptionData.approved / PrescriptionData.total) * 100
              )}
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
            elevation={13}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              width: "60%",
              p: "40px",
            }}
          >
            <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
              Rejected
            </Typography>
            <Gauge
              value={Math.round(
                (PrescriptionData.rejected / PrescriptionData.total) * 100
              )}
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
