import { Paper, Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import AdvancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(AdvancedFormat);

const cardStyle = { display: "flex", px: "16px", py: "12px" };
const imgStyle = { alignSelf: "end", height: "394px" };

export const WelcomeCard = ({ img }: { img: string }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        ...cardStyle,
        backgroundColor: "#cde1b4",
        mb: 4,
        minHeight: "140px",
      }}
    >
      <Box sx={{ my: "auto", mr: "130px" }}>
        <Typography
          sx={{ color: "#003a2b", fontWeight: 600, fontSize: "1.8rem" }}
        >
          Welcome Back!
        </Typography>
        <Typography sx={{ color: "#003a2b", fontSize: "1.1rem" }}>
          Have a Nice Day!
        </Typography>
        <Typography sx={{ fontWeight: 400 }}>Today is</Typography>
        <Typography sx={{ fontSize: "1.75rem", fontWeight: 500 }}>
          {dayjs(time).format("Do MMMM YYYY HH:mm:ss")}
        </Typography>
      </Box>
      <img style={imgStyle} src={img}></img>
    </Paper>
  );
};
