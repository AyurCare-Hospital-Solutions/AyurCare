import React, { useState, useEffect } from "react";
import { Typography } from "@mui/material";

const ShowTime = () => {
  const [dateTime, setDateTime] = useState(getCurrentDateTime());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDateTime(getCurrentDateTime());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  function getCurrentDateTime() {
    const now = new Date();
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dayOfWeek = days[now.getDay()];
    const dayOfMonth = now.getDate().toString().padStart(2, "0");
    const month = months[now.getMonth()];
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    return `${dayOfWeek} ${dayOfMonth} ${month} ${hours}:${minutes}:${seconds}`;
  }

  return (
    <Typography variant="h6" component="div">
      <span>{dateTime.slice(0, 17)}</span>
      <span style={{ color: "red" }}>{dateTime.slice(17)}</span>
    </Typography>
  );
};

export default ShowTime;
