import { Typography, TextField, Box, Stack, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

// patient interface
interface Patient {
  id?: number;
  name: string;
  nic: string;
  phone: string;
  gender: string;
  email: string;
  address: string;
  dob?: string;
}

export default function PatientRegForm({
  patientDetails,
}: {
  patientDetails?: Patient;
}) {
  // useNavigate hook
  const navigate = useNavigate();

  // track the patient details
  const [patient, setPatient] = useState<Patient>({
    name: "",
    nic: "",
    phone: "",
    gender: "",
    email: "",
    address: "",
  });

  // handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatient({
      ...patient,
      [e.target.id]: e.target.value,
    });
  };

  // handle form submission
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure a date is selected before formatting
    if (!dobValue) {
      console.error("Please select a date of birth.");
      return; // Prevent further processing if no date is selected
    }

    // making the date format before passing to the backend
    const formattedDate = dobValue?.toISOString();

    // set the formatted date to the patient object
    const patientData = {
      ...patient,
      dob: formattedDate,
    };

    try {
      // validate the form
      validate(patientData);

      if (patientDetails) {
        await axios.put(
          `/api/prss/update-patient/${patientDetails.id}`,
          patientData
        );
        enqueueSnackbar("Patient Updated Successfully", { variant: "success" });
      } else {
        await axios.post("/api/prss/create-patient", patientData);
        enqueueSnackbar("Data Successfully Added", { variant: "success" });
      }
      // Reset the form after successful submission
      setPatient({
        name: "",
        nic: "",
        phone: "",
        gender: "",
        email: "",
        address: "",
      });
      setadobValue(dayjs(null)); // Reset the date picker value

      // Refresh the page after submitting the form
      refreshPage();
    } catch (error) {
      console.error(error);
    }
  };

  // create function to refresh the page
  const refreshPage = () => {
    navigate(0);
  };

  // handle date change
  const [dobValue, setadobValue] = React.useState<Dayjs | null>(dayjs(null));

  // get the current date
  const [time, setTime] = useState(new Date());

  // get next tracking no
  const [nextTrackingNo, setNextTrackingNo] = useState<String>();

  const getNxtTrackingNo = async () => {
    const res = await axios.get("/api/prss/next-trackingNo");
    setNextTrackingNo(res.data);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // useEffect fot the fetcht the patient detials
  useEffect(() => {
    if (patientDetails) {
      setPatient({ ...patientDetails });
      setadobValue(dayjs(patientDetails.dob));
    }
  }, [patientDetails]);

  useEffect(() => {
    if (!nextTrackingNo) {
      getNxtTrackingNo();
    }
  }, [nextTrackingNo]);

  // get the error message
  const [errorMessage, setErrorMessage] = useState({});

  // validate function
  const validate = (patient: Patient) => {
    if (
      !patient.name ||
      !patient.nic ||
      !patient.phone ||
      !patient.dob ||
      !patient.gender ||
      !patient.email ||
      !patient.address
    ) {
      throw new Error("All fields are required");
    }

    if (patient.phone.length !== 10) {
      enqueueSnackbar("Phone number should be 10 digits", { variant: "error" });
      throw new Error("Phone number should be 10 digits");
    }

    if (patient.nic.search(/^(\d{12}|\d{9}[vx])$/gm) === -1) {
      enqueueSnackbar("Invalid NIC", { variant: "error" });
      throw new Error("Invalid NIC");
    }

    if (patient.email.search(/\S+@\S+\.\S+/) === -1) {
      enqueueSnackbar("Invalid email", { variant: "error" });
      throw new Error("Invalid email");
    }
  };

  return (
    <div>
      <form>
        <Typography mb={3} variant='h5'>
          Add Patient Details
        </Typography>
        <Typography mb={3} variant='h6'>
          Next tracking No:{" "}
          {nextTrackingNo && nextTrackingNo ? nextTrackingNo : "Loading..."}
        </Typography>
        <Box
          mb={2}
          sx={{
            display: "flex",
            flexDirection: "column",
            "& .MuiTextField-root": { width: "auto" },
          }}
        >
          <TextField
            fullWidth
            id='name'
            label='Name'
            variant='standard'
            margin='normal'
            value={patient.name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            id='nic'
            label='NIC'
            variant='standard'
            margin='normal'
            value={patient.nic}
            onChange={handleInputChange}
          />

          <TextField
            fullWidth
            id='phone'
            label='Phone-No'
            variant='standard'
            margin='normal'
            value={patient.phone}
            onChange={handleInputChange}
          />

          <Box display='flex' justifyContent='space-between' pt={2}>
            <DatePicker
              label='Date Of Birth'
              value={dobValue}
              onChange={(newValue) => setadobValue(newValue)}
              sx={{ width: "50px" }}
            />
            {dobValue && dobValue ? (
              <p>Selected Date: {dobValue.format("YYYY-MM-DD")}</p>
            ) : (
              <p>Today Date: {dayjs(time).format("Do MMMM YYYY")}</p>
            )}
          </Box>

          <TextField
            fullWidth
            id='gender'
            label='Gender'
            variant='standard'
            margin='normal'
            value={patient.gender}
            onChange={handleInputChange}
          />

          <TextField
            fullWidth
            id='email'
            label='Email'
            variant='standard'
            margin='normal'
            value={patient.email}
            onChange={handleInputChange}
          />

          <TextField
            fullWidth
            id='address'
            label='Address'
            variant='standard'
            margin='normal'
            value={patient.address}
            onChange={handleInputChange}
          />

          <Stack spacing={2} direction='row' alignSelf={"center"}>
            <Button
              onClick={submitHandler}
              variant='contained'
              endIcon={<SendIcon />}
            >
              Submit
            </Button>
          </Stack>
        </Box>
      </form>
    </div>
  );
}
