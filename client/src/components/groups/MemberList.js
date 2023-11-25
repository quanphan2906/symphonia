import React, { useEffect, useContext, useState } from "react";
import { styled } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { MemberContext } from "@/context/MemberContext";
import Snackbar from "@/components/Snackbar";

const MemberListContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "1rem",
  backgroundColor: "#f0f0f0",
  boxShadow: "2px 0 5px rgba(0,0,0,0.1)",
  width: "75px",
  height: "calc(100vh - 64px)",
  position: "fixed",
  right: "0",
  top: "64px",
});

const MemberAvatar = styled(Avatar)({
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

function MemberList({ groupId }) {
  const { members, getMembers, inviteMember } = useContext(MemberContext);
  const [isInviteDialogOpen, setIsInviteDialogOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      const { error } = await getMembers(groupId);
      if (error) {
        setError(`Error fetching members: ${error.message}`);
      }
    };
    fetchMembers();
  }, [groupId]);

  const handleOpenInviteDialog = () => {
    setIsInviteDialogOpen(true);
  };

  const handleCloseInviteDialog = () => {
    setIsInviteDialogOpen(false);
  };

  const handleInviteSubmit = async () => {
    const { error } = await inviteMember(groupId, email, "member");
    if (error) {
      setError(`Error inviting member: ${error.message}`);
    } else {
      setSuccess("Member Added successfully!");
    }
    setEmail("");
    setIsInviteDialogOpen(false);
  };

  return (
    <MemberListContainer>
      {members.map((member) => (
        <Tooltip
          key={member.user_id}
          title={member.username}
          arrow
          placement="right"
        >
          <MemberAvatar>{member.username.charAt(0).toUpperCase()}</MemberAvatar>
        </Tooltip>
      ))}
      <ButtonContainer>
        <Tooltip title="Add Member" arrow placement="right">
          <GroupButton onClick={handleOpenInviteDialog} variant="primaryLight">
            <AddIcon />
          </GroupButton>
        </Tooltip>
      </ButtonContainer>

      <Dialog open={isInviteDialogOpen} onClose={handleCloseInviteDialog}>
        <DialogTitle>Invite Member</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseInviteDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleInviteSubmit}
            variant="contained"
            color="primary"
          >
            Invite
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar message={error} setMessage={setError} status="error" />
      <Snackbar message={success} setMessage={setSuccess} status="success" />
    </MemberListContainer>
  );
}

export default MemberList;
