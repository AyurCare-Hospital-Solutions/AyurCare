import { Grid, Paper, Typography } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'; // Doctor icon
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'; // Nurse icon
import PersonIcon from '@mui/icons-material/Person'; // Attendant icon
import AccountCircleIcon from '@mui/icons-material/AccountCircle'; // Management icon
import GroupIcon from '@mui/icons-material/Group'; // Minior Staff icon

const Dashboard = () => {
  // Example counts for each category (replace with actual data)
  const counts = {
    doctors: 10,
    nurses: 15,
    attendants: 8,
    management: 5,
    miniorStaff: 20,
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h5" gutterBottom >Employee Categories</Typography>
      <Grid container spacing={3}>
        {/* Doctor category */}
        <Grid item xs={6} sm={4} md={3}>
          <Paper style={{ padding: '40px', textAlign: 'center' }}>
            <LocalHospitalIcon style={{ fontSize: '90px', marginBottom: '10px', color :'#fab005' }} /> {/* Doctor icon */}
            <Typography variant="h5" >Doctors</Typography>
            <Typography variant="subtitle1" style={{ fontWeight: 'bold',fontSize:'25px' }}>{counts.doctors}</Typography>
          </Paper>
        </Grid>
        
        {/* Nurse category */}
        <Grid item xs={6} sm={4} md={3}>
          <Paper style={{ padding: '40px', textAlign: 'center' }}>
            <MedicalServicesIcon style={{ fontSize: '90px', marginBottom: '10px' , color :'#fab005' }} /> {/* Nurse icon */}
            <Typography variant="h6">Nurses</Typography>
            <Typography variant="subtitle1" style={{fontWeight: 'bold' ,fontSize:'25px'}}>{counts.nurses}</Typography>
          </Paper>
        </Grid>

        {/* Attendant category */}
        <Grid item xs={6} sm={4} md={3}>
          <Paper style={{ padding: '40px', textAlign: 'center' }}>
            <PersonIcon style={{ fontSize: '90px', marginBottom: '10px' , color :'#fab005' }} /> {/* Attendant icon */}
            <Typography variant="h6">Attendants</Typography>
            <Typography variant="subtitle1" style={{fontWeight: 'bold',fontSize: '25px'}}>{counts.attendants}</Typography>
          </Paper>
        </Grid>

        {/* Management category */}
        <Grid item xs={6} sm={4} md={3}>
          <Paper style={{ padding: '40px', textAlign: 'center' }}>
            <AccountCircleIcon style={{ fontSize: '90px', marginBottom: '10px' , color :'#fab005' }} /> {/* Management icon */}
            <Typography variant="h6">Management</Typography>
            <Typography variant="subtitle1" style={{fontWeight: 'bold',fontSize: '25px'}}>{counts.management}</Typography>
          </Paper>
        </Grid>

        {/* Minior Staff category */}
        <Grid item xs={6} sm={4} md={3}>
          <Paper style={{ padding: '40px', textAlign: 'center' }}>
            <GroupIcon style={{ fontSize: '90px', marginBottom: '10px' , color :'#fab005' }} /> {/* Minior Staff icon */}
            <Typography variant="h6">Minior Staff</Typography>
            <Typography variant="subtitle1" style={{fontWeight: 'bold', fontSize: '25px' }}>{counts.miniorStaff}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  ); 
};

export default Dashboard;
