import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Dashboard from "./dashboard";
import Login from "@/components/Login";
import Logout from "@/components/Logout";

function Home() {
	const { user } = useContext(UserContext);
	return <div></div>;
}

export default Home;
