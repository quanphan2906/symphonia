import React, { useState } from "react";
import styles from "@/styles/SongItem.module.css";
import TagItem from "./TagItem";

const SongItem = ({ song, onDelete, onAddTag, onDeleteTag }) => {
	const [newTag, setNewTag] = useState("");

	const handleAddTag = () => {
		if (newTag.trim()) {
			onAddTag(song.id, newTag.trim());
			setNewTag("");
		}
	};

	return (
		<li className={styles["song-item"]}>
			<div>
				<strong>{song.name}</strong> - {song.artist}
			</div>
			<div>
				{song.tags.map((tag, index) => (
					<TagItem
						key={index}
						tag={tag}
						onDelete={() => onDeleteTag(song.id, tag)}
					/>
				))}
			</div>
			<div>
				<input
					type="text"
					placeholder="Tag"
					value={newTag}
					onChange={(e) => setNewTag(e.target.value)}
				/>
				<button
					className={styles["add-tag-button"]}
					onClick={handleAddTag}
				>
					Add Tag
				</button>
			</div>
			<button
				className={styles["delete-button"]}
				onClick={() => onDelete(song.id)}
			>
				Delete Song
			</button>
		</li>
	);
};

export default SongItem;
