import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import PatientTable from "./PatientTable";
import { BASE_URL } from "../../config";

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
      const response = await fetch(`${BASE_URL}/api/prss/recent-patient`);
      const patient = await response.json();
      console.log(patient);
      setRecentPatientDetails(patient);
    } catch (error) {
      console.log(error);
    }
  }

  // patient details
  useEffect(() => {
    getRecentPatient();
  }, []);

  return (
    <>
      <Typography variant='h5' component='div' marginBottom={2}>
        Most Recent Patient
      </Typography>
      <Card sx={{ minWidth: 275 }}>
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
