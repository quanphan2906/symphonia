import { validateToken } from "../src/functions/auth";
import {
	signup,
	login,
	logout,
	getUser,
	updateUser,
	deleteUser,
} from "../src/functions/index";

import { removeAllUsers } from "./helper";

describe("User Management Functions", () => {
	let user;
	let session;
	let fakeEmail, fakePassword, fakeUserAvatar, fakeUsername;

	beforeAll(async () => {
		await removeAllUsers();
		fakeEmail = "testuser@example.com";
		fakePassword = "password";
		fakeUsername = "testuser";
		fakeUserAvatar = "userAvatar";
	});

	afterAll(async () => {
		await removeAllUsers();
	});

	describe("Signup function", () => {
		it("1.1 should return an error if password is missing", async () => {
			const { data, error } = await signup(
				fakeEmail,
				undefined, // Missing password
				fakeUsername,
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
				fakeUsername,
				fakeUserAvatar
			);

			expect(error).toBeNull();
			expect(data.user.email).toBe(fakeEmail);
			expect(data.user.username).toBe(fakeUsername);
			expect(data.user.user_avatar).toBe(fakeUserAvatar);

			const isTokenValid = await validateToken(data.session.access_token);
			expect(isTokenValid).toBe(true);
		});

		it("1.3 should return an error if the user already has an account", async () => {
			const { data, error } = await signup(
				fakeEmail,
				fakePassword,
				fakeUsername,
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
			expect(data.user.username).toBe("testuser");
			expect(data.user.user_avatar).toBe("userAvatar");

			const isTokenValid = await validateToken(data.session.access_token);
			expect(isTokenValid).toBe(true);
		});
	});

	describe("After user is logged in", () => {
		let accessToken, userId;
		beforeAll(async () => {
			const { data, error } = await login(fakeEmail, fakePassword);
			accessToken = data.session.access_token;
			userId = data.user.user_id;
		});

		describe("getUser Function", () => {
			it("2.1 should return Unauthorized access when calling getUser without access token", async () => {
				const { data, error } = await getUser(undefined, userId);

				expect(error).toBeTruthy();
				expect(error.message).toBe("Missing authentication token");
				expect(data).toBeNull();
			});

			it("2.2 should return Unauthorized access when calling getUser with an incorrect access token", async () => {
				const incorrectAccessToken = "invalid_token";

				const { data, error } = await getUser(
					incorrectAccessToken,
					userId
				);

				expect(error).toBeTruthy();
				expect(error.message).toBe("Unauthorized access");
				expect(data).toBeNull();
			});

			it("2.3 should return matching email, username, and user_avatar when calling getUser with the correct access token", async () => {
				const { data, error } = await getUser(accessToken, userId);

				expect(error).toBeNull();
				expect(data.email).toBe(fakeEmail);
				expect(data.username).toBe(fakeUsername);
				expect(data.user_avatar).toBe(fakeUserAvatar);
			});
		});

		describe("updateUser function", () => {
			let altEmail, altUserName;

			beforeAll(async () => {
				altEmail = "existing@gmail.com";
				altUserName = "existing";

				const { error: signupError } = await signup(
					altEmail, // alternative email
					fakePassword,
					altUserName, // alternative username
					fakeUserAvatar
				);

				if (error) {
					console.log(error);
				}

				const { data, error } = await login(fakeEmail, fakePassword);
				accessToken = data.session.access_token;
				userId = data.user.user_id;
			});

			it("2.4 should return an error when updating username/email to an already used value", async () => {
				const { data, error } = await updateUser(
					accessToken,
					userId,
					"new_email@gmail.com",
					undefined,
					altUserName,
					undefined
				);

				expect(error).toBeTruthy();
				expect(data).toBeNull();
			});

			it("2.5 should return no error when user updates with same email and username as before", async () => {
				const { data, error } = await updateUser(
					accessToken,
					userId,
					fakeEmail,
					undefined,
					fakeUsername,
					undefined
				);

				expect(error).toBeNull();
				expect(data).toBe("User updated successfully");
			});

			it("2.6 should update account information in both Supabase Auth and the database", async () => {
				const { data, error } = await updateUser(
					accessToken,
					userId,
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
			it("2.7 should delete the account from both Supabase Auth and the database", async () => {
				const { data, error } = await deleteUser(accessToken, userId);

				expect(error).toBeNull();
				expect(data).toBeTruthy(); // Check for a successful delete response
			});
		});
	});
});
