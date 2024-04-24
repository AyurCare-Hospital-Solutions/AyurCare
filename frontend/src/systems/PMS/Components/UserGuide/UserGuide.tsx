import { Box, Typography } from "@mui/material";
import BackButton from "../Common/BackButton";

const UserGuide = () => {
  return (
    <>
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
          User Guide
        </Typography>
      </Box>
    </>
  );
};

export default UserGuide;
