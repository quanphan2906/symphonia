import { validateToken } from "../src/functions/auth";
import {
  signup,
  login,
  logout,
  getUser,
  updateUser,
  deleteUser,
} from "../src/functions";

import { removeTestUsers } from "./helper";

describe("User Management Functions", () => {
  let fakeEmail;
  let fakePassword;
  let fakeUserAvatar;
  let fakeFirstName;
  let fakeLastName;
  let fakeUsername;
  let fakeUserIds;

  beforeAll(async () => {
    fakeEmail = "testuser@example.com";
    fakePassword = "password";
    fakeFirstName = "test";
    fakeLastName = "user";
    fakeUsername = "test user";
    fakeUserAvatar = "userAvatar";
    fakeUserIds = [];
  });

  afterAll(async () => {
    await logout();
    await removeTestUsers(fakeUserIds);
  });

  describe("Signup function", () => {
    it("1.1 should return an error if password is missing", async () => {
      const { data, error } = await signup(
        fakeEmail,
        undefined, // Missing password
        fakeFirstName,
        fakeLastName,
        fakeUserAvatar
      );

      expect(error).toBeTruthy();
      expect(error.message).toBe("Missing password");
      expect(data).toBeNull();
    });

    it("1.2 should successfully register user information", async () => {
      const { data, error } = await signup(
        fakeEmail,
        fakePassword,
        fakeFirstName,
        fakeLastName,
        fakeUserAvatar
      );

      fakeUserIds.push(data.user.user_id);
      expect(error).toBeNull();
      expect(data.user.email).toBe(fakeEmail);
      expect(data.user.username).toBe(`${fakeFirstName} ${fakeLastName}`);
      expect(data.user.user_avatar).toBe(fakeUserAvatar);

      const isTokenValid = await validateToken(data.session.access_token);
      expect(isTokenValid).toBe(true);
    });

    it("1.3 should return an error if the user already has an account", async () => {
      const { data, error } = await signup(
        fakeEmail,
        fakePassword,
        fakeFirstName,
        fakeLastName,
        fakeUserAvatar
      );

      expect(error).toBeTruthy();
      expect(error.message).toBe("User already registered");
      expect(data).toBeNull();
    });
  });

  describe("Login Function", () => {
    it("1.4 should return an error if email is missing", async () => {
      const { data, error } = await login(
        undefined, // Missing email
        fakePassword
      );

      expect(error).toBeTruthy();
      expect(error.message).toBe("Missing email");
      expect(data).toBeNull();
    });

    it("1.5 should return error if no account with provided credentials", async () => {
      const { data, error } = await login(
        "nonexistentemail@gmail.com",
        "fakepassword"
      );

      expect(error).toBeTruthy();
      expect(error.message).toBe("Invalid login credentials");
      expect(data).toBeNull();
    });

    it("1.6 should successfully log user in", async () => {
      const { data, error } = await login(fakeEmail, fakePassword);

      expect(error).toBeNull();
      expect(data).toBeTruthy();
      expect(data.user.username).toBe("test user");
      expect(data.user.user_avatar).toBe("userAvatar");

      const isTokenValid = await validateToken(data.session.access_token);
      expect(isTokenValid).toBe(true);
    });
  });

  describe("After user is logged in", () => {
    let accessToken;
    let userId;
    beforeAll(async () => {
      const { data } = await login(fakeEmail, fakePassword);
      accessToken = data.session.access_token;
      userId = data.user.user_id;
    });

    describe("getUser Function", () => {
      it("2.3 should return matching email, username, and user_avatar", async () => {
        const { data, error } = await getUser(accessToken, userId);

        expect(error).toBeNull();
        expect(data.email).toBe(fakeEmail);
        expect(data.username).toBe("test user");
        expect(data.user_avatar).toBe(fakeUserAvatar);
      });
    });

    describe("updateUser function", () => {
      let altEmail;
      let altUserName;

      beforeAll(async () => {
        altEmail = "existing@gmail.com";
        altUserName = "existing";

        const { data: signupData } = await signup(
          altEmail, // alternative email
          fakePassword,
          altUserName, // alternative username
          fakeUserAvatar
        );

        fakeUserIds.push(signupData.user.user_id);

        const { data } = await login(fakeEmail, fakePassword);
        accessToken = data.session.access_token;
      });

      it("2.4 should return no error when user updates with same email and username as before", async () => {
        const { data, error } = await updateUser(
          fakeEmail,
          undefined,
          fakeUsername,
          undefined
        );

        expect(error).toBeNull();
        expect(data).toBe("User updated successfully");
      });

      it("2.5 should update account information in both Supabase Auth and the database", async () => {
        const { data, error } = await updateUser(
          "new_email@gmail.com",
          undefined,
          "new_username",
          undefined
        );

        expect(error).toBeNull();
        expect(data).toBe("User updated successfully");
      });
    });

    describe("deleteUser", () => {
      it("2.6 should delete the account from both Supabase Auth and the database", async () => {
        const { data, error } = await deleteUser(accessToken, userId);

        expect(error).toBeNull();
        expect(data).toBeTruthy(); // Check for a successful delete response
      });
    });
  });
});
