import "@/styles/globals.css";
import { ThemeProvider, CssBaseline } from "@mui/material";
import AppContextProvider from "@/context/AppContextProvider";
import theme from "../theme";
import React from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";

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

export function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li>
            <Link href="/groups">
              <a>Groups</a>
            </Link>
          </li>
          <li>
            <Link href="/songs">
              <a>Songs</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}


