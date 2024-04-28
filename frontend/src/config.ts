import { createTheme } from "@mui/material";


export const themeConfig = createTheme({
    palette: {
        mode: 'light',
            primary: {
            main: '#003a2b',
    },
        secondary: {
            main: '#f50057',
    },
    },
})

export const baseURL = "http://localhost:5000/";