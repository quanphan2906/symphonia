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
	deleteUser,
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
