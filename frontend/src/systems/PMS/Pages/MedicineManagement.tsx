import axios from "axios";
import { useEffect, useState } from "react";
import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import MedicineTable from "../Components/Medicines/MedicineTable";
import SearchInput from "../Components/SearchBar";
import MedicineDialog from "../Components/Medicines/MedicineDialog";
import BackButton from "../Components/Common/BackButton";

const Medicine = () => {
  const [data, setData] = useState<any[]>([]); // Initialize data as an empty array
  const [modalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState("");

  const getMedicine = () => {
    axios.get("/api/pms/medicineall").then((res: any) => {
      setData(res.data);
    });
  };

  useEffect(() => {
    getMedicine();
  }, []);

  const setSearch = (query: string) => {
    setQuery(query);
  };

  const handleClickOpen = () => {
    setModalOpen(true);
  };

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
