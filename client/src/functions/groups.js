import supabase from "./setup";

export async function createGroup(groupName, avatar) {
	const { error } = await supabase
		.from("groups")
		.insert([{ group_avatar: avatar, group_name: groupName }])
		.select();

	let err = error ? Error(error.message) : null;
	return { data: null, err };
}

export async function getAllGroups() {
	const { data, error } = await supabase.from("groups").select("*");

	let err = error ? Error(error.message) : null;
	return { data, err };
}

export async function getGroup(groupId) {
	const { data, error } = await supabase
		.from("groups")
		.select("*")
		.eq("group_id", groupId)
		.single();

	let err = error ? Error(error.message) : null;
	return { data, err };
}

export const updateGroup = async (groupId, groupName = null, avatar = null) => {
	const updateObject = {};

	if (avatar != null) {
		updateObject["avatar"] = avatar;
	}

	if (groupName != null) {
		updateObject["group_name"] = groupName;
	}

	const { error } = await supabase
		.from("groups")
		.update(updateObject)
		.eq("group_id", groupId);

	let err = error ? Error(error.message) : null;
	return { data: null, err };
};

export const deleteGroup = async (groupId) => {
	const { error } = await supabase
		.from("groups")
		.delete()
		.eq("group_id", groupId);

	let err = error ? Error(error.message) : null;
	return { data: null, err };
};

export const joinGroup = async (userId, groupId) => {
	const { error } = await supabase
		.from("group_members")
		.insert([{ user_id: userId, group_id: groupId }])
		.onConflict(["user_id", "group_id"])
		.ignore();

	if (error) {
		throw error;
	}
};
