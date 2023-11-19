import supabase from "../src/functions/setup";

export const removeTestUsers = async (userIds) => {
  if (!userIds || userIds.length === 0) return;

  for (const userId of userIds) {
    // Delete test user from auth and users table

    // check if the user is in the database
    const { data: usersData } = await supabase
      .from("users")
      .select()
      .eq("user_id", userId);

    if (usersData.length === 0) {
      continue;
    }

    const { error: deleteError } = await supabase.auth.admin.deleteUser(userId);
    if (deleteError) {
      console.error("Error deleting test user:", deleteError.message);
    }

    const { error: truncateError } = await supabase
      .from("users")
      .delete()
      .eq("user_id", userId);

    if (truncateError) {
      console.error(
        "Error deleting test user from 'users' table:",
        truncateError.message
      );
    }
  }
};

export const removeTestGroups = async (groupIds) => {
  if (!groupIds || groupIds.length === 0) return;

  for (const groupId of groupIds) {
    // Delete test group
    const { error: truncateError } = await supabase
      .from("groups")
      .delete()
      .eq("group_id", groupId);

    if (truncateError) {
      console.error("Error deleting test group:", truncateError.message);
    }
  }
};

export const removeTestSongs = async (groupId) => {
  if (!groupId) return;

  // Delete songs related to test group
  const { error: truncateError } = await supabase
    .from("songs")
    .delete()
    .eq("group_id", groupId);

  if (truncateError) {
    console.error("Error deleting test songs:", truncateError.message);
  }
};

export const removeTestSongTags = async (songIds) => {
  if (!songIds || songIds.length === 0) return;

  // Delete tags related to test songs
  for (const songId of songIds) {
    const { error: truncateError } = await supabase
      .from("song_tags")
      .delete()
      .eq("song_id", songId);

    if (truncateError) {
      console.error("Error deleting test song tags:", truncateError.message);
    }
  }
};
