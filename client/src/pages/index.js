import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Header from "@/components/Header";
import GroupList from "@/components/groups/GroupList"; // Import GroupList component

function Home() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Header />
      {user && ( // Render GroupList only if the user is logged in
        <div style={{ display: "flex" }}>
          <GroupList />
        </div>
      )}
    </div>
  );
}

export default Home;
