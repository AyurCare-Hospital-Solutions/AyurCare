import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Nav from "./components/Nav.tsx";
import "./index.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';

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
      <Nav></Nav>
      <App></App>
      test
    </ThemeProvider>
  </React.StrictMode>,
)
