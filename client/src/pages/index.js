import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import Dashboard from "./dashboard";

function Home() {
	const { user } = useContext(UserContext);
	return (
		<div>
			<div>Hello</div>
		</div>
	);
}

export default Home;
