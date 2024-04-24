import { Box, Typography } from "@mui/material";
import NoteTakingApp from "../Components/Keep/NoteTakingApp";
import BackButton from "../Components/Common/BackButton";

const Keep = () => {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <BackButton />
        <Typography sx={{ mb: 3, flexGrow: 1 }} variant="h5">
          Note Calender
        </Typography>
      </Box>

      {/* <Typography
        variant="subtitle1"
        sx={{ marginTop: "10px", fontSize: "15px", color: "grey" }}
      >
        Streamline your scheduling and notetaking in one convenient place with
        the 'Note Calendar,' your go-to for organized productivity.
      </Typography> */}

      <NoteTakingApp />
    </div>
  );
};

export default Keep;
