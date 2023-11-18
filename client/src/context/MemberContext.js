import React, { createContext, useState } from "react";
import { getMembers, joinGroup, inviteMember } from "@/functions";

export const MemberContext = createContext();

function MemberProvider({ children }) {
  const [members, setMembers] = useState([]);

  const handleGetMembers = async (groupId) => {
    const { data, error } = await getMembers(groupId);
    if (!error && data) {
      setMembers(data);
    }
    return { data, error };
  };

  const handleJoinGroup = async (groupId) => {
    const { data, error } = await joinGroup(groupId);
    return { data, error };
  };

  const handleInviteMember = async (groupId, email, role) => {
    const { data, error } = await inviteMember(groupId, email, role);
    if (!error) {
      // Optionally, refresh the members list
      await handleGetMembers(groupId);
    }
    return { data, error };
  };

  return (
    <MemberContext.Provider
      value={{
        members,
        getMembers: handleGetMembers,
        joinGroup: handleJoinGroup,
        inviteMember: handleInviteMember,
      }}
    >
      {children}
    </MemberContext.Provider>
  );
}

export default MemberProvider;
