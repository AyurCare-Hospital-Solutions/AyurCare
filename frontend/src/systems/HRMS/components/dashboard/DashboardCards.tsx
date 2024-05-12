import { ArrowCircleRightOutlined } from "@mui/icons-material";
import { Paper, Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { useState, useEffect } from "react";
import AdvancedFormat from "dayjs/plugin/advancedFormat";
import { Link } from "react-router-dom";

dayjs.extend(AdvancedFormat);

const cardStyle = { display: "flex", px: "16px", py: "12px" };

export const LinkCard = ({
  name,
  desc,
  link,
}: {
  name: string;
  desc: string;
  link: string;
}) => {
  return (
    <Link to={link} style={{ textDecoration: "none", overflow: "hidden" }}>
      <Paper
        elevation={3}
        sx={{
          ...cardStyle,
          mt: 2,
          height: "94px",
          mr: "auto",
          minWidth: "80%",
        }}
      >
        <Box sx={{ my: "auto" }}>
          <Typography sx={{ fontSize: "1.75rem", fontWeight: 500 }}>
            {name}
          </Typography>
          <Typography sx={{ fontWeight: 500 }}>{desc}</Typography>
        </Box>
        <Box sx={{ ml: "auto", my: "auto" }}>
          <ArrowCircleRightOutlined fontSize="large" />
        </Box>
      </Paper>
    </Link>
  );
};

export const DateCard = () => {
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
        minHeight: "140px",
        mb: 4,
        backgroundColor: "#d9d9d9",
      }}
    >
      <Box sx={{ my: "auto" }}>
        <Typography sx={{ fontWeight: 400 }}>Today is</Typography>
        <Typography sx={{ fontSize: "1.75rem", fontWeight: 500 }}>
          {dayjs(time).format("Do MMMM YYYY HH:mm:ss")}
        </Typography>
      </Box>
    </Paper>
  );
};

export const WelcomeCard = ({ img }: { img: string }) => {
  return (
    <Paper
      elevation={3}
      sx={{
        ...cardStyle,
        backgroundColor: "#cde1b4",
        mb: 4,
        minHeight: "140px",
        overflowX: "hidden",
      }}
    >
      <Box sx={{ my: "auto" }}>
        <Typography
          sx={{ color: "#003a2b", fontWeight: 600, fontSize: "1.8rem" }}
        >
          Welcome Back!
        </Typography>
        <Typography sx={{ color: "#003a2b", fontSize: "1.1rem" }}>
          Have a Nice Day!
        </Typography>
      </Box>
      <Box flexGrow="1"></Box>
      <img style={{ alignSelf: "end" }} src={img}></img>
    </Paper>
  );
};
