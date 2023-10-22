import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { SongContext } from "@/context/SongContext";
import { GroupContext } from "@/context/GroupContext";
import { useRouter } from "next/router";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import AddSongForm from "@/components/groups/AddSongForm";
import FilterPanel from "@/components/groups/FilterPanel";
import SongItem from "@/components/groups/SongItem";
import Snackbar from "@/components/Snackbar";

const GroupDetails = ({ groupId, onDelete }) => {
  const { user } = useContext(UserContext);
  const { songs, createSong, getSongsByGroupId } = useContext(SongContext);
  const { currentGroup, getGroup, deleteGroup } = useContext(GroupContext);
  const [error, setError] = useState(null);

  const router = useRouter();

  const [filterTags, setFilterTags] = useState([]);

  // TODO: In all event handlers, need to update database

  useEffect(() => {
    const fetchData = async () => {
      const { error: songError } = await getSongsByGroupId(groupId);
      if (songError) {
        setError("Error fetching songs:" + songError.message);
      }

      const { error: groupError } = await getGroup(groupId);
      if (groupError) {
        setError("Error fetching current group:" + groupError.message);
      }
    };
    fetchData();
  }, [groupId]);

  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false); // New state for modal control

  const handleOpenAddSongModal = () => {
    setIsAddSongModalOpen(true);
  };

  const handleCloseAddSongModal = () => {
    setIsAddSongModalOpen(false);
  };

  const handleAddSong = async (newSong) => {
    const { success, error } = await createSong(
      groupId,
      newSong.name,
      newSong.artist,
      newSong.coverImage
    );
    if (!success) {
      console.error(error.message); // Handle error (e.g., show an error message)
    }
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

  const handleDeleteGroupClick = () => {
    const { error } = deleteGroup(groupId);

    if (!error) {
      router.push("/"); // Redirect to groups page on successful deletion
    } else {
      setError(error.message);
    }
  };

  // const handleEditGroupName = (newGroupName) => {
  // 	updateGroupName(groupId, newGroupName, user.userId); // TODO: update group data
  // };

  // Filter the songs based on the selected tags
  const filteredSongs =
    filterTags.length == 0
      ? songs
      : songs.filter((song) => song.tags.some((tag) => filterTags.includes(tag)));

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant='h4'>{currentGroup ? currentGroup.group_name : "Loading..."}</Typography>
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
        <Button variant='outlined' color='primary' onClick={handleDeleteGroupClick}>
          Delete Group
        </Button>
      </Box>

      <AddSongForm
        onAddSong={handleAddSong} // TODO: tags are not being added or edited yet
        open={isAddSongModalOpen}
        handleClose={handleCloseAddSongModal}
      />

      <Snackbar message={error} status='error' />
    </Box>
  );
};

export default GroupDetails;
