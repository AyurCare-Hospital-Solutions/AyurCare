import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { ChangeEvent } from "react";

const SearchBar = ({ onChange }: { onChange: (inp: string) => any }) => {
  // add a 0.2 second delay for calling onChange that resets every time a character changes.
  // onChange will be called when the search text remains unchanged for 0.2 seconds.
  let timeout = -1;
  const changeHandler = (c: ChangeEvent<HTMLInputElement>) => {
    const value = c.target.value;
    clearTimeout(timeout);
    timeout = setTimeout(() => onChange(value), 200);
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
