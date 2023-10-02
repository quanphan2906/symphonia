import React, { useState } from "react";
import styles from "@/styles/FilterPanel.module.css";

const FilterPanel = ({ addedTags, onAddFilter, onDeleteFilter }) => {
	const [inputTag, setInputTag] = useState("");

	const handleInputChange = (event) => {
		setInputTag(event.target.value);
	};

	const handleAddTag = () => {
		if (inputTag.trim()) {
			onAddFilter(inputTag.trim());
			setInputTag("");
		}
	};

	return (
		<div className={styles["filter-panel"]}>
			<div className={styles["added-tags"]}>
				{addedTags.map((tag) => (
					<div key={tag} className={styles["tag"]}>
						{tag}
						<button
							className={styles["delete-tag-button"]}
							onClick={() => onDeleteFilter(tag)}
						>
							X
						</button>
					</div>
				))}
			</div>
			<div className={styles["input-container"]}>
				<input
					type="text"
					value={inputTag}
					onChange={handleInputChange}
					placeholder="Enter tags to filter songs..."
				/>
				<button className={styles["add-button"]} onClick={handleAddTag}>
					Add
				</button>
			</div>
		</div>
	);
};

export default FilterPanel;
