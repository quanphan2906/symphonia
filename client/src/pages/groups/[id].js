import React, { useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";

import Header from "@/components/Header";
import GroupList from "@/components/groups/GroupList"; // Import GroupList component
import GroupDetails from "@/components/groups/GroupDetails";
import Container from "@mui/material/Container";

const GroupPage = () => {
  //   const { user } = useContext(UserContext);
  const user = true;
  const router = useRouter();
  const groupId = router.query.id;

  // TODO: In all event handlers, need to update database
  // TODO: Use id of the group to fetch group data

  return (
    <div>
      <Header />
      {user && (
        <div style={{ display: "flex" }}>
          <GroupList />

          <Container>
            <GroupDetails groupId={groupId} />
          </Container>
        </div>
      )}
    </div>
  );
};

export default GroupPage;
