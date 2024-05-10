import React, { useState } from "react";
import SearchForm from "./components/SearchForm";
import SearchResults from "./components/SearchResults";
import { Typography } from "@mui/material";

interface SearchResultsProps {
  results: any[]; // Placeholder for search results type (update based on your data structure)
}

const Records: React.FC = () => {
  const [searchResults, setSearchResults] =
    useState<SearchResultsProps["results"]>(); // Initialize empty search results

  const handleSearch = (results: any[]) => {
    setSearchResults(results);
  };

  return (
    <div>
      <SearchForm onSearch={handleSearch} />
      {searchResults !== undefined ? (
        <SearchResults results={searchResults} />
      ) : (
        <Typography variant="h5" sx={{ m: 5, textAlign: "center", color: "rgba(0, 0, 0, 0.5)" }}>
          No records found
        </Typography>
      )}
    </div>
  );
};

export default Records;
