import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import { styled } from "@mui/system";

const FormContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
  maxWidth: "100%",
  margin: "auto",
});

function AddSongForm({ onAddSong, open, handleClose }) {
  const [newSongName, setNewSongName] = useState("");
  const [newArtist, setNewArtist] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newSongName.trim() && newArtist.trim()) {
      const newSong = {
        name: newSongName.trim(),
        artist: newArtist.trim(),
        tags: [],
        url: newUrl.trim(),
      };
      onAddSong(newSong);
      setNewSongName("");
      setNewArtist("");
      setNewUrl("");
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Add a New Song</DialogTitle>
      <DialogContent>
        <FormContainer component="form" onSubmit={handleSubmit}>
          <TextField
            label="Song Name"
            variant="outlined"
            value={newSongName}
            onChange={(e) => setNewSongName(e.target.value)}
            fullWidth
          />
          <TextField
            label="Artist"
            variant="outlined"
            value={newArtist}
            onChange={(e) => setNewArtist(e.target.value)}
            fullWidth
          />
          <TextField
            label="Spotify URL"
            variant="outlined"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            fullWidth
          />
        </FormContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Add Song
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddSongForm;
