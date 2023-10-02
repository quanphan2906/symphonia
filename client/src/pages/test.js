import { useEffect } from "react";
import {
	createGroup,
	getAllGroups,
	getGroup,
	updateGroup,
	joinGroup,
	deleteGroup,
} from "@/functions/index";

const logDataAndError = (data, error) => {
	if (error) {
		console.error("Error fetching data:", error);
	} else {
		console.log("Fetched data:", data);
	}
};

const Test = () => {
	return <div>Testing Supabase Client Functions</div>;
};

export default Test;
