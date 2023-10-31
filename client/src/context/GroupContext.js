import React, { createContext, useState } from "react";
import {
  createGroup,
  getGroupsByUserId,
  getGroup,
  updateGroup,
  deleteGroup,
} from "@/functions";

export const GroupContext = createContext();

function GroupProvider({ children }) {
  const [groups, setGroups] = useState([]);
  const [currentGroup, setCurrentGroup] = useState(null);

  const handleCreateGroup = async (groupName, avatar) => {
    const { data, error } = await createGroup(groupName, avatar);
    if (!error && data) {
      setGroups((prevGroups) => [...prevGroups, data.group]);
    }
    return { data, error };
  };

  const handleGetGroupsByUserId = async (userId) => {
    const { data, error } = await getGroupsByUserId(userId);
    if (!error) {
      setGroups(data);
      return { success: true };
    }
    return { success: false, error };
  };

  const handleGetGroup = async (groupId) => {
    const { data, error } = await getGroup(groupId);
    if (!error) {
      setCurrentGroup(data);
      return { success: true };
    }
    return { success: false, error };
  };

  const handleUpdateGroup = async (groupId, groupName, avatar) => {
    const { data, error } = await updateGroup(groupId, groupName, avatar);
    if (!error && data) {
      setGroups((prevGroups) =>
        prevGroups.map((group) => (group.group_id === groupId ? data : group))
      );
    }
    return { data, error };
  };

  const handleDeleteGroup = async (groupId) => {
    const { data, error } = await deleteGroup(groupId);
    if (!error) {
      setGroups((prevGroups) =>
        prevGroups.filter((group) => group.group_id !== groupId)
      );
    }
    return { data, error };
  };

  return (
    <GroupContext.Provider
      value={{
        groups,
        currentGroup,
        createGroup: handleCreateGroup,
        getGroupsByUserId: handleGetGroupsByUserId,
        getGroup: handleGetGroup,
        updateGroup: handleUpdateGroup,
        deleteGroup: handleDeleteGroup,
      }}
    >
      {children}
    </GroupContext.Provider>
  );
}

export default GroupProvider;
