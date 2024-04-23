import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Nav from "./components/Nav.tsx";
import "./index.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';
import { ConfirmProvider } from "material-ui-confirm"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'


axios.defaults.baseURL = 'http://localhost:5000/';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#003a2b',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SnackbarProvider autoHideDuration={3000} >
          <ConfirmProvider>
            <Nav></Nav>
            <App></App>
          </ConfirmProvider>
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode >,
)
