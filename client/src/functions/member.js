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

export const inviteMember = async (groupId, email, role) => {
  // Validate input
  if (!groupId || !email) {
    return { data: null, error: Error("Missing required inputs") };
  }

  // Fetch user id and role from session
  const { data: sessionWrapper, error: sessionError } =
    await supabase.auth.getSession();
  if (sessionError) {
    return {
      data: null,
      error: Error("Cannot fetch session:", sessionError.message),
    };
  }

  const currentUserId = sessionWrapper.session.user.id;

  // Check if the current user is the admin of the group
  const { data: membershipData, error: adminCheckError } = await supabase
    .from("memberships")
    .select("role")
    .eq("group_id", groupId)
    .eq("user_id", currentUserId)
    .single();

  if (adminCheckError || !membershipData || membershipData.role !== "admin") {
    return { data: null, error: Error("Only group admins can invite members") };
  }

  // Fetch the user record based on email
  const { data: usersData, error: usersError } = await supabase
    .from("users")
    .select("user_id")
    .eq("email", email)
    .single();

  if (!usersData) {
    return { data: null, error: Error("No user found with provided email") };
  }

  if (usersError) {
    return { data: null, error: Error(usersError.message) };
  }
  const userId = usersData.user_id;

  // Check if user is already a member of the group
  const { data: existingMembership, error: membershipError } = await supabase
    .from("memberships")
    .select("*")
    .eq("group_id", groupId)
    .eq("user_id", userId)
    .single();

  if (existingMembership) {
    return {
      data: null,
      error: Error("User is already a member of the group"),
    };
  }

  // Add user to group with specified role
  const { error: insertError } = await supabase
    .from("memberships")
    .insert([{ user_id: userId, group_id: groupId, role: "member" }]);

  if (insertError) {
    return { data: null, error: Error(insertError.message) };
  }

  return { data: "Successfully invited user to group", error: null };
};
