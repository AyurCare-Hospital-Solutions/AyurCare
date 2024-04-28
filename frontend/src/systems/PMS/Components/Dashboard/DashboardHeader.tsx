import Paper from "@mui/material/Paper";
import ShowTime from "../Common/ShowTime";
import { Grid, Typography } from "@mui/material";

const Header = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Grid direction="column" spacing={2} alignItems="center">
        <Grid item xs={12} style={{ textAlign: "end" }}>
          <ShowTime />
        </Grid>
        <Grid item xs={12}>
          <Paper
            elevation={24}
            sx={{
              p: 2,
              fontSize: 30,
              textAlign: "center",
            }}
            style={{
              width: "1000px",

              margin: "auto", // Center horizontally
            }}
          >
            <Typography sx={{ fontWeight: "10px" }} variant="h5">
              Welcome to Pharmacy Dashboard!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
