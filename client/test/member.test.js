import {
  getMembers,
  joinGroup,
  login,
  signup,
  logout,
  createGroup,
} from "../src/functions";
import { removeAllGroups, removeAllUsers } from "./helper";

describe("Group Management Functions", () => {
  let groupId;
  let testEmails;
  let testPasswords;
  let testFirstNames;
  let testLastNames;

  beforeAll(async () => {
    await removeAllUsers();
    await removeAllGroups();

    testEmails = [
      "user1@example.com",
      "user2@example.com",
      "user3@example.com",
    ];
    testPasswords = ["password1", "password2", "password3"];
    testFirstNames = ["user1", "user2", "user3"];
    testLastNames = ["user1", "user2", "user3"];

    for (let i = 0; i < 3; i++) {
      await signup(
        testEmails[i],
        testPasswords[i],
        testFirstNames[i],
        testLastNames[i]
      );
    }

    await login(testEmails[0], testPasswords[0]);

    const avatar = "groupAvatar";
    const groupName = "New Group";
    const { data } = await createGroup(groupName, avatar);
    groupId = data.group.group_id;
  }, 20000);

  afterAll(async () => {
    await logout();
    await removeAllUsers();
    await removeAllGroups();
  }, 20000);

  it("should add the user into group", async () => {
    await login(testEmails[1], testPasswords[1]);
    const { data, error } = await joinGroup(groupId);

    expect(error).toBeNull();
    expect(data).toBe("Successfully join group");
  });

  it("should fetch all users in group", async () => {
    await login(testEmails[1], testPasswords[1]);
    const { data, error } = await getMembers(groupId);

    expect(error).toBeNull();
    expect(data.length).toBe(2);
    expect(data[0].username).toBe(`${testFirstNames[0]} ${testLastNames[0]}`);
    expect(data[1].email).toBe(testEmails[1]);
  });

  it("should not allow users not in group to fetch users in group", async () => {
    await login(testEmails[2], testPasswords[2]);
    const { data, error } = await getMembers(groupId);

    expect(error).toBeNull();
    expect(data.length).toBe(0);
  });
});
