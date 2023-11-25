import React, { useContext } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import { UserContext } from "@/context/UserContext";

import Header from "@/components/Header";
import GroupList from "@/components/groups/GroupList";
import GroupDetails from "@/components/groups/GroupDetails";
import MemberList from "@/components/groups/MemberList";

function GroupPage() {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const groupId = router.query.id;

  // TODO: In all event handlers, need to update database
  // TODO: Use id of the group to fetch group data

  return (
    <div>
      <Header />
      {user && (
        <div style={{ display: "flex", paddingTop: "64px" }}>
          <GroupList />

          <Container>
            <GroupDetails groupId={groupId} />
          </Container>

          <MemberList groupId={groupId} />
        </div>
      )}
    </div>
  );
}

export default GroupPage;
