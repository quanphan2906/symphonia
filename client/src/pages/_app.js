import "@/styles/globals.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import AppContextProvider from "@/context/AppContextProvider";
import theme from "../theme";
import React from "react";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </ThemeProvider>
  );
}
