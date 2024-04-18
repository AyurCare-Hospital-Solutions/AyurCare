import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';

function AccessoriesSearchBar({ setQuery }: { setQuery:(arg:string)=> any}) {
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
              onChange={(e: any) => {
                  setQuery(e.target.value);
              }}
          />
    </div>
  )
}

export default AccessoriesSearchBar
