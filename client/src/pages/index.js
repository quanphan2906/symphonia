import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Header from "@/components/Header";
import GroupList from "@/components/groups/GroupList";
import Home from "@/components/Home";

function HomePage() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Header />
      <div style={{ display: "flex" }}>
        {user && <GroupList />}
        <Home />
      </div>
    </div>
  );
}

export default HomePage;
