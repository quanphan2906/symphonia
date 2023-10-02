import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";

const Logout = () => {
	const { logout } = useContext(UserContext);

	const handleLogout = () => {
		// Simulate logout
		logout();
	};

	return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
