import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function tolPatientCount() {
  return (
    <div>
      <Box
        alignItems='center'
        display='flex'
        flexDirection='column'
        pt={3}
        gap={3}
        pb={3}
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
            fontWeight='semibold'
            sx={{
              //   border: "2px solid grey",
              borderRadius: "50%",
              bgcolor: "#0066CC",
            }}
          >
            <Typography variant='h3' component='div'>
              751
            </Typography>
          </Box>
        </Typography>
        <Typography variant='h6' component='div'>
          Total Patients
        </Typography>
      </Box>
    </div>
  );
}
