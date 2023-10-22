import React, { useState } from "react";
import { styled } from "@mui/system";
import Chip from "@mui/material/Chip";
import AddIcon from "@mui/icons-material/Add";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const SongListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
}));

const SongItem = ({ song, onDelete, onAddTag, onDeleteTag }) => {
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    if (newTag.trim()) {
      onAddTag(song.id, newTag.trim());
      setNewTag("");
    }
  };

  return (
    <SongListItem>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant='subtitle1' gutterBottom>
          {`${song.name} - ${song.author}`}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
          {song.tags?.map((tag, index) => (
            <Chip key={index} label={tag} onDelete={() => onDeleteTag(song.id, tag)} />
          ))}
        </Box>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
        <IconButton color='primary' aria-label='Add tag' onClick={handleAddTag}>
          <AddIcon />
        </IconButton>
        <TextField
          label='Tag'
          variant='outlined'
          size='small'
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
        />
      </Box>
      <IconButton edge='end' aria-label='Delete song' onClick={() => onDelete(song.id)}>
        <DeleteIcon />
      </IconButton>
    </SongListItem>
  );
};

export default SongItem;
