import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { GroupContext } from "@/context/GroupContext";
import { SongContext } from "@/context/SongContext";
import AddSongForm from "@/components/groups/AddSongForm";
import FilterPanel from "@/components/groups/FilterPanel";
import Recommendations from "@/components/groups/Recommendations";
import SongItem from "@/components/groups/SongItem";
import Snackbar from "@/components/Snackbar";

function GroupDetails({ groupId }) {
  const { songs, createSong, getSongsByGroupId, deleteSong } =
    useContext(SongContext);
  const { currentGroup, getGroup, deleteGroup } = useContext(GroupContext);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const router = useRouter();

  const [filterTags, setFilterTags] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const { error: songError } = await getSongsByGroupId(groupId);
      if (songError) {
        setError(`Error fetching songs:${songError.message}`);
      }

      const { error: groupError } = await getGroup(groupId);
      if (groupError) {
        setError(`Error fetching current group:${groupError.message}`);
      }
    };
    fetchData();
  }, [groupId]);

  const [isAddSongModalOpen, setIsAddSongModalOpen] = useState(false);

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
      newSong.coverImage,
      newSong.url
    );

    if (success) {
      setSuccess("Song added successfully!");
    } else {
      setError(error.message);
    }
  };

  const handleDeleteSong = async (songId) => {
    const { success, error } = await deleteSong(songId);

    if (success) {
      setSuccess("Song deleted successfully!");
    } else {
      setError(error.message);
    }
  };

  const handleAddFilter = (tag) => {
    setFilterTags([...filterTags, tag]);
  };

  const handleDeleteFilter = (tag) => {
    setFilterTags((tags) => tags.filter((t) => t !== tag));
  };

  const handleDeleteGroupClick = async () => {
    const { error } = await deleteGroup(groupId);

    if (!error) {
      router.push("/"); // Redirect to groups page on successful deletion
      // TODO: Solve this error (Error: Abort fetching component for route: "/")
      setSuccess("Group deleted successfully!");
    } else {
      setError(error.message);
    }
  };

  // const handleEditGroupName = (newGroupName) => {
  // 	updateGroupName(groupId, newGroupName, user.userId); // TODO: update group data
  // };

  const filteredSongs =
    filterTags.length === 0
      ? songs
      : songs.filter((song) =>
          song.tags.some((tag) => filterTags.includes(tag.tag))
        );

  return (
    <Box sx={{ marginTop: 4 }}>
      <Typography variant="h4">
        {currentGroup ? currentGroup.group_name : "Loading..."}
        {/* TODO: Have something for loading */}
      </Typography>
      <FilterPanel
        addedTags={filterTags}
        onAddFilter={handleAddFilter}
        onDeleteFilter={handleDeleteFilter}
      />
      <List>
        {filteredSongs.map((song) => (
          <SongItem
            key={song.song_id}
            song={song}
            onDelete={handleDeleteSong}
          />
        ))}
      </List>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", marginTop: 2 }}
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleOpenAddSongModal}
        >
          Add Song
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={handleDeleteGroupClick}
        >
          Delete Group
        </Button>
      </Box>

      <Recommendations />

      <AddSongForm
        onAddSong={handleAddSong} // TODO: tags are not being added or edited yet
        open={isAddSongModalOpen}
        handleClose={handleCloseAddSongModal}
      />

      <Snackbar message={error} setMessage={setError} status="error" />
      <Snackbar message={success} setMessage={setSuccess} status="success" />
    </Box>
  );
}

export default GroupDetails;
