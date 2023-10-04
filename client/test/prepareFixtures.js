import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
	process.env.NEXT_PUBLIC_SUPABASE_URL,
	process.env.NEXT_PUBLIC_SUPABASE_KEY
);

async function prepareTestFixtures() {
	const { data, error } = await supabase.from("users").insert([
		{ user_id: 1, username: "testuser1", email: "testuser1@example.com" },
		{ user_id: 2, username: "testuser2", email: "testuser2@example.com" },
		// Add more test data as needed
	]);

	if (error) {
		throw new Error("Failed to insert test data");
	}
}

module.exports = prepareTestFixtures;
