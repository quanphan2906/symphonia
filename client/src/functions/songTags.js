import supabase from "./setup";

// TODO: Add the necessary RLS policies to the song_tags table

export async function addSongTag(songId, tag) {
  // Add the tag to the song
  const { data, error } = await supabase
    .from("song_tags")
    .insert([{ song_id: songId, tag }])
    .select()
    .single();

  return { data, error: error ? Error(error.message) : null };
}

export async function removeSongTag(songId, tag) {
  // Remove the tag from the song
  const { data, error } = await supabase
    .from("song_tags")
    .delete()
    .match({ song_id: songId, tag })
    .select();

  return { data, error: error ? Error(error.message) : null };
}

export async function getSongTags(songId) {
  // Fetch the tags for the song
  const { data, error } = await supabase
    .from("song_tags")
    .select("tag")
    .eq("song_id", songId);

  return { data, error };
}
