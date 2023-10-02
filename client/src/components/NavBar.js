import React, { useContext } from "react";
import Link from "next/link";
import { UserContext } from "@/context/UserContext";
import Login from "./Login";
import Logout from "./Logout";

const Navbar = () => {
	const { user } = useContext(UserContext);

	return (
		<nav>
			<ul>
				<li>
					<Link href="/">Home</Link>
				</li>
				<li>
					<Link href="/dashboard">Dashboard</Link>
				</li>
				{user ? (
					<li>
						<Logout />
					</li>
				) : (
					<li>
						<Login />
					</li>
				)}
			</ul>
		</nav>
	);
};

export default Navbar;
