import { Search } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'

function SearchBar({ onSearch }: { onSearch: (str: String) => any }) {
    return (
        <div>
            <TextField
                placeholder="Search Medicine"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Search />
                        </InputAdornment>
                    ),
                }}
                variant="outlined"
                size={"small"}
                onChange={(e) => {
                    onSearch(e.target.value);
                }}
            />
        </div>
    )
}

export default SearchBar;
