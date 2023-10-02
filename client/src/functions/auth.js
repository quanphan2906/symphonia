import supabase from "./setup";

export const signup = async (email, password, username, userAvatar) => {
	const info = [email, password, username];
	const text = ["email", "password", "username"];
	for (let i = 0; i < info.length; i++) {
		if (!info[i]) {
			return { data: null, error: Error(`Missing ${text[i]}`) };
		}
	}

	// also have to check whether userAvatar is an image object

	const { data: auth, error: authError } = await supabase.auth.signUp({
		email,
		password,
	});

	if (authError) {
		return { data: null, error: Error(authError.message) };
	}

	const userId = auth.user.id;
	const session = { auth };

	const { data: user, error: userError } = await supabase
		.from("users")
		.insert([{ user_id: userId, email, username, user_avatar: userAvatar }])
		.select()
		.limit(1)
		.single();

	if (userError) {
		return { data: null, error: Error(userError.message) };
	}

	return { data: { user, session }, error: null };
};

export const login = async (email, password) => {
	if (!email) {
		return { data: null, error: Error("Missing email") };
	}
	if (!password) {
		return { data: null, error: Error("Missing password") };
	}

	const { data: auth, error: authError } =
		await supabase.auth.signInWithPassword({
			email,
			password,
		});

	if (authError) {
		return { data: null, error: Error(authError.message) };
	}

	const userId = auth.user.id;
	const session = { auth };

	const { data: user, error: userError } = await getUser(userId);

	if (userError) {
		return { data: null, error: Error(userError.message) };
	}

	return { data: { user, session }, error: null };
};

export const logout = async () => {
	const { error } = await supabase.auth.signOut();

	if (error) {
		return { data: null, error: Error(error.message) };
	}

	return { data: "Logged out successfully", error: null };
};

export const getUser = async (userId) => {
	if (!userId) {
		return { data: null, error: Error("Missing user id") };
	}

	const { data: user, error } = await supabase
		.from("users")
		.select("*")
		.eq("user_id", userId)
		.single();

	const err = error ? Error(error.message) : null;
	return { data: user, err };
};

export const getUsersOfGroup = async (groupId) => {
	if (!groupId) {
		return { data: null, error: Error("Missing group id") };
	}

	const { data, error } = await supabase
		.from("group_members")
		.select("user_id")
		.eq("group_id", groupId);

	if (error) {
		return { data: null, error: Error(error.message) };
	}

	const userIds = data.map((item) => item.user_id);

	const { data: usersData, error: usersError } = await supabase
		.from("users")
		.select("*")
		.in("id", userIds);

	if (usersError) {
		return { data: null, error: Error(error.message) };
	}

	return { data: usersData, error: null };
};

export const updateUser = async (
	userId,
	email,
	password,
	username,
	userAvatar
) => {
	const updateObject = {};
	const authObject = {};

	if (email) {
		updateObject["email"] = email;
		authObject["email"] = email;
	}

	if (password) {
		authObject["password"] = password;
	}

	if (username) {
		updateObject["username"] = username;
	}

	if (userAvatar) {
		updateObject["user_avatar"] = userAvatar;
	}

	const { authError } = await supabase.auth.admin.updateUserById(
		userId,
		authObject
	);

	if (authError) {
		return { data: null, error: Error(authError.message) };
	}

	const { error: updateError } = await supabase
		.from("users")
		.update(updateObject)
		.eq("user_id", userId);

	if (updateError) {
		return { data: null, error: Error(updateError.message) };
	}

	return { data: "User updated successfully", error: null };
};

export const deleteUser = async (userId) => {
	if (!userId) {
		return { data: null, error: Error("Missing user id") };
	}

	const { error: authError } = await supabase.auth.admin.deleteUser(userId);

	if (authError) {
		return { data: null, error: Error(authError.message) };
	}

	const { userError } = await supabase
		.from("users")
		.delete()
		.eq("user_id", userId);

	if (userError) {
		return { data: null, error: Error(userError.message) };
	}

	return { data: "Delete successfully", error: null };
};
