// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#4d4d4d", // Mid-dark grey
    },
    secondary: {
      main: "#ffffff", // White
    },
    text: {
      primary: "#000000", // White for primary text
      secondary: "#4d4d4d", // Mid-dark grey for secondary text (optional)
    },
    background: {
      default: "#ffffff", // White background
    },
  },
  components: {
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#000000", // Black color for text inside text boxes
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // no uppercase for buttons
        },
      },

      variants: [
        {
          props: { variant: "primaryLight" },
          style: {
            backgroundColor: "#bdbdbd", // Default background color for buttons
            color: "#ffffff", // Text color for buttons
            "&:hover": {
              backgroundColor: "#3d3d3d", // Background color for buttons on hover
            },
          },
        },
      ],
    },
    MuiIconButton: {
      variants: [
        {
          props: { variant: "primaryLight" },
          style: {
            backgroundColor: "#bdbdbd", // Default background color for buttons
            color: "#ffffff", // Text color for buttons
            "&:hover": {
              backgroundColor: "#3d3d3d", // Background color for buttons on hover
            },
          },
        },
      ],
    },
  },
});

export default theme;
