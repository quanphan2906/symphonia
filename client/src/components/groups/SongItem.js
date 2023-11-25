import React, { useState, useContext } from "react";
import { styled } from "@mui/system";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SongContext } from "@/context/SongContext";
import Snackbar from "@/components/Snackbar";
import SpotifyEmbed from "@/components/SpotifyEmbed";

const SongListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  display: `flex`,
  flexDirection: `column`,
}));

function SongItem({ song, onDelete }) {
  const [newTag, setNewTag] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const { addSongTag, removeSongTag } = useContext(SongContext);

  const handleAddTag = async () => {
    if (newTag.trim()) {
      const { error } = await addSongTag(song.song_id, newTag);
      if (error) {
        setError(error.message); // Handle error (e.g., show an error message)
      } else {
        setSuccess("Tag added successfully!");
      }

      setNewTag("");
    }
  };

  const handleDeleteTag = async (songId, tag) => {
    const { error } = await removeSongTag(songId, tag);
    if (error) {
      setError(error.message); // Handle error (e.g., show an error message)
    } else {
      setSuccess("Tag removed successfully!");
    }
  };

  return (
    <SongListItem>
      <Box sx={{ width: `100%`, display: `flex` }}>
        <Box sx={{ display: "flex", gap: 2, flexGrow: 1 }}>
          {song.url && <SpotifyEmbed link={song.url} wide />}
          <Box>
            {!song.url && (
              <>
                <Typography variant="h6">{song.name}</Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {song.author}
                </Typography>
              </>
            )}

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {song?.tags?.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag.tag}
                  onDelete={() => handleDeleteTag(song.song_id, tag.tag)}
                />
              ))}
            </Box>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <IconButton
            color="primary"
            aria-label="Add tag"
            onClick={handleAddTag}
          >
            <AddIcon />
          </IconButton>
          <TextField
            label="Tag"
            size="small"
            variant="outlined"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            sx={{ width: "8rem" }}
          />
        </Box>
        <IconButton
          edge="end"
          aria-label="Delete song"
          onClick={() => onDelete(song.song_id)}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
      <Snackbar message={error} setMessage={setError} status="error" />
      <Snackbar message={success} setMessage={setSuccess} status="success" />
    </SongListItem>
  );
}

export default SongItem;
