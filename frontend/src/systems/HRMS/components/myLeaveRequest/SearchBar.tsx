import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  return (
    <div style={{ margin: "auto", maxWidth: "500px", position: "relative" }}>
      <input
        type="text"
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "20px",
          border: "1px solid #ccc",
        }}
        placeholder="Search..."
      />
      <IconButton
        style={{
          position: "absolute",
          top: "50%",
          right: "0",
          transform: "translateY(-50%)",
        }}
        aria-label="search"
      >
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;
