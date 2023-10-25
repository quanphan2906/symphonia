import React, { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function CustomSnackbar({ message, status }) {
  const [open, setOpen] = useState(Boolean(message));

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000} // Hide after 3 seconds
      onClose={handleClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }} // Position at bottom left
    >
      <Alert onClose={handleClose} severity={status} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}

export default CustomSnackbar;
