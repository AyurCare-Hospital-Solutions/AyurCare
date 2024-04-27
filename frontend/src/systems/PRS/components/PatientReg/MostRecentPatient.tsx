import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { Box, Tooltip } from "@mui/material";
import QueueIcon from "@mui/icons-material/Queue";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
// import { Document, Page, Text } from "react-pdf";
import { usePDF } from "react-to-pdf";

interface recentPatientDetails {
  name: string;
  nic: string;
  phone: string;
  dob: string;
  gender: string;
  email: string;
  address: string;
  trackingNo: string;
}

export default function BasicCard() {
  // leran more state
  const [learnMore, setLearnMore] = useState<boolean>(false);

  // handle the lear more click function
  const handleLearnMore = () => {
    setLearnMore(true);
  };

  // patient details useState
  const [recentPatientDetails, setRecentPatientDetails] = useState<any>();

  // console log
  console.log(recentPatientDetails);
  // console.log(learnMore);

  async function getRecentPatient() {
    try {
      const response = await axios.get(`/api/prss/recent-patient`);
      setRecentPatientDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  // patient details
  useEffect(() => {
    getRecentPatient();
  }, []);

  async function handleAppointment() {
    try {
      // const make the patient to be added
      const res = await axios.post("/api/prss/create-appointment", {
        PatientId: recentPatientDetails.id,
      });
      if (res) {
        enqueueSnackbar("Patient added to the appointment list", {
          variant: "success",
        });
      }
    } catch (err) {
      console.log(err);
    }
  }

  // to pdf
  const { toPDF, targetRef } = usePDF({
    filename: "PatientTicket.pdf",
  });

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography variant='h5' component='div' marginBottom={2}>
          Most Recent Patient
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "row-reverse", gap: 1 }}>
          <Tooltip title='Download the patient ticket' arrow>
            <PictureAsPdfIcon
              fontSize='large'
              htmlColor='rgba(0, 58, 43, 0.8)'
              onClick={() => toPDF()}
            />
          </Tooltip>
          <Tooltip title='Add Patient to Appointment List' arrow>
            <QueueIcon
              fontSize='large'
              htmlColor='rgba(0, 58, 43, 0.8)'
              onClick={handleAppointment}
            />
          </Tooltip>
        </Box>
      </Box>
      <Card sx={{ minWidth: 275 }} ref={targetRef}>
        <CardContent>
          <Typography variant='h5' component='div'>
            {recentPatientDetails && recentPatientDetails
              ? recentPatientDetails.name
              : "No Patient details"}
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              {recentPatientDetails &&
              recentPatientDetails.gender.toLowerCase() === "male"
                ? "Mr."
                : "Mrs."}
            </Typography>
          </Typography>

          <Typography variant='body2'>
            Tracking No:{" "}
            {recentPatientDetails && recentPatientDetails.tracking_no}
            <br />
            NIC No: {recentPatientDetails && recentPatientDetails.nic}
          </Typography>
        </CardContent>
        <CardActions>
          {learnMore ? (
            <CardContent>
              <Typography variant='body2' component='div'>
                Date of Birth: {recentPatientDetails.dob}
              </Typography>
              <Typography variant='body2' component='div'>
                Gender: {recentPatientDetails.gender}
              </Typography>
              <Typography variant='body2' component='div'>
                Address: {recentPatientDetails.address}
              </Typography>
              <Typography variant='body2' component='div'>
                Phone: {recentPatientDetails.phone}
              </Typography>
              <Typography variant='body2' component='div'>
                OPD Appointment:{" "}
                {recentPatientDetails.OPDAppointmentId
                  ? recentPatientDetails.OPDAppointmentId
                  : "null"}
              </Typography>
            </CardContent> // Hide the button when learnMore is true
          ) : (
            <Button size='small' onClick={handleLearnMore}>
              Learn More
            </Button>
          )}
        </CardActions>
      </Card>
    </>
  );
}
