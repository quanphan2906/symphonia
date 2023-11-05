import React, { createContext, useState } from "react";
import { addSongTag, removeSongTag, getSongTags } from "@/functions";

export const SongTagContext = createContext();

function SongTagProvider({ children }) {
  const [songTags, setSongTags] = useState([]);

  const handleAddSongTag = async (songId, tag) => {
    const { data, error } = await addSongTag(songId, tag);
    if (data) {
      setSongTags((prevSongTags) => [...prevSongTags, data]);
      return { success: true };
    }
    return { success: false, error };
  };

  const handleRemoveSongTag = async (songId, tag) => {
    const { data, error } = await removeSongTag(songId, tag);
    if (data) {
      setSongTags((prevSongTags) =>
        prevSongTags.filter((songTag) => songTag.tag !== tag)
      );
      return { success: true };
    }
    return { success: false, error };
  };

  const handleGetSongTags = async (songId) => {
    const { data, error } = await getSongTags(songId);
    if (data) {
      setSongTags(data);
      return { success: true };
    }
    return { success: false, error };
  };

  return (
    <SongTagContext.Provider
      value={{
        songTags,
        addSongTag: handleAddSongTag,
        removeSongTag: handleRemoveSongTag,
        getSongTags: handleGetSongTags,
      }}
    >
      {children}
    </SongTagContext.Provider>
  );
}

export default SongTagProvider;
