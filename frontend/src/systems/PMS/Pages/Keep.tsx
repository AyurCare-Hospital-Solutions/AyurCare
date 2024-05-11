import { Box, Typography } from "@mui/material";
import NoteTakingApp from "../Components/Keep/NoteTakingApp";
import BackButton from "../Components/Common/BackButton";
import Mousetrap from "mousetrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Keep = () => {
  
  //here
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

  // there
  return (
    <div>
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
          Note Calender
        </Typography>
      </Box>

      {/* <Typography
        variant="subtitle1"
        sx={{ marginTop: "10px", fontSize: "15px", color: "grey" }}
      >
        Streamline your scheduling and notetaking in one convenient place with
        the 'Note Calendar,' your go-to for organized productivity.
      </Typography> */}

      <NoteTakingApp />
    </div>
  );
};

export default Keep;
