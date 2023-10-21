import React, { useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AddSongForm from "@/components/groups/AddSongForm";
import FilterPanel from "@/components/groups/FilterPanel";
import SongItem from "@/components/groups/SongItem";

// import { updateGroupName } from "@/data/dataFetch";

const songsData = [
  {
    id: 1,
    name: "Song 1",
    artist: "Artist 1",
    tags: ["Rock", "Alternative"],
  },
  { id: 2, name: "Song 2", artist: "Artist 2", tags: ["Pop", "Indie"] },
  { id: 3, name: "Song 3", artist: "Artist 3", tags: ["Pop", "R&B"] },
];

const GroupDetails = ({ groupId, onDelete }) => {
  const { user } = useContext(UserContext);

  const [groupSongs, setGroupSongs] = useState(songsData);
  const [filterTags, setFilterTags] = useState([]);
  const router = useRouter();

  // TODO: In all event handlers, need to update database
  // TODO: Use id of the group to fetch group data

  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false); // New state for modal control

  const handleOpenAddSongModal = () => {
    setIsAddSongModalOpen(true);
  };

  const handleCloseAddSongModal = () => {
    setIsAddSongModalOpen(false);
  };

  const handleAddSong = (newSong) => {
    setGroupSongs([
      ...groupSongs,
      {
        id: groupSongs.length + 1,
        ...newSong,
      },
    ]);
  };

  const handleDeleteSong = (songId) => {
    setGroupSongs((prevSongs) => prevSongs.filter((song) => song.id !== songId));
  };

  const handleAddTag = (songId, newTag) => {
    setGroupSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId ? { ...song, tags: [...song.tags, newTag] } : song
      )
    );
  };

  const handleDeleteTag = (songId, tag) => {
    setGroupSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.id === songId ? { ...song, tags: song.tags.filter((t) => t !== tag) } : song
      )
    );
  };

  const handleAddFilter = (tag) => {
    setFilterTags([...filterTags, tag]);
  };

  const handleDeleteFilter = (tag) => {
    setFilterTags((tags) => tags.filter((t) => t !== tag));
  };

  // const handleEditGroupName = (newGroupName) => {
  // 	updateGroupName(groupId, newGroupName, user.userId);
  // };

  // Filter the songs based on the selected tags
  const filteredSongs =
    filterTags.length == 0
      ? groupSongs
      : groupSongs.filter((song) => song.tags.some((tag) => filterTags.includes(tag)));

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant='h4'>Group Songs</Typography>
      <FilterPanel
        addedTags={filterTags}
        onAddFilter={handleAddFilter}
        onDeleteFilter={handleDeleteFilter}
      />
      <List>
        {filteredSongs.map((song) => (
          <SongItem
            key={song.id}
            song={song}
            onDelete={handleDeleteSong}
            onAddTag={handleAddTag}
            onDeleteTag={handleDeleteTag}
          />
        ))}
      </List>

      <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}>
        <Button
          variant='contained'
          color='primary'
          startIcon={<AddIcon />}
          onClick={handleOpenAddSongModal}
        >
          Add Song
        </Button>
        <Button variant='outlined' color='primary' onClick={() => onDelete(groupid)}>
          Delete Group
        </Button>
      </Box>

      <AddSongForm
        onAddSong={handleAddSong}
        open={isAddSongModalOpen}
        handleClose={handleCloseAddSongModal}
      />
    </Box>
  );
};

export default GroupDetails;
