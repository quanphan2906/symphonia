import {
  addSongTag,
  removeSongTag,
  getSongTags,
  createSong,
  signup,
  createGroup,
  logout,
} from "../src/functions";
import {
  removeTestGroups,
  removeTestSongs,
  removeTestUsers,
  removeTestSongTags,
} from "./helper";

describe("Song Tags management test suite", () => {
  let groupId, songId;
  let userIds;

  beforeAll(async () => {
    const fakeEmail = "testuser@example.com";
    const fakePassword = "password";
    const fakeUsername = "testuser";
    const fakeUserAvatar = "userAvatar";
    userIds = [];

    const { data: signupData } = await signup(
      fakeEmail,
      fakePassword,
      fakeUsername,
      fakeUserAvatar
    );
    userIds.push(signupData.user.user_id);

    const avatar = "groupAvatar";
    const groupName = "New Group";
    const songName = "Song Name";
    const songAuthor = "Taylor Swift";
    const songCoverImage = "cover.jpg";

    const {
      data: { group },
    } = await createGroup(groupName, avatar);

    groupId = group.group_id;
    const { data: songData } = await createSong(
      groupId,
      songName,
      songAuthor,
      songCoverImage
    );

    songId = songData.song_id;
  }, 15000);

  afterAll(async () => {
    await logout();
    await removeTestSongTags([songId]);
    await removeTestSongs(groupId);
    await removeTestGroups([groupId]);
    await removeTestUsers(userIds);
  }, 15000);

  it("5.1 should successfully add a tag to a song", async () => {
    const tag = "Pop";
    const { data, error } = await addSongTag(songId, tag);

    expect(error).toBeNull();
    expect(data).toBeTruthy();
    expect(data.tag).toBe(tag);
  });

  it("5.2 should successfully fetch tags for a song", async () => {
    const { data, error } = await getSongTags(songId);

    expect(error).toBeNull();
    expect(data).not.toBeNull();
    expect(data.some((tagData) => tagData.tag === "Pop")).toBe(true);
  });

  it("5.3 should successfully remove a tag from a song", async () => {
    const tag = "Pop";
    const { data, error } = await removeSongTag(songId, tag);

    expect(error).toBeNull();
    expect(data).toBeTruthy();
    expect(data.some((tagData) => tagData.tag === tag)).toBe(true);

    const { data: songTagData } = await getSongTags(songId);
    expect(songTagData.some((tagData) => tagData.tag === tag)).toBe(false);
  });

  it("5.4 should not add a tag to a non-existent song", async () => {
    const nonExistentSongId = "dummy-id";
    const tag = "Rock";
    const { data, error } = await addSongTag(nonExistentSongId, tag);

    expect(data).toBeNull();
    expect(error).toBeTruthy();
  });

  it("5.5 should return an empty array when fetching tags for a song with no tags", async () => {
    // Assuming createSong creates a new song with no tags initially
    const { data: newSongData } = await createSong(
      groupId,
      "New Song",
      "New Artist"
    );
    const newSongId = newSongData.song_id;

    const { data, error } = await getSongTags(newSongId);

    expect(error).toBeNull();
    expect(data).toEqual([]);
  });

  it("5.6 should not remove a non-existent tag from a song", async () => {
    const tag = "NonExistentTag";
    const { data } = await removeSongTag(songId, tag);

    expect(data).toEqual([]);
  });
});
