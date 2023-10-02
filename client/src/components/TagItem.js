import React from "react";
import styles from "@/styles/TagItem.module.css";

const TagItem = ({ tag, onDelete }) => {
	return (
		<span className={styles["tag"]}>
			{tag}
			<button className={styles["delete-tag-button"]} onClick={onDelete}>
				X
			</button>
		</span>
	);
};

export default TagItem;
