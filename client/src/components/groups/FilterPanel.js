import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";

const FilterPanelContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
}));

const TagContainer = styled("div")(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(2),
}));

const InputContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));

const FilterPanel = ({ addedTags, onAddFilter, onDeleteFilter }) => {
  const [inputTag, setInputTag] = useState("");

  const handleInputChange = (event) => {
    setInputTag(event.target.value);
  };

  const handleAddTag = () => {
    if (inputTag.trim()) {
      onAddFilter(inputTag.trim());
      setInputTag("");
    }
  };

  return (
    <FilterPanelContainer>
      <TagContainer>
        {addedTags.map((tag) => (
          <Chip key={tag} label={tag} onDelete={() => onDeleteFilter(tag)} />
        ))}
      </TagContainer>
      <InputContainer>
        <TextField
          variant='outlined'
          size='small'
          value={inputTag}
          onChange={handleInputChange}
          placeholder='Enter tags to filter songs...'
          fullWidth
        />
        <IconButton color='primary' aria-label='add' onClick={handleAddTag}>
          <AddIcon />
        </IconButton>
      </InputContainer>
    </FilterPanelContainer>
  );
};

export default FilterPanel;
