import { Typography, TextField, Box, Stack, Button } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

// patient interface
interface Patient {
  name: string;
  nic: string;
  phone: string;
  dob: string | null | undefined;
  gender: string;
  email: string;
  address: string;
}

export default function PatientRegForm() {
  // track the patient details
  const [patient, setPatient] = useState<Patient>({
    name: "",
    nic: "",
    phone: "",
    dob: "",
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
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    // Ensure a date is selected before formatting
    if (!value) {
      console.error("Please select a date of birth.");
      return; // Prevent further processing if no date is selected
    }

    // making the date format before passing to the backend
    const formattedDate = value?.toISOString();

    setPatient((prevPatient) => {
      const { name, nic, phone, gender, email, address } = prevPatient;
      return {
        name,
        nic,
        phone,
        gender,
        email,
        address,
        dob: formattedDate,
      };
    });

    console.log(patient);
  };

  // handle date change
  const [value, setValue] = React.useState<Dayjs | null>(dayjs(null));

  return (
    <div>
      <form>
        <Typography mb={3} variant='h5'>
          Add Patient Details
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
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker", "DatePicker"]}>
              <DatePicker
                label='Date Of Birth'
                value={value}
                onChange={(newValue) => setValue(newValue)}
              />
              {value && <p>Selected Date: {value.format("YYYY-MM-DD")}</p>}
            </DemoContainer>
          </LocalizationProvider>

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
