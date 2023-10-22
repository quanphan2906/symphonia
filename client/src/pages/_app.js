import "@/styles/globals.css";
import AppContextProvider from "@/context/AppContextProvider";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme";

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
