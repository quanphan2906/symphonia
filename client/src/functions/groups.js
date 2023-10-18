import supabase from "./setup";

export async function createGroup(groupName, avatar) {
	// Validate input
	if (!groupName) {
		return { data: null, error: Error("Missing group name") };
	}

	// Create Group instance
	const { data: group, error: groupError } = await supabase
		.from("groups")
		.insert([{ group_avatar: avatar, group_name: groupName }])
		.select()
		.single();

	if (groupError) {
		return { data: null, error: Error(groupError.message) };
	}

	// Create admin of the group
	const groupId = group.group_id;

	const { data: userWrapper, error: sessionError } =
		await supabase.auth.getUser();
	if (sessionError) {
		return {
			data: null,
			error: Error(sessionError.message),
		};
	}
	const userId = userWrapper.user.id;

	const { error: adminError } = await supabase
		.from("memberships")
		.insert([{ group_id: groupId, user_id: userId, role: "admin" }]);

	if (adminError) {
		return { data: null, error: Error(adminError.message) };
	}

	const { data: admin, error } = await supabase
		.from("memberships")
		.select("*")
		.eq("user_id", userId)
		.eq("group_id", groupId)
		.limit(1)
		.single();

	if (error) {
		return { data: null, error: Error(error.message) };
	}

	return { data: { group, admin }, error: null };
}

export async function getGroupsByUserId(userId) {
	// Validate input
	if (!userId) {
		return { data: null, error: Error("Missing input: userId") };
	}

	const { data: memberships, error: membershipError } = await supabase
		.from("memberships")
		.select("group_id")
		.eq("user_id", userId);

	if (membershipError) {
		return { data: null, error: Error(membershipError.message) };
	}

	// Extract the group IDs from the memberships data
	const groupIds = memberships.map((membership) => membership.group_id);

	// Query the groups table to get group details
	const { data: groups, error: groupError } = await supabase
		.from("groups")
		.select("group_id, group_name, group_avatar")
		.in("group_id", groupIds);

	if (groupError) {
		return { data: null, error: Error(groupError.message) };
	}

	return { data: groups, error: null };
}

export async function getGroup(groupId) {
	// Validate input
	if (!groupId) {
		return { data: null, error: Error("Missing input: groupId") };
	}

	// Fetch the data
	const { data, error } = await supabase
		.from("groups")
		.select("*")
		.eq("group_id", groupId)
		.single();

	return { data, error: error ? Error(error.message) : null };
}

export const updateGroup = async (groupId, groupName = null, avatar = null) => {
	const updateObject = {};

	// Validate input
	if (avatar != null) {
		updateObject["group_avatar"] = avatar;
	}

	if (groupName != null) {
		updateObject["group_name"] = groupName;
	}

	// Update the group record
	const { data, error } = await supabase
		.from("groups")
		.update(updateObject)
		.eq("group_id", groupId)
		.select()
		.single();

	return { data, error: error ? Error(error.message) : null };
};

export const deleteGroup = async (groupId) => {
	const { error } = await supabase
		.from("groups")
		.delete()
		.eq("group_id", groupId);

	let err = error ? Error(error.message) : null;
	return { data: null, err };
};
