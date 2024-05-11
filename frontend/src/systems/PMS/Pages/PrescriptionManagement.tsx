import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { Box, Button, Typography } from "@mui/material";
import BackButton from "../Components/Common/BackButton";
import { enqueueSnackbar } from "notistack";
import SearchInput from "../Components/SearchBar";
import { useState } from "react";
import Mousetrap from "mousetrap";
import { useNavigate } from "react-router-dom";

export default function PrescriptionManagement() {
  const [prescriptions, setPrescriptions] = React.useState<any>([]);

  // Fetch prescriptions from the backend
  const getPrescriptions = async () => {
    await axios.get("/api/pms/getAllPrescription").then((res: any) => {
      setPrescriptions(res.data);
    });
  };

  React.useEffect(() => {
    getPrescriptions();
  }, []);

  // Part of your PrescriptionManagement component where the updatePrescriptionStatus function is defined
  const updatePrescriptionStatus = async (id: number, status: string) => {
    // Making a PUT request to the existing backend route
    await axios
      .put(`/api/pms/updatePrescription/${id}`, { status }) // Include status in the request body
      .then(() => {
        enqueueSnackbar(`Prescription status updated as ${status}!`, {
          variant: "success",
        });
        getPrescriptions(); // Refresh the list to reflect the updated status
      })
      .catch((err) => {
        console.error("Error updating prescription status", err);
        alert("Failed to update prescription status.");
      });
  };

  const [query, setQuery] = useState("");
  const setSearch = (query: string) => {
    setQuery(query);
  };

  const navigate = useNavigate();

  // assign keyboard shortcuts -----------------------------------------------------
  // 1. dashboard
  React.useEffect(() => {
    // Bind the 'm' key to navigate to the medicines page
    Mousetrap.bind("d", () => navigate("/pms/dashboard"));

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("d");
    };
  }, [navigate]);

  // 2. medicine
  React.useEffect(() => {
    // Bind the 'm' key to navigate to the medicines page
    Mousetrap.bind("m", () => navigate("/pms/medicines"));

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("m");
    };
  }, [navigate]);

  // 3. report
  React.useEffect(() => {
    // Bind the 'm' key to navigate to the medicines page
    Mousetrap.bind("r", () => navigate("/pms/reports"));

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("r");
    };
  }, [navigate]);

  // 4. customer concern
  React.useEffect(() => {
    // Bind the 'm' key to navigate to the medicines page
    Mousetrap.bind("c", () => navigate("/pms/userconcerns"));

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("c");
    };
  }, [navigate]);

  // 5. keep
  React.useEffect(() => {
    // Bind the 'm' key to navigate to the medicines page
    Mousetrap.bind("k", () => navigate("/pms/keep"));

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("k");
    };
  }, [navigate]);

  // 6. user guide
  React.useEffect(() => {
    Mousetrap.bind("u", () => navigate("/pms/userguide"));

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("u");
    };
  }, [navigate]);

  // 7. external prescription
  React.useEffect(() => {
    Mousetrap.bind("e", () => navigate("/pms/receivedprescription"));

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("e");
    };
  }, [navigate]);

  // 8. inernal prescription
  React.useEffect(() => {
    // Bind the 'm' key to navigate to the medicines page
    Mousetrap.bind("i", () => navigate("/pms/prescriptionmanagement"));

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("i");
    };
  }, [navigate]);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
        }}
      >
        <BackButton />
        <Typography sx={{ mb: 3, flexGrow: 1 }} variant="h5">
          Prescription Management
        </Typography>
      </Box>
      <SearchInput onChange={(s) => setSearch(s)} />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell> No </TableCell>
              <TableCell> Patient Name </TableCell>
              <TableCell> Diagnosis </TableCell>
              <TableCell> Dispensed Date </TableCell>
              <TableCell> Note </TableCell>
              <TableCell> Status </TableCell>
              <TableCell> Update Status </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {prescriptions.map((row: any) => (
              <TableRow key={row.id}>
                {" "}
                {/* Added key for React list rendering */}
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.PatientId}</TableCell>
                <TableCell>{row.diagnosis}</TableCell>
                <TableCell>
                  {new Date(
                    Date.parse(row.dispensed_date)
                  ).toLocaleDateString()}
                </TableCell>
                <TableCell>{row.note}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => updatePrescriptionStatus(row.id, "Approved")} // Added onClick event to update status
                    sx={{
                      backgroundColor: "#0d4838",
                      fontSize: 10,
                      color: "white",
                      mr: 2,
                      transition: "opacity 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#0d4838",
                        opacity: 0.7,
                      },
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => updatePrescriptionStatus(row.id, "Rejected")} // Added onClick event to update status
                    sx={{
                      backgroundColor: "red",
                      fontSize: 10,
                      color: "white",
                      transition: "opacity 0.3s ease",
                      "&:hover": {
                        backgroundColor: "red",
                        opacity: 0.7,
                      },
                    }}
                  >
                    Reject
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
