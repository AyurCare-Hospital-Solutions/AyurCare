import axios from "axios";
import { useEffect, useState } from "react";
import ShowConcerns from "../Components/UserConcers/ShowConcernsTable";
import SearchBar from "../Components/SearchBar";
import Typography from "@mui/material/Typography/Typography";
import BackButton from "../Components/Common/BackButton";
import { Box } from "@mui/material";

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
