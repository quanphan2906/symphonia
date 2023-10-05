import supabase from "../src/functions/setup";

export const removeAllUsers = async () => {
	// Fetch all users
	const {
		data: { users },
		error: adminError,
	} = await supabase.auth.admin.listUsers();

	if (adminError) {
		console.error("Error fetching user list:", adminError.message);
		return;
	}

	for (const user of users) {
		const { error: deleteError } = await supabase.auth.admin.deleteUser(
			user.id
		);

		if (deleteError) {
			console.error("Error deleting user:", deleteError.message);
		}
	}

	const { data, error } = await supabase.from("users").select();

	for (const user of data) {
		const { error: truncateError } = await supabase
			.from("users")
			.delete()
			.eq("user_id", user.user_id);

		if (truncateError) {
			console.error(
				"Error truncating 'users' table:",
				truncateError.message
			);
		}
	}
};
