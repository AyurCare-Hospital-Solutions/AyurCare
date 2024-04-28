import { Link } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { Button, Box } from "@mui/material";

const BackButton = ({ destination = "/pms/dashboard" }) => {
  return (
    <div>
      <Link to={destination}>
        <Box borderRadius={5} sx={{ mb: 3, width: 2, mr: 10 }} display="inline-block">
          <Button startIcon={<ArrowBack />} variant="contained"></Button>
        </Box>
      </Link>
    </div>
  );
};

export default BackButton;
