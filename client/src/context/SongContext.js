import React, { createContext, useState } from "react";
import {
  createSong,
  getSongsByGroupId,
  updateSong,
  deleteSong,
} from "@/functions";

export const SongContext = createContext();

function SongProvider({ children }) {
  const [songs, setSongs] = useState([]);

  const handleCreateSong = async (groupId, name, author, coverImage) => {
    const { data, error } = await createSong(groupId, name, author, coverImage);
    if (data) {
      setSongs((prevSongs) => [...prevSongs, data]);
      return { success: true };
    }
    return { success: false, error };
  };

  const handleGetSongsByGroupId = async (groupId) => {
    const { data, error } = await getSongsByGroupId(groupId);
    if (data) {
      setSongs(data);
      return { success: true };
    }
    return { success: false, error };
  };

  const handleUpdateSong = async (songId, name, author, coverImage) => {
    const { data, error } = await updateSong(songId, name, author, coverImage);
    if (data) {
      setSongs((prevSongs) =>
        prevSongs.map((song) => (song.song_id === songId ? data : song))
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

  return (
    <SongContext.Provider
      value={{
        songs,
        createSong: handleCreateSong,
        getSongsByGroupId: handleGetSongsByGroupId,
        updateSong: handleUpdateSong,
        deleteSong: handleDeleteSong,
      }}
    >
      {children}
    </SongContext.Provider>
  );
}

export default SongProvider;
