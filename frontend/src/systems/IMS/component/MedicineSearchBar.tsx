import { Search } from '@mui/icons-material'
import { InputAdornment, TextField } from '@mui/material'
import React from 'react'

function MedicineSearchBar({ onSearch }: { onSearch: (str: String) => any }) {
    return (
        <div>
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
                onChange={(e) => {
                    onSearch(e.target.value);
                }}
            />
        </div>
    )
}

export default MedicineSearchBar;
