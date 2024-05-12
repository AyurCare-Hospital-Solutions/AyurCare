// import { Search } from '@mui/icons-material'
// import { InputAdornment, TextField } from '@mui/material'

// function SearchBar({ onSearch }: { onSearch: (str: String) => any }) {
//     return (
//         <div>
//             <TextField
//                 placeholder="Search Medicine"
//                 InputProps={{
//                     startAdornment: (
//                         <InputAdornment position="start">
//                             <Search />
//                         </InputAdornment>
//                     ),
//                 }}
//                 variant="outlined"
//                 size={"small"}
//                 onChange={(e) => {
//                     onSearch(e.target.value);
//                 }}
//             />
//         </div>
//     )
// }

// export default SearchBar;

import { Search } from "@mui/icons-material"
import { InputAdornment, TextField } from "@mui/material"
import { ChangeEvent } from "react";

const SearchBar = ({ onChange }: { onChange: (pattern: RegExp | undefined) => any }) => {
    // add a 0.2 second delay for calling onChange that resets every time a character changes.
    // onChange will be called when the search text remains unchanged for 0.2 seconds.
    let timeout = -1;
    const changeHandler = (c: ChangeEvent<HTMLInputElement>) => {
        const value = c.target.value.trim();
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if (value.length === 0) {
                onChange(undefined);
                return;
            }

            let escaped = value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
            onChange(RegExp(escaped, 'i'));
        }, 200)
    }

    return <TextField
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
}

export default SearchBar;
