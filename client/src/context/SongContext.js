import React, { createContext, useState } from "react";
import {
  createSong,
  getSongsByGroupId,
  updateSong,
  deleteSong,
  getSongTags,
  removeSongTag,
  addSongTag,
} from "@/functions";

export const SongContext = createContext();

function SongProvider({ children }) {
  const [songs, setSongs] = useState([]);

  const handleCreateSong = async (groupId, name, author, coverImage, url) => {
    const { data, error } = await createSong(
      groupId,
      name,
      author,
      coverImage,
      url
    );
    if (data) {
      setSongs((prevSongs) => [...prevSongs, { ...data, tags: [] }]);
      return { success: true };
    }
    return { success: false, error };
  };

  const handleGetSongsByGroupId = async (groupId) => {
    const { data, error } = await getSongsByGroupId(groupId);
    if (!data) {
      return { success: false, error };
    }

    try {
      const updatedSongsWithTags = await Promise.all(
        data.map(async (song) => {
          const { data: tagsData } = await getSongTags(song.song_id);
          return { ...song, tags: tagsData || [] };
        })
      );
      setSongs(updatedSongsWithTags);
      return { success: true };
    } catch (tagError) {
      console.error("Error fetching tags:", tagError);
      return { success: false, error: tagError };
    }
  };

  const handleUpdateSong = async (songId, name, author, coverImage) => {
    const { data, error } = await updateSong(songId, name, author, coverImage);
    if (data) {
      setSongs((prevSongs) =>
        prevSongs.map((song) =>
          song.song_id === songId ? { ...data, tags: song.tags } : song
        )
      );
      return { success: true };
    }
    return { success: false, error };
  };

  const handleDeleteSong = async (songId) => {
    const { error } = await deleteSong(songId);

    if (!error) {
      setSongs((prevSongs) =>
        prevSongs.filter((song) => song.song_id !== songId)
      );
      return { success: true };
    }
    return { success: false, error };
  };

  // Function to add a tag to a song
  const handleAddSongTag = async (songId, tag) => {
    const { data, error } = await addSongTag(songId, tag);
    if (!data) {
      return { success: false, error };
    }

    // Update the songs state to include the new tag
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.song_id === songId ? { ...song, tags: [...song.tags, data] } : song
      )
    );
    return { success: true };
  };

  // Function to remove a tag from a song
  const handleRemoveSongTag = async (songId, tag) => {
    const { error } = await removeSongTag(songId, tag);
    if (error) {
      return { success: false, error };
    }

    // Update the songs state to remove the tag
    setSongs((prevSongs) =>
      prevSongs.map((song) =>
        song.song_id === songId
          ? { ...song, tags: song.tags.filter((t) => t.tag !== tag) }
          : song
      )
    );
    return { success: true };
  };

  return (
    <SongContext.Provider
      value={{
        songs,
        createSong: handleCreateSong,
        getSongsByGroupId: handleGetSongsByGroupId,
        updateSong: handleUpdateSong,
        deleteSong: handleDeleteSong,
        addSongTag: handleAddSongTag,
        removeSongTag: handleRemoveSongTag,
      }}
    >
      {children}
    </SongContext.Provider>
  );
}

export default SongProvider;
