import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { ArrowForward } from "@mui/icons-material";
import StorageIcon from "@mui/icons-material/Storage";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import EventBusyIcon from "@mui/icons-material/EventBusy";

import { Grid, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Mousetrap from "mousetrap";
import { useEffect } from "react";

const data = [
  {
    color: "#0a4738",
    title: "Available Inventory",
  },
  {
    title: "Inventory Request",
  },
  {
    title: "Prescriptions",
  },
  {
    title: "Stock Shortage",
  },
  {
    title: "Expired Medicines",
  },
  {
    title: "Received Prescription",
  },
];

export default function ReportBox({
  medicinesCount,
  prescriptionsCount,
  externalPrescriptionsCount,
}: {
  medicinesCount: any;
  prescriptionsCount: any;
  externalPrescriptionsCount: any;
}) {
  const navigate = useNavigate();

  // assign keyboard shortcuts -----------------------------------------------------
  // 1. dashboard
  useEffect(() => {
    // Bind the 'm' key to navigate to the medicines page
    Mousetrap.bind("d", () => navigate("/pms/dashboard"));

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("d");
    };
  }, [navigate]);

  // 2. medicine
  useEffect(() => {
    // Bind the 'm' key to navigate to the medicines page
    Mousetrap.bind("m", () => navigate("/pms/medicines"));

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("m");
    };
  }, [navigate]);

  // 3. report
  useEffect(() => {
    // Bind the 'm' key to navigate to the medicines page
    Mousetrap.bind("r", () => navigate("/pms/reports"));

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("r");
    };
  }, [navigate]);

  // 4. customer concern
  useEffect(() => {
    // Bind the 'm' key to navigate to the medicines page
    Mousetrap.bind("c", () => navigate("/pms/userconcerns"));

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("c");
    };
  }, [navigate]);

  // 5. keep
  useEffect(() => {
    // Bind the 'm' key to navigate to the medicines page
    Mousetrap.bind("k", () => navigate("/pms/keep"));

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("k");
    };
  }, [navigate]);

  // 6. user guide
  useEffect(() => {
    Mousetrap.bind("u", () => navigate("/pms/userguide"));

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("u");
    };
  }, [navigate]);

  // 7. external prescription
  useEffect(() => {
    Mousetrap.bind("e", () => navigate("/pms/receivedprescription"));

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("e");
    };
  }, [navigate]);

  // 8. inernal prescription
  useEffect(() => {
    // Bind the 'm' key to navigate to the medicines page
    Mousetrap.bind("i", () => navigate("/pms/prescriptionmanagement"));

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("i");
    };
  }, [navigate]);

  return (
    <Box>
      <Grid
        container
        sx={{ mt: 3 }}
        spacing={4}
        justifyContent="center"
        alignItems="center"
      >
        {/* medicine Available */}
        <Grid item xs={3.5} sx={{ mb: 3 }}>
          <Paper
            elevation={24}
            sx={{
              textAlign: "center",
              border: "1px solid #0a4738",
            }}
          >
            <Card>
              <CardContent>
                <LocalHospitalIcon
                  sx={{ color: "#0a4738", fontSize: "50px" }}
                />
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.secondary"
                  gutterBottom
                >
                  13
                  {/* {medicinesCount} */}
                </Typography>
                <Typography> {data[0].title} </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 1,
                  maxHeight: 20,
                  backgroundColor: "#0a4738",
                }}
              >
                <Link to="/pms/medicines">
                  <Button sx={{ color: "#fff" }} size="small">
                    View Full List <ArrowForward sx={{ marginLeft: 0 }} />
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Paper>
        </Grid>

        {/* Inventory Request */}
        <Grid item xs={3.5} sx={{ mb: 3 }}>
          <Paper
            elevation={24}
            sx={{
              textAlign: "center",
              maxWidth: 280,
              border: "1px solid #0a4738",
            }}
          >
            <Card>
              <CardContent>
                <StorageIcon sx={{ color: "#000f93", fontSize: "50px" }} />
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.secondary"
                  gutterBottom
                >
                  ⤲
                </Typography>
                <Typography> {data[1].title} </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 1,
                  maxHeight: 20,
                  backgroundColor: "#0a4738",
                }}
              >
                <Link to="/pms/inventoryrequest">
                  <Button sx={{ color: "#fff" }} size="small">
                    View Full List <ArrowForward sx={{ marginLeft: 0 }} />
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Paper>
        </Grid>

        {/* Prescription Completed */}
        <Grid item xs={3.5} sx={{ mb: 3 }}>
          <Paper
            elevation={24}
            sx={{
              textAlign: "center",
              maxWidth: 280,
              border: "1px solid  #0a4738",
            }}
          >
            <Card>
              <CardContent>
                <DescriptionIcon sx={{ color: " #7a002d", fontSize: "50px" }} />
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {/* {prescriptionsCount} */}
                  23
                </Typography>
                <Typography> {data[2].title}</Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 1,
                  maxHeight: 20,
                  backgroundColor: " #0a4738",
                }}
              >
                <Link to="/pms/prescriptionmanagement">
                  <Button sx={{ color: "#fff" }} size="small">
                    View Full List <ArrowForward sx={{ marginLeft: 0 }} />
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Paper>
        </Grid>

        {/* Stock Shortage */}
        <Grid item xs={3.5} sx={{ mb: 3 }}>
          <Paper
            elevation={24}
            sx={{
              textAlign: "center",
              border: "1px solid #0a4738",
            }}
          >
            <Card>
              <CardContent>
                <ReportProblemIcon
                  sx={{ color: "#F44336", fontSize: "50px" }}
                />
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.secondary"
                  gutterBottom
                >
                  ⤲
                </Typography>
                <Typography>{data[3].title} </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 1,
                  maxHeight: 20,
                  backgroundColor: "#0a4738",
                }}
              >
                <Button sx={{ color: "#fff" }} size="small">
                  View Full List <ArrowForward sx={{ marginLeft: 0 }} />
                </Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>

        {/* Expired Products */}
        <Grid item xs={3.5} sx={{ mb: 3 }}>
          <Paper
            elevation={24}
            sx={{
              textAlign: "center",
              maxWidth: 280,
              border: "1px solid #0a4738",
            }}
          >
            <Card>
              <CardContent>
                <EventBusyIcon sx={{ color: "#9E9E9E", fontSize: "50px" }} />
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.secondary"
                  gutterBottom
                >
                  ⤲
                </Typography>
                <Typography> {data[4].title} </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 1,
                  maxHeight: 20,
                  backgroundColor: "#0a4738",
                }}
              >
                <Button sx={{ color: "#fff" }} size="small">
                  View Full List <ArrowForward sx={{ marginLeft: 0 }} />
                </Button>
              </CardActions>
            </Card>
          </Paper>
        </Grid>

        {/* Received Prescription */}
        <Grid item xs={3.5} sx={{ mb: 3 }}>
          <Paper
            elevation={24}
            sx={{
              textAlign: "center",
              maxWidth: 280,
              border: "1px solid #0a4738",
            }}
          >
            <Card>
              <CardContent>
                <AssignmentTurnedInIcon
                  sx={{ color: "purple", fontSize: "50px" }}
                />
                <Typography
                  sx={{ fontSize: 20 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {externalPrescriptionsCount}
                </Typography>
                <Typography> {data[5].title} </Typography>
              </CardContent>
              <CardActions
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  p: 1,
                  maxHeight: 20,
                  backgroundColor: "#0a4738",
                }}
              >
                <Link to="/pms/receivedprescription">
                  <Button sx={{ color: "#fff" }} size="small">
                    View Full List <ArrowForward sx={{ marginLeft: 0 }} />
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
