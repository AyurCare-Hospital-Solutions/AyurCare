import { Box, Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Gauge, gaugeClasses } from "@mui/x-charts/Gauge";
import axios from "axios";
import { useEffect, useState } from "react";
import { green } from "@mui/material/colors";

const settings = {
  width: 200,
  height: 200,
};

function PendingAppointment() {
  // today all appointments count
  const [appoinments, setAppointments] = useState(0);

  // today pending appointments count
  const [PendingAppointment, setPendingAppointment] = useState(0);

  // get the pending appointments
  async function getPendingAppointments() {
    // get the pending appointments
    await axios.get("/api/prss/today-appointments").then((response) => {
      setAppointments(response.data.allAppointments);
      setPendingAppointment(response.data.pendingAppointmentCount);
    });
  }

  useEffect(() => {
    getPendingAppointments();
  }, []);

  // console logs
  console.log(appoinments);
  console.log(PendingAppointment);

  return (
    <div>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Gauge
          {...settings}
          value={PendingAppointment}
          valueMax={appoinments}
          startAngle={-120}
          endAngle={120}
          cornerRadius='50%'
          sx={(theme) => ({
            [`& .${gaugeClasses.valueText}`]: {
              fontSize: 30,
              fontFamily: theme.typography.fontFamily,
              transform: "translate(0px, 0px)",
            },
            [`& .${gaugeClasses.valueArc}`]: {
              fill: "#52b202",
            },
            [`& .${gaugeClasses.referenceArc}`]: {
              fill: theme.palette.text.disabled,
            },
          })}
          text={({ value, valueMax }) => `${value} / ${valueMax}`}
        />
      </Box>
      {PendingAppointment && appoinments ? (
        <Typography
          variant='h5'
          component='div'
          mb={3}
          sx={{ textAlign: "center" }}
        >
          Today Pending Appointments
        </Typography>
      ) : (
        <Typography
          variant='h5'
          component='div'
          mb={3}
          sx={{ textAlign: "center" }}
        >
          No pending Appointments
        </Typography>
      )}
      {PendingAppointment && appoinments ? (
        <Typography
          variant='h6'
          component='div'
          mb={3}
          sx={{ textAlign: "center" }}
        >
          <VerifiedIcon fontSize='medium' sx={{ color: green[800] }} />{" "}
          {`Some Appointments Completed. Let's continue providing top-notch service!`}
        </Typography>
      ) : (
        <Typography
          variant='h6'
          component='div'
          mb={3}
          sx={{ textAlign: "center" }}
        >
          {`Great Job! You've completed ${appoinments} appointments today. Keep up the
          excellent patient care!`}
        </Typography>
      )}
    </div>
  );
}

export default PendingAppointment;
