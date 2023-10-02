import React, { useState } from "react";
import styles from "@/styles/AddSongForm.module.css";

const AddSongForm = ({ onAddSong }) => {
	const [newSongName, setNewSongName] = useState("");
	const [newArtist, setNewArtist] = useState("");

	const handleSubmit = (event) => {
		event.preventDefault();
		if (newSongName.trim() && newArtist.trim()) {
			const newSong = {
				name: newSongName.trim(),
				artist: newArtist.trim(),
				tags: [],
			};
			onAddSong(newSong);
			setNewSongName("");
			setNewArtist("");
		}
	};

	return (
		<form className={styles["add-song-form"]} onSubmit={handleSubmit}>
			<input
				type="text"
				placeholder="Song Name"
				value={newSongName}
				onChange={(e) => setNewSongName(e.target.value)}
			/>
			<input
				type="text"
				placeholder="Artist"
				value={newArtist}
				onChange={(e) => setNewArtist(e.target.value)}
			/>
			<button type="submit">Add Song</button>
		</form>
	);
};

export default AddSongForm;
