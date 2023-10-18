import {
	createGroup,
	getGroupsByUserId,
	getGroup,
	updateGroup,
	deleteGroup,
	logout,
	signup,
} from "../src/functions";

import { removeAllGroups, removeAllUsers } from "./helper";

describe("Group Management Functions", () => {
	let userId;

	beforeAll(async () => {
		await removeAllUsers();
		await removeAllGroups();
		const fakeEmail = "testuser@example.com";
		const fakePassword = "password";
		const fakeUsername = "testuser";
		const fakeUserAvatar = "userAvatar";
		const { data, error } = await signup(
			fakeEmail,
			fakePassword,
			fakeUsername,
			fakeUserAvatar
		);

		userId = data.user.user_id;
	}, 10000);

	afterAll(async () => {
		await logout();
		await removeAllUsers();
		await removeAllGroups();
	}, 10000);

	it("3.1 should return an error since group_name is empty", async () => {
		const avatar = "groupAvatar";
		const groupName = "   ";

		const { data, error } = await createGroup(groupName, avatar);
		expect(error).toBeTruthy();
		expect(data).toBeNull();
	});

	it("3.2 should create a new group", async () => {
		const avatar = "groupAvatar";
		const groupName = "New Group";

		const { data, error } = await createGroup(groupName, avatar);
		expect(error).toBeNull();
		expect(data).toBeTruthy();
		expect(data.group.group_name).toBe(groupName);
		expect(data.group.group_avatar).toBe(avatar);
		expect(data.admin.group_id).toBe(data.group.group_id);
		expect(data.admin.user_id).toBe(userId);
		expect(data.admin.role).toBe("admin");
	});

	it("3.3 should return an error when an invalid user ID is provided", async () => {
		const { data, error } = await getGroupsByUserId("non-valid id");
		expect(error).toBeTruthy();
		expect(data).toBeNull();
	});

	it("3.4 should return a list of groups", async () => {
		const avatar = "groupAvatar";
		const groupName = "Different group";

		await createGroup(groupName, avatar);

		const { data, error } = await getGroupsByUserId(userId);
		expect(error).toBeNull();
		expect(Array.isArray(data)).toBe(true);
		expect(data.length).toBeGreaterThanOrEqual(2);
	});

	it("3.5 should return the group", async () => {
		const avatar = "groupAvatar";
		const groupName = "Different group";

		const { data } = await createGroup(groupName, avatar);
		const { data: group, error } = await getGroup(data.group.group_id);
		expect(error).toBeNull();
		expect(group).toBeTruthy();
		expect(group.group_name).toBe(groupName);
	});

	it("3.6 should update an existing group", async () => {
		let avatar = "groupAvatar";
		let groupName = "Different group";

		const {
			data: { group },
		} = await createGroup(groupName, avatar);

		avatar = "newGroupAvatar";
		groupName = "Updated Group";

		const { data, error } = await updateGroup(
			group.group_id,
			groupName,
			avatar
		);

		expect(error).toBeNull();
		expect(data).toBeTruthy();
		expect(data.group_avatar).toBe(avatar);
		expect(data.group_name).toBe(groupName);
	}, 10000);
});
