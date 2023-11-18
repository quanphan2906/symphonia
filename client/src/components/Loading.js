import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <CircularProgress size={60} thickness={4.5} />
      <Typography variant="h6" component="div" sx={{ marginTop: 2 }}>
        Loading...
      </Typography>
    </Box>
  );
}

export default Loading;
