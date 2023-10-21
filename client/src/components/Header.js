import React, { useContext } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Button from "@mui/material/Button";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header() {
  const { user } = useContext(UserContext);
  // const user = true;
  const router = useRouter();

  const handleLoginClick = () => {
    router.push("/auth/login");
  };

  const handleSignupClick = () => {
    router.push("/auth/signup");
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography
          variant='h6'
          noWrap
          component='div'
          sx={{ display: { xs: "none", sm: "block" }, flexGrow: 1 }}
        >
          Connectify
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder='Search…' inputProps={{ "aria-label": "search" }} />
        </Search>
        {user ? (
          <>
            <IconButton color='inherit'>
              <Badge badgeContent={4} color='error'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color='inherit'>
              <AccountCircle />
            </IconButton>
          </>
        ) : (
          <>
            <Button color='inherit' onClick={handleLoginClick}>
              Login
            </Button>
            <Button color='inherit' onClick={handleSignupClick}>
              Sign Up
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
