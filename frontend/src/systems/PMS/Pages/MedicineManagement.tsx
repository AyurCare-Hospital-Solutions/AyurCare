import axios from "axios";
import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import MedicineTable from "../Components/Medicines/MedicineTable";
import SearchInput from "../Components/SearchBar";
import MedicineDialog from "../Components/Medicines/MedicineDialog";
import BackButton from "../Components/Common/BackButton";
import Mousetrap from "mousetrap";
import { useNavigate } from "react-router-dom";

const Medicine = () => {
  const [data, setData] = useState<any[]>([]); // Initialize data as an empty array
  const [modalOpen, setModalOpen] = useState(false);

  const getMedicine = () => {
    axios.get("/api/pms/medicineall").then((res: any) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getMedicine();
  }, []);

  const [query, setQuery] = useState("");
  const setSearch = (query: string) => {
    setQuery(query);
  };

  const handleClickOpen = () => {
    setModalOpen(true);
  };

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
          Medicine Management
        </Typography>
      </Box>

      <Box sx={{ display: "flex" }} mt={4} mx={2}>
        <SearchInput onChange={(s) => setSearch(s)} />
        <Box flexGrow={1}></Box>
        <Button
          onClick={handleClickOpen}
          variant="outlined"
          startIcon={<Add />}
        >
          Add Medicine
        </Button>
      </Box>

      <MedicineTable query={query} medicine={data} />

      {/* 
        This is a our MEDICINEDIALOG COMPONENT.
        OPEN attriubute helps us to open the dialog box.
        when we clicks the button it will set the modal open as true now your modal is ready to open.
      */}

      <MedicineDialog
        open={modalOpen}
        handleClose={() => {
          setModalOpen(false);
        }}
      />
    </>
  );
};

export default Medicine;
