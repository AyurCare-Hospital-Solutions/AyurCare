import BackButton from "../Components/Common/BackButton";
import Typography from "@mui/material/Typography/Typography";
import { Box } from "@mui/material";

const InventeryRequest = () => {
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
          Inventory Management
        </Typography>
      </Box>
    </div>
  );
};

export default InventeryRequest;
