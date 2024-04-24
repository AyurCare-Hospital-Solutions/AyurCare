import Paper from "@mui/material/Paper";
import ShowTime from "../Common/ShowTime";
import { Grid } from "@mui/material";

const Header = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Grid direction="column" spacing={2} alignItems="center">
        <Grid item xs={12} style={{ textAlign: "end" }}>
          <ShowTime />
        </Grid>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              color: "#000",
              backgroundColor: "#D9D9D9",
              fontSize: 30,
              textAlign: "center",
            }}
            style={{
              width: "1000px",
              fontFamily: "poppins",
              margin: "auto", // Center horizontally
            }}
          >
            Welcome to Pharmacy Dashboard!
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Header;
