import React, { useState, useEffect, useContext } from "react";
import { styled } from "@mui/system";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { SongTagContext } from "@/context/SongTagContext";
import Snackbar from "@/components/Snackbar";

const SongListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

function SongItem({ song, onDelete }) {
  const { songTags, getSongTags, addSongTag, removeSongTag } =
    useContext(SongTagContext);

  const [newTag, setNewTag] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { success, error } = await getSongTags(song.song_id);
      if (!success) {
        setError(`Error fetching tags: ${error.message}`);
      }
    };
    fetchData();
  }, [song.song_id]);

  const handleAddTag = async () => {
    if (newTag.trim()) {
      const { success, error } = await addSongTag(song.song_id, newTag);
      if (!success) {
        setError(error.message); // Handle error (e.g., show an error message)
      }

      setNewTag("");
    }
  };

  const handleDeleteTag = async (songId, tag) => {
    const { success, error } = await removeSongTag(songId, tag);
    if (!success) {
      setError(error.message); // Handle error (e.g., show an error message)
    }
  };

  return (
    <SongListItem>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          {`${song.name} - ${song.author}`}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {songTags?.map((tag, index) => (
            <Chip
              key={index}
              label={tag.tag}
              onDelete={() => handleDeleteTag(song.song_id, tag.tag)}
            />
          ))}
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <IconButton color="primary" aria-label="Add tag" onClick={handleAddTag}>
          <AddIcon />
        </IconButton>
        <TextField
          label="Tag"
          size="small"
          variant="outlined"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
      </Box>
      <IconButton
        edge="end"
        aria-label="Delete song"
        onClick={() => onDelete(song.song_id)}
      >
        <DeleteIcon />
      </IconButton>
      <Snackbar message={error} setMessage={setError} status="error" />
    </SongListItem>
  );
}

export default SongItem;
