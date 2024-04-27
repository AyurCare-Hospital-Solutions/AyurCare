import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from '@mui/material';

interface PreviewStaffProps {
  name: string;
  speciality: string;
  phoneNumber: string;
  dateHired: string;
  homePhone: string;
  email: string;
  qualification: string;
}

const PreviewStaff: React.FC<PreviewStaffProps> = ({
  name,
  speciality,
  phoneNumber,
  dateHired,
  homePhone,
  email,
  qualification,
}) => {
  return (
    <div>
      <Typography variant="h6" gutterBottom>
        Name: {name}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Speciality: {speciality}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Phone Number: {phoneNumber}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Date Hired: {dateHired}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Home Phone: {homePhone}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Email: {email}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Qualification: {qualification}
      </Typography>
    </div>
  );
};

export default PreviewStaff;
