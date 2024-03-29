import { Search } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';

function MaterialSearchBar({ setSearchQuery }: { setSearchQuery: (p:String)=> any }) {
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
        onChange={(e:any) => {
          setSearchQuery(e.target.value);
        }}
      />
    </div>
  )
}

export default MaterialSearchBar
