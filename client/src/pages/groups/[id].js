import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "@/context/UserContext";
import styles from "@/styles/GroupDetails.module.css";
import SongItem from "@/components/SongItem";
import AddSongForm from "@/components/AddSongForm";
import FilterPanel from "@/components/FilterPanel";
import { updateGroupName } from "@/data/dataFetch";
import { useRouter } from "next/router";

const songsData = [
	{
		id: 1,
		name: "Song 1",
		artist: "Artist 1",
		tags: ["Rock", "Alternative"],
	},
	{ id: 2, name: "Song 2", artist: "Artist 2", tags: ["Pop", "Indie"] },
	{ id: 3, name: "Song 3", artist: "Artist 3", tags: ["Pop", "R&B"] },
];

const GroupDetails = () => {
	const [groupSongs, setGroupSongs] = useState(songsData);
	const [filterTags, setFilterTags] = useState([]);
	const { user } = useContext(UserContext);
	const router = useRouter();
	const groupId = router.query.id;

	// TODO: In all event handlers, need to update database
	// TODO: Use id of the group to fetch group data

	const handleAddSong = (newSong) => {
		setGroupSongs([
			...groupSongs,
			{
				id: groupSongs.length + 1,
				...newSong,
			},
		]);
	};

	const handleDeleteSong = (songId) => {
		setGroupSongs((prevSongs) =>
			prevSongs.filter((song) => song.id !== songId)
		);
	};

	const handleAddTag = (songId, newTag) => {
		setGroupSongs((prevSongs) =>
			prevSongs.map((song) =>
				song.id === songId
					? { ...song, tags: [...song.tags, newTag] }
					: song
			)
		);
	};

	const handleDeleteTag = (songId, tag) => {
		setGroupSongs((prevSongs) =>
			prevSongs.map((song) =>
				song.id === songId
					? { ...song, tags: song.tags.filter((t) => t !== tag) }
					: song
			)
		);
	};

	const handleAddFilter = (tag) => {
		setFilterTags([...filterTags, tag]);
	};

	const handleDeleteFilter = (tag) => {
		setFilterTags((tags) => tags.filter((t) => t !== tag));
	};

	const handleEditGroupName = (newGroupName) => {
		updateGroupName(groupId, newGroupName, user.userId);
	};

	// Filter the songs based on the selected tags
	const filteredSongs =
		filterTags.length == 0
			? groupSongs
			: groupSongs.filter((song) =>
					song.tags.some((tag) => filterTags.includes(tag))
			  );

	return (
		<div className={styles["group-details-container"]}>
			<h2>Group Songs</h2>
			<FilterPanel
				addedTags={filterTags}
				onAddFilter={handleAddFilter}
				onDeleteFilter={handleDeleteFilter}
			/>
			<ul className={styles["song-list"]}>
				{filteredSongs.map((song) => (
					<SongItem
						key={song.id}
						song={song}
						onDelete={handleDeleteSong}
						onAddTag={handleAddTag}
						onDeleteTag={handleDeleteTag}
					/>
				))}
			</ul>
			<AddSongForm onAddSong={handleAddSong} />
		</div>
	);
};

export default GroupDetails;
