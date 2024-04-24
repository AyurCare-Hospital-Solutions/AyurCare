import { Box, Button, Grid } from "@mui/material";

const DashboardFooter = () => {
  return (
    <Box>
      <Grid
        container
        spacing={12}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Button
            sx={{
              display: "flex",
              px: 1.3,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            Medicines
          </Button>
        </Grid>

        <Grid item>
          <Button
            sx={{
              display: "flex",
              px: 2,
              py: 3,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            Medicines
          </Button>
        </Grid>

        <Grid item>
          <Button
            sx={{
              display: "flex",
              px: 1.3,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            Medicines
          </Button>
        </Grid>

        <Grid item>
          <Button
            sx={{
              display: "flex",
              px: 1.3,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            Medicines
          </Button>
        </Grid>

        <Grid item>
          <Button
            sx={{
              display: "flex",
              px: 1.3,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#D9D9D9",
            }}
          >
            Medicines
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardFooter;
