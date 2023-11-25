import React, { useState, useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import GroupIcon from "@mui/icons-material/Group";
import Tooltip from "@mui/material/Tooltip";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import { GroupContext } from "@/context/GroupContext";
import { UserContext } from "@/context/UserContext";
import Snackbar from "@/components/Snackbar";

const GroupListContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "1rem",
  backgroundColor: "#f0f0f0",
  boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  width: "75px",
  height: "calc(100vh - 64px)",
  position: "fixed",
  top: "64px",
});

const GroupAvatar = styled(Avatar)({
  margin: "0.5rem",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#3d3d3d",
  },
});

const ButtonContainer = styled("div")({
  marginTop: "auto",
  width: "100%",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
});

const GroupButton = styled(IconButton)({
  padding: "0",
  margin: "0.5rem",
  width: "40px",
  height: "40px",
  alignSelf: "center",
});

export default function GroupList() {
  const { groups, createGroup, getGroupsByUserId } = useContext(GroupContext);
  const { user } = useContext(UserContext);
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchGroups = async () => {
      const { error } = await getGroupsByUserId(user.user_id);
      if (error) {
        setError(`Error fetching groups: ${error.message}`);
      }
    };

    fetchGroups();
  }, [user.user_id]);

  const handleGroupClick = (groupId) => {
    router.push(`/groups/${groupId}`);
  };

  const handleDiscoverGroupsClick = () => {
    // TODO: handle Discover Public Groups action
  };

  const handleAddGroupClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogSubmit = async () => {
    const { data, error } = await createGroup(groupName, null); // TODO: Add avatar, Assuming no avatar for simplicity
    if (!error && data) {
      setSuccess("Group created successfully");
    } else {
      setError(`Error creating group:${error.message}`);
    }
    setIsDialogOpen(false);
  };

  return (
    <GroupListContainer>
      {groups.map((group) => (
        <Tooltip
          key={group.group_id}
          title={group.group_name}
          arrow
          placement="left"
        >
          <GroupAvatar onClick={() => handleGroupClick(group.group_id)}>
            {group.group_name.charAt(0).toUpperCase()}
          </GroupAvatar>
        </Tooltip>
      ))}
      <ButtonContainer>
        <Tooltip title="Add Group" arrow placement="left">
          <GroupButton onClick={handleAddGroupClick} variant="primaryLight">
            <AddIcon />
          </GroupButton>
        </Tooltip>
        <Tooltip title="Discover Public Groups" arrow placement="left">
          <GroupButton
            onClick={handleDiscoverGroupsClick}
            variant="primaryLight"
          >
            <GroupIcon />
          </GroupButton>
        </Tooltip>
      </ButtonContainer>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Create New Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Group Name"
            type="text"
            fullWidth
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Initial Group Members"
            type="text"
            fullWidth
            placeholder="Enter email addresses separated by commas"
            value={groupMembers}
            onChange={(e) => setGroupMembers(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleDialogSubmit}
            variant="contained"
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar message={error} setMessage={setError} status="error" />
      <Snackbar message={success} setMessage={setSuccess} status="success" />
    </GroupListContainer>
  );
}
