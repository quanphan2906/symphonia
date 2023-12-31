import {
  createSong,
  getSongsByGroupId,
  updateSong,
  signup,
  createGroup,
  logout,
  searchSongsByName,
} from "../src/functions";
import { removeTestGroups, removeTestUsers, removeTestSongs } from "./helper";

describe("Songs management test suite", () => {
  let groupId;
  let userIds;

  beforeAll(async () => {
    const fakeEmail = "testuser@example.com";
    const fakePassword = "password";
    const fakeUsername = "testuser";
    const fakeUserAvatar = "userAvatar";
    userIds = [];
    const { data } = await signup(
      fakeEmail,
      fakePassword,
      fakeUsername,
      fakeUserAvatar
    );
    userIds.push(data.user.user_id);

    const avatar = "groupAvatar";
    const groupName = "New Group";
    const {
      data: { group },
    } = await createGroup(groupName, avatar);

    groupId = group.group_id;
  }, 15000);

  afterAll(async () => {
    await logout();
    await removeTestSongs(groupId);
    await removeTestGroups([groupId]);
    await removeTestUsers(userIds);
  }, 15000);

  it("4.1 expect errors when no author present", async () => {
    const name = "Song Name";
    const author = "   ";
    const coverImage = "cover.jpg";

    const { data, error } = await createSong(groupId, name, author, coverImage);

    expect(error).toBeTruthy();
    expect(error.message).toMatch(new RegExp("violates check constraint"));
    expect(data).toBeNull();
  });

  it("4.2 expect errors when song name is undefined", async () => {
    const name = undefined;
    const author = "Taylor Swift";
    const coverImage = "cover.jpg";

    const { data, error } = await createSong(groupId, name, author, coverImage);

    expect(error).toBeTruthy();
    expect(error.message).toMatch(new RegExp("violates not-null constraint"));
    expect(data).toBeNull();
  });

  it("4.3 expect errors when group id is empty string", async () => {
    const name = "22";
    const author = "Taylor Swift";
    const coverImage = "cover.jpg";

    const { data, error } = await createSong("   ", name, author, coverImage);

    expect(error).toBeTruthy();
    expect(error.message).toMatch(
      new RegExp("invalid input syntax for type uuid")
    );
    expect(data).toBeNull();
  });

  it("4.4 should successfully create a new song", async () => {
    const name = "Song Name";
    const author = "Song Author";
    const coverImage = "cover.jpg";

    const { data, error } = await createSong(groupId, name, author, coverImage);

    expect(error).toBeNull();
    expect(data).toBeTruthy();
    expect(data.group_id).toBe(groupId);
    expect(data.name).toBe(name);
    expect(data.author).toBe(author);
    expect(data.cover_image).toBe(coverImage);
  });

  it("4.5 should fetch all songs for a group", async () => {
    const name = "Song Name 2";
    const author = "Song Author 2";
    const coverImage = "cover2.jpg";

    await createSong(groupId, name, author, coverImage);

    const { data, error } = await getSongsByGroupId(groupId);

    expect(error).toBeNull();
    expect(data).not.toBeNull();
    expect(data.length).toBe(2);
    expect(data[0].name).toBe("Song Name");
    expect(data[1].name).toBe(name);
  });

  it("4.6 should return error when update a song with dummy song id", async () => {
    const songId = 1;
    const name = "Updated Song Name";
    const author = "Updated Song Author";
    const coverImage = "updated-cover.jpg";

    const { data, error } = await updateSong(songId, name, author, coverImage);

    expect(error).toBeTruthy();
    expect(error.message).toMatch(
      new RegExp("invalid input syntax for type uuid")
    );
    expect(data).toBeNull();
  });

  it("4.7 should update song details", async () => {
    let name = "Song Name 2";
    let author = "Song Author 2";
    let coverImage = "cover2.jpg";

    const { data: song } = await createSong(groupId, name, author, coverImage);

    const songId = song.song_id;
    name = "Updated Song Name";
    author = "Updated Song Author";
    coverImage = "updated-cover.jpg";

    const { data, error } = await updateSong(songId, name, author, coverImage);

    expect(error).toBeNull();
    expect(data).toBeTruthy();
    expect(data.name).toBe(name);
    expect(data.author).toBe(author);
    expect(data.cover_image).toBe(coverImage);
  });

  it("4.8 should return songs that match the search term", async () => {
    // Insert multiple songs into the database
    const songsToCreate = [
      {
        name: "Ephemeral Dawn",
        author: "Celestial Aeon",
        coverImage: "cover1.jpg",
      },
      {
        name: "Dawning Light",
        author: "Luminous Harmony",
        coverImage: "cover2.jpg",
      },
      {
        name: "Twilight Serenade",
        author: "Nightfall Melody",
        coverImage: "cover3.jpg",
      },
    ];

    for (const song of songsToCreate) {
      await createSong(groupId, song.name, song.author, song.coverImage);
    }

    // Search term should match the first two songs
    const searchTerm = "Dawn";
    const { data, error } = await searchSongsByName(groupId, searchTerm);

    expect(error).toBeNull();
    expect(data).not.toBeNull();
    expect(data.length).toBe(2);
    expect(data.some((song) => song.name.includes("Ephemeral Dawn"))).toBe(
      true
    );
    expect(data.some((song) => song.name.includes("Dawning Light"))).toBe(true);
  });
});
