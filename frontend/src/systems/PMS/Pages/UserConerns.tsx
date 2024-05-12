import axios from "axios";
import { useEffect, useState } from "react";
import ShowConcerns from "../Components/UserConcers/ShowConcernsTable";
import Typography from "@mui/material/Typography/Typography";
import BackButton from "../Components/Common/BackButton";
import { Box } from "@mui/material";
import Mousetrap from "mousetrap";
import { useNavigate } from "react-router-dom";
import { playAudio } from "../Components/Common/audioUtils";

const UserConerns = () => {
  const [concerns, setConcerns] = useState();
  const [query, setQuery] = useState("");

  const getConcerns = () => {
    axios.get("/api/pms/getUserConcerns").then((res: any) => {
      setConcerns(res.data);
    });
  };

  useEffect(() => {
    getConcerns();
  }, []);
  const setSearch = (query: string) => {
    setQuery(query);
  };

  const navigate = useNavigate();

  // assign keyboard shortcuts -----------------------------------------------------
  // 1. dashboard
  useEffect(() => {
    // Bind the 'm' key to navigate to the medicines page
    Mousetrap.bind("d", () => {
      playAudio("../../../../../public/pmsassests/sounds/click.mp3");
      navigate("/pms/dashboard");
    });

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("d");
    };
  }, [navigate]);

  // 2. medicine
  useEffect(() => {
    // Bind the 'm' key to navigate to the medicines page
    Mousetrap.bind("m", () => {
      playAudio("../../../../../public/pmsassests/sounds/click.mp3");
      navigate("/pms/medicines");
    });

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("m");
    };
  }, [navigate]);

  // 3. report
  useEffect(() => {
    // Bind the 'm' key to navigate to the medicines page
    Mousetrap.bind("r", () => {
      playAudio("../../../../../public/pmsassests/sounds/click.mp3");
      navigate("/pms/reports");
    });

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("r");
    };
  }, [navigate]);

  // 4. customer concern
  useEffect(() => {
    // Bind the 'm' key to navigate to the medicines page
    Mousetrap.bind("c", () => {
      playAudio("../../../../../public/pmsassests/sounds/click.mp3");
      navigate("/pms/userconcerns");
    });

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("c");
    };
  }, [navigate]);

  // 5. keep
  useEffect(() => {
    // Bind the 'm' key to navigate to the medicines page
    Mousetrap.bind("k", () => {
      playAudio("../../../../../public/pmsassests/sounds/click.mp3");
      navigate("/pms/keep");
    });

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("k");
    };
  }, [navigate]);

  // 6. user guide
  useEffect(() => {
    Mousetrap.bind("u", () => {
      playAudio("../../../../../public/pmsassests/sounds/click.mp3");
      navigate("/pms/userguide");
    });

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("u");
    };
  }, [navigate]);

  // 7. external prescription
  useEffect(() => {
    Mousetrap.bind("e", () => {
      playAudio("../../../../../public/pmsassests/sounds/click.mp3");
      navigate("/pms/receivedprescription");
    });

    // Cleanup the binding when the component unmounts
    return () => {
      Mousetrap.unbind("e");
    };
  }, [navigate]);

  // 8. inernal prescription
  useEffect(() => {
    // Bind the 'm' key to navigate to the medicines page
    Mousetrap.bind("i", () => {
      playAudio("../../../../../public/pmsassests/sounds/click.mp3");
      navigate("/pms/prescriptionmanagement");
    });

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
          Customer Support
        </Typography>
      </Box>

      <ShowConcerns concerns={concerns} />
    </>
  );
};

export default UserConerns;
