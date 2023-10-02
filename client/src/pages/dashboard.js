// import React, { useState, useContext, useEffect } from "react";
// import Link from "next/link";
// import styles from "@/styles/Dashboard.module.css";
// import { UserContext } from "@/context/UserContext";
// import { getGroupsForMember, createGroup } from "@/data/dataFetch";

// const Dashboard = () => {
// 	const { user } = useContext(UserContext);
// 	const [groups, setGroups] = useState([]);
// 	const [groupName, setGroupName] = useState("");

// 	// Fetch groups when the component mounts or when the user context changes
// 	useEffect(() => {
// 		if (user) {
// 			const memberGroups = getGroupsForMember(user.userId);
// 			setGroups(memberGroups);
// 		}
// 	}, [user]);

// 	// TODO: Turn this into async
// 	const handleCreateGroup = (event) => {
// 		event.preventDefault();
// 		if (groupName.trim()) {
// 			// Add the new group to the fake database
// 			const newGroup = createGroup(groupName.trim(), user.userId);

// 			// If successful, update the groups state to include the new group
// 			if (newGroup) {
// 				setGroups([...groups, newGroup]);
// 				setGroupName("");
// 			}
// 		}
// 	};

// 	return (
// 		<div className={styles["dashboard-container"]}>
// 			<h1 className={styles["dashboard-title"]}>Dashboard</h1>
// 			<div className={styles["groups-section"]}>
// 				<h2>My Groups</h2>
// 				<ul className={styles["group-list"]}>
// 					{groups.map((group) => (
// 						<Link
// 							href={`/groups/${group.groupId}`}
// 							key={group.groupId}
// 						>
// 							<li className={styles["group-item"]}>
// 								{group.groupName}
// 							</li>
// 						</Link>
// 					))}
// 				</ul>
// 			</div>
// 			<div className={styles["create-group-section"]}>
// 				<h2>Create New Group</h2>
// 				<form
// 					className={styles["create-group-form"]}
// 					onSubmit={handleCreateGroup}
// 				>
// 					<input
// 						className={styles["group-name-input"]}
// 						type="text"
// 						placeholder="Group Name"
// 						value={groupName}
// 						onChange={(e) => setGroupName(e.target.value)}
// 					/>
// 					<button
// 						type="submit"
// 						className={styles["create-group-btn"]}
// 					>
// 						Create Group
// 					</button>
// 				</form>
// 			</div>
// 		</div>
// 	);
// };

// export default Dashboard;
