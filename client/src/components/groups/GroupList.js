import React, { useState } from "react";
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

const GroupListContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "1rem",
  backgroundColor: "#f0f0f0",
  boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  width: "75px",
  height: "calc(100vh - 64px)",
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
  // color: "#ffffff", // Set text/icon color to white
  // backgroundColor: "#bdbdbd", // Match the background color with GroupAvatar
  // "&:hover": {
  //   backgroundColor: "#3d3d3d", // Slightly darker shade on hover
  // },
});

const dummyGroups = [
  { id: "1", name: "Group 1" },
  { id: "2", name: "Hello" },
  { id: "3", name: "Rock For ever" },
  // ... more dummy groups
];

export default function GroupList() {
  const router = useRouter();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupMembers, setGroupMembers] = useState("");

  const handleGroupClick = (groupId) => {
    router.push(`/groups/${groupId}`);
  };

  const handleDiscoverGroupsClick = () => {
    // ... handle Discover Public Groups action
  };

  const handleAddGroupClick = () => {
    setIsDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleDialogSubmit = () => {
    // Handle form submission, e.g., create group and invite members
    setIsDialogOpen(false);
  };
  return (
    <GroupListContainer>
      {dummyGroups.map((group) => (
        <GroupAvatar key={group.id} onClick={() => handleGroupClick(group.id)}>
          {group.name.charAt(0)}
        </GroupAvatar>
      ))}
      <ButtonContainer>
        <Tooltip title='Add Group' arrow placement='left'>
          <GroupButton onClick={handleAddGroupClick} variant='primaryLight'>
            <AddIcon />
          </GroupButton>
        </Tooltip>
        <Tooltip title='Discover Public Groups' arrow placement='left'>
          <GroupButton onClick={handleDiscoverGroupsClick} variant='primaryLight'>
            <GroupIcon />
          </GroupButton>
        </Tooltip>
      </ButtonContainer>

      <Dialog open={isDialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Create New Group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Group Name'
            type='text'
            fullWidth
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
          <TextField
            margin='dense'
            label='Initial Group Members'
            type='text'
            fullWidth
            placeholder='Enter email addresses separated by commas'
            value={groupMembers}
            onChange={(e) => setGroupMembers(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDialogSubmit} variant='contained' color='primary'>
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </GroupListContainer>
  );
}
