import supabase from "./setup";

export const signup = async (email, password, username, userAvatar) => {
	// Validate input
	const info = [email, password, username];
	const text = ["email", "password", "username"];
	for (let i = 0; i < info.length; i++) {
		if (!info[i]) {
			return { data: null, error: Error(`Missing ${text[i]}`) };
		}
	}

	// TODO: also have to check whether userAvatar is an image object

	// Sign up users with Supabase Auth
	const { data: auth, error: authError } = await supabase.auth.signUp({
		email,
		password,
	});

	if (authError) {
		return { data: null, error: Error(authError.message) };
	}

	const userId = auth.user.id;
	const session = { auth };

	// Add user to database
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
	// Validate input
	if (!email) {
		return { data: null, error: Error("Missing email") };
	}
	if (!password) {
		return { data: null, error: Error("Missing password") };
	}

	// Log user in with Supabase Auth
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

	// Fetch user record from database
	const { data: user, error: userError } = await getUser(userId);

	if (userError) {
		return { data: null, error: Error(userError.message) };
	}

	return { data: { user, session }, error: null };
};

export const logout = async () => {
	// Log user out with Supabase Auth.
	// Nothing to do with database
	const { error } = await supabase.auth.signOut();

	if (error) {
		return { data: null, error: Error(error.message) };
	}

	return { data: "Logged out successfully", error: null };
};

export const getUser = async (userId) => {
	// Validate input
	if (!userId) {
		return { data: null, error: Error("Missing user id") };
	}

	// Fetch user record from database
	const { data: user, error } = await supabase
		.from("users")
		.select("*")
		.eq("user_id", userId)
		.single();

	const err = error ? Error(error.message) : null;
	return { data: user, err };
};

export const getUsersOfGroup = async (groupId) => {
	// Validate input
	if (!groupId) {
		return { data: null, error: Error("Missing group id") };
	}

	// Fetch all user ids in the group
	const { data, error } = await supabase
		.from("group_members")
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
	// Construct objects that contain information needed to be updated
	const updateObject = {}; // update to database
	const authObject = {}; // update to Supabase Auth

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

	// Update user info in Supabase Auth
	const { authError } = await supabase.auth.admin.updateUserById(
		userId,
		authObject
	);

	if (authError) {
		return { data: null, error: Error(authError.message) };
	}

	// Update user info in database
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
	// Validate input
	if (!userId) {
		return { data: null, error: Error("Missing user id") };
	}

	// Delete user from Supabase Auth
	const { error: authError } = await supabase.auth.admin.deleteUser(userId);

	if (authError) {
		return { data: null, error: Error(authError.message) };
	}

	// Delete user from database
	const { userError } = await supabase
		.from("users")
		.delete()
		.eq("user_id", userId);

	if (userError) {
		return { data: null, error: Error(userError.message) };
	}

	return { data: "Delete successfully", error: null };
};
