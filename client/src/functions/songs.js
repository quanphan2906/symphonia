import supabase from "./setup";

export async function createSong(groupId, name, author, coverImage) {
  // Create the song
  const { data, error } = await supabase
    .from("songs")
    .insert([{ group_id: groupId, cover_image: coverImage, name, author }])
    .select()
    .single();

  return { data, error: error ? Error(error.message) : null };
}

export async function getSongsByGroupId(groupId) {
  // Validate input
  if (!groupId) {
    return { data: null, error: Error("Missing group id") };
  }

  // Fetch the songs in the groups
  const { data, error } = await supabase
    .from("songs")
    .select()
    .eq("group_id", groupId);

  return { data, error };
}

export async function updateSong(songId, name, author, coverImage) {
  // Update song details
  const { data, error } = await supabase
    .from("songs")
    .update({ cover_image: coverImage, name, author })
    .eq("song_id", songId)
    .select()
    .single();

  return { data, error: error ? Error(error.message) : null };
}

export async function deleteSong(songId) {
  // Delete the song
  const { error } = await supabase.from("songs").delete().eq("song_id", songId);

  const err = error ? Error(error.message) : null;
  return { data: null, err };
}
