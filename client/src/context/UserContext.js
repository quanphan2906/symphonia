import React, { createContext, useState } from "react";
import { login as supabaseLogin } from "@/functions";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const login = (userData) => {
		// Simulate successful login
		const user = supabaseLogin(userData.username, userData.password);

		if (user) {
			setUser(user);
			return true;
		}

		console.error("User not found");
		return false;
	};

	const logout = () => {
		// Simulate logout
		setUser(null);
	};

	return (
		<UserContext.Provider value={{ user, login, logout }}>
			{children}
		</UserContext.Provider>
	);
};

export default UserProvider;
