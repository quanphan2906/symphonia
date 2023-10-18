import supabase from "./setup";

export const getMembers = async (groupId) => {
	// Validate input
	if (!groupId) {
		return { data: null, error: Error("Missing group id") };
	}

	// Fetch all user ids in the group
	const { data, error } = await supabase
		.from("memberships")
		.select("user_id")
		.eq("group_id", groupId);

	if (error) {
		return { data: null, error: Error(error.message) };
	}

	const userIds = data.map((item) => item.user_id);

	// Fetch records of users in the group
	const { data: usersData, error: usersError } = await supabase
		.from("users")
		.select("*")
		.in("user_id", userIds);

	if (usersError) {
		return { data: null, error: Error(usersError.message) };
	}

	return { data: usersData, error: null };
};

export const joinGroup = async (groupId) => {
	// Validate input
	if (!groupId) {
		return { data: null, error: Error("Missing group id") };
	}

	//  Fetch user id from session
	const { data: sessionWrapper, error: sessionError } =
		await supabase.auth.getSession();

	if (sessionError) {
		return {
			data: null,
			error: Error("Cannot fetch session:", sessionError.message),
		};
	}

	const userId = sessionWrapper.session.user.id;

	// Add user to group
	const { error: membershipError } = await supabase
		.from("memberships")
		.insert({ user_id: userId, group_id: groupId, role: "member" });

	if (membershipError) {
		return { data: null, error: Error(membershipError.message) };
	}

	return { data: "Successfully join group", error: null };
};
