import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { Button, TextField } from '@mui/material';
import axios from 'axios';

interface Staff {
  id: number;
  name: string;
  address: string;
  designation: string;
  phone: string;
  homePhone: string;
  email: string;
  dateHired: string;
}

const EditStaff = () => {
  const { id } = useParams<{ id: string }>();
  const [staff, setStaff] = useState<Staff | null>(null);
  const [editedStaff, setEditedStaff] = useState<Staff>({
    id: Number(id),
    name: '',
    address: '',
    designation: '',
    phone:'',
    homePhone: '',
    email: '',
    dateHired: '',
  });

  // backward
  const navigate = useNavigate();

  const fetchStaffDetails = async () => {
    try {
      const response = await axios.get(`/api/acs/staff/${id}`);
      if (response.status === 200) {
        const staffData: Staff = response.data;
        console.log(staffData);
        setStaff(staffData);
        setEditedStaff(staffData);
      } else {
        console.error('Failed to fetch staff details');
      }
    } catch (error) {
      console.error('Error fetching staff details:', error);
    }
  };


  useEffect(() => {
    fetchStaffDetails();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedStaff(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/api/acs/staff/${id}`, editedStaff, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        console.log('Staff details updated successfully');
      } else {
        console.error('Failed to update staff details');
      }
    } catch (error) {
      console.error('Error updating staff details:', error);
    }
    navigate(-1);
  };

  if (!staff) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center',  height: '100vh' }}>
  <div>
    <h2 style={{ fontFamily: 'Arial, sans-serif', fontSize: '18px', fontWeight: 'bold' }}>Update Staff</h2>
    <form onSubmit={handleSubmit}>
      <TextField
        name="phone"
        label="Phone Number"
        value={editedStaff.phone}
        onChange={handleInputChange}
        fullWidth
      />
      <br/><br/>
      <TextField
        name="homePhone"
        label="Home Phone Number"
        value={editedStaff.homePhone}
        onChange={handleInputChange}
        fullWidth
      /><br/><br/>
      <TextField
        name="address"
        label="Address"
        type="text"
        value={editedStaff.address}
        onChange={handleInputChange}
        fullWidth
       
      /><br/><br/>
      <TextField
        name="email"
        label="Date Hired"
        type="email"
        value={editedStaff.email}
        onChange={handleInputChange}
        fullWidth
        
      /><br/><br/>
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </form>
  </div>
</div>

  );
};

export default EditStaff;
