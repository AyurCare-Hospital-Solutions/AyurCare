import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { ChangeEvent } from "react";

const SearchBar = ({
  onChange,
}: {
  onChange: (pattern: RegExp | undefined) => any;
}) => {
  const changeHandler = (c: ChangeEvent<HTMLInputElement>) => {
    const value = c.target.value.trim();
    if (value.length === 0) {
      onChange(undefined);
      return;
    }

    let replaceChars = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    onChange(RegExp(replaceChars, "i"));
  };

  return (
    <TextField
      placeholder="Search"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      size={"small"}
      onChange={changeHandler}
    />
  );
};

export default SearchBar;
