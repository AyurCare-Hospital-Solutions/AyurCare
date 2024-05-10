import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "./index.css";
import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import axios from 'axios';
import { ConfirmProvider } from "material-ui-confirm"
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

import { themeConfig, baseURL } from './config.ts'


axios.defaults.baseURL = baseURL;
axios.interceptors.request.use(async (cfg) => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    cfg.headers.Authorization = jwt;
  }
  return cfg;
})

const theme = themeConfig;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <SnackbarProvider autoHideDuration={3000} >
          <ConfirmProvider>
            <App />
          </ConfirmProvider>
        </SnackbarProvider>
      </LocalizationProvider>
    </ThemeProvider>
  </React.StrictMode >
)
