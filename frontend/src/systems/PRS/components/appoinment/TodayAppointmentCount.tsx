import { Box, Typography } from "@mui/material";
import React from "react";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { useEffect, useState } from "react";
import axios from "axios";

function TodayAppointmentCount() {
  // state of the total number of patients
  const [totalAppointments, setTotalAppointments] = useState<number | null>(0);

  //get the count
  const getTotalAppoiments = async () => {
    try {
      const response = await axios
        .get("/api/prss/today-appointments")
        .then((response) => {
          setTotalAppointments(response.data.allAppointments);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTotalAppoiments();
  }, [totalAppointments]);

  return (
    <div>
      <Box
        alignItems='center'
        display='flex'
        flexDirection='column'
        pt={1}
        gap={2}
        pb={1}
      >
        <PeopleAltIcon fontSize='large' />
        <Typography variant='h4' component='div'>
          <Box
            height={100}
            width={100}
            display='flex'
            flexDirection={"column"}
            justifyContent='center'
            alignItems='center'
            gap={4}
            p={0}
            fontWeight='semibold'
            sx={{
              //   border: "2px solid grey",
              borderRadius: "50%",
              bgcolor: "rgba(0, 58, 43, 0.8)",
            }}
          >
            <Typography variant='h3' component='div' sx={{ color: "#ffffff" }}>
              {totalAppointments && totalAppointments ? totalAppointments : "0"}
            </Typography>
          </Box>
        </Typography>
        <Typography variant='h5' component='div'>
          Today Appointment Count
        </Typography>
      </Box>
    </div>
  );
}

export default TodayAppointmentCount;
