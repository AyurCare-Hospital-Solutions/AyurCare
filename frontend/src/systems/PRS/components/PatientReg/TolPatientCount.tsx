import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import axios from "axios";

export default function tolPatientCount() {
  // get the total number of patients from the database
  // state of the total number of patients
  const [totalPatients, setTotalPatients] = useState<number | null>(0);

  //get the count
  const getTotalPatients = async () => {
    try {
      const response = await axios.get(`/api/prss/tolCount-patient`);
      setTotalPatients(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTotalPatients();
  }, []);

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
              {totalPatients && totalPatients ? totalPatients : "0"}
            </Typography>
          </Box>
        </Typography>
        <Typography variant='h5' component='div'>
          Today Patient Count
        </Typography>
      </Box>
    </div>
  );
}
