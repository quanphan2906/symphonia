import React, { useState, useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { useRouter } from "next/router";

const Login = () => {
	const router = useRouter();
	const { login } = useContext(UserContext);
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const handleLogin = () => {
		// Simulate login with user credentials
		const userData = { username, password };
		const res = login(userData);
		if (res) {
			router.push("/dashboard");
		}
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>
			<input
				type="password"
				placeholder="Password"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleLogin}>Login</button>
		</div>
	);
};

export default Login;
