import "@/styles/globals.css";
import UserProvider from "@/context/UserContext";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "../theme";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  );
}
