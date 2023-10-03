export {
	createGroup,
	getAllGroups,
	getGroup,
	updateGroup,
	deleteGroup,
	joinGroup,
} from "./groups";
export {
	signup,
	login,
	logout,
	getUser,
	getUsersOfGroup,
	updateUser,
} from "./auth";

// ---------- TEST -----------

import supabase from "./setup";

import {
	createGroup,
	getAllGroups,
	getGroup,
	updateGroup,
	deleteGroup,
	joinGroup,
} from "./groups";

import {
	signup,
	login,
	logout,
	getUser,
	getUsersOfGroup,
	updateUser,
	deleteUser,
} from "./auth";

const logDataAndError = (data, error) => {
	if (error) {
		console.error("Error fetching data:", error);
	} else {
		console.log("Fetched data:", data);
	}
};

async function testGroup() {
	let data, g, error;

	console.log("Calling createGroup");
	({ data, error } = await createGroup("group 1", "this is a new group"));

	if (error) {
		console.error(error);
	}

	({ data, error } = await createGroup(
		"group 2",
		"this is another new group"
	));

	if (error) {
		console.error(error);
	}

	console.log("Calling getAllGroups");
	({ data, error } = await getAllGroups());

	if (error) {
		console.error(error);
	}

	if (data[0].group_name != "group 1") {
		console.error(
			`Error with group_name: ${data[0].group_name} != group 1`
		);
	}
	if (data[0].group_avatar != "this is a new group") {
		console.error(
			`Error with group_avatar: ${data[0].group_avatar} != this is a new group`
		);
	}

	console.log("Calling getGroup");

	const secondGroupId = data[1].group_id;
	({ data: g, error } = await getGroup(secondGroupId));

	if (error) {
		console.error(error);
	}

	if (g.group_name != "group 2") {
		console.error(`Error with group_name: ${g.group_name} != group 2`);
	}
	if (g.group_avatar != "this is another new group") {
		console.error(
			`Error with group_avatar: ${g.group_avatar} != this is another new group`
		);
	}

	console.log("Calling updateGroup");
	({ error } = await updateGroup(secondGroupId, "group 3"));

	({ data: g, error } = await getGroup(secondGroupId));

	if (error) {
		console.error(error);
	}

	if (g.group_name != "group 3") {
		console.error(`Error with group_name: ${g.group_name} != group 3`);
	}

	console.log("Calling deleteGroup");
	for (let group of data) {
		await deleteGroup(group.group_id);
	}

	({ data, error } = await getAllGroups());
	if (data.length > 0) {
		console.error(
			"Delete fail, there are still some groups in the database: " + data
		);
	}

	// TODO: Test joinGroup
}

async function testAuth() {
	let data, error, user, session, userId;

	const fakeEmail = "testuser@example.com";
	const fakePassword = "password";
	const fakeUsername = "testuser";
	const fakeUserAvatar = "userAvatar";

	// Signup
	console.log("Calling signup");
	({ data, error } = await signup(
		fakeEmail,
		fakePassword,
		fakeUsername,
		fakeUserAvatar
	));

	if (error) {
		logDataAndError(data, error);
	} else {
		({ user, session } = data);

		if (user.username != fakeUsername) {
			console.error(
				`Error with user_name: ${user.username} != ${fakeUsername}`
			);
		}
		if (user.user_avatar != fakeUserAvatar) {
			console.error(
				`Error with user_avatar: ${user.user_avatar} != ${fakeUserAvatar}`
			);
		}
	}

	if (error) {
		console.log("Calling login");
		({ data, error } = await login(fakeEmail, fakePassword));
		logDataAndError(data, error);

		if (!error) {
			({ user, session } = data);
		}
	}

	// Get User
	console.log("Calling getUser");
	({ data: user, error } = await getUser(session.access_token, user.user_id));
	if (error) {
		logDataAndError(data, error);
	} else {
		if (user.email != fakeEmail) {
			console.error(`Error with email: ${user.email} != ${fakeEmail}`);
		}
		if (user.username != fakeUsername) {
			console.error(
				`Error with user_name: ${user.username} != ${fakeUsername}`
			);
		}
		if (user.user_avatar != fakeUserAvatar) {
			console.error(
				`Error with user_avatar: ${user.user_avatar} != ${fakeUserAvatar}`
			);
		}
	}

	// Login
	console.log("Calling login");
	({ data, error } = await login(fakeEmail, fakePassword));
	logDataAndError(data, error);

	if (!error) {
		userId = data.user.user_id;
	}

	// Update User
	console.log("Calling updateUser");

	const newfakeEmail = "newemail@example.com";
	const newfakePassword = "newpassword";
	const newfakeUsername = "newusername";
	const newfakeUserAvatar = "newUserAvatar";

	({ data, error } = await updateUser(
		session.access_token,
		userId,
		newfakeEmail,
		newfakePassword,
		null,
		newfakeUserAvatar
	));

	if (error) {
		logDataAndError(data, error);
	} else {
		({ data: user, error } = await getUser(session.access_token, userId));
		if (error) {
			logDataAndError(data, error);
		} else {
			if (user.email != newfakeEmail) {
				console.error(
					`Error with email: ${user.email} != ${newfakeEmail}`
				);
			}
			if (user.username != fakeUsername) {
				console.error(
					`Error with user_name: ${user.username} != ${fakeUsername}`
				);
			}
			if (user.user_avatar != newfakeUserAvatar) {
				console.error(
					`Error with user_avatar: ${user.user_avatar} != ${newfakeUserAvatar}`
				);
			}
		}
	}

	// const userId = data.id;

	// // Get Users of Group
	// // console.log("Calling getUsersOfGroup");
	// // ({ data, error } = await getUsersOfGroup("groupId"));
	// // logDataAndError(data, error);

	// Delete user
	({ data, error } = await deleteUser(session.access_token, user.user_id));
	logDataAndError(data, error);

	// Logout
	console.log("Calling logout");
	({ data, error } = await logout());
	logDataAndError(data, error);
}

async function main() {
	// await testGroup();
	await testAuth();
}

main();
