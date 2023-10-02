const express = require("express");
const router = express.Router();

// POST /groups/{group_id}/songs/{song_id}/spotify - Add a song to a Spotify playlist
router.post("/:group_id/songs/:song_id/spotify", (req, res) => {
	// Add your code to handle adding a song to a Spotify playlist
	res.json({ message: "Song added to Spotify playlist successfully" });
});

// PUT /groups/{group_id}/songs/{song_id}/spotify - Update the settings for adding a song to a Spotify playlist
router.put("/:group_id/songs/:song_id/spotify", (req, res) => {
	// Add your code to update the settings for adding a song to a Spotify playlist
	res.json({ message: "Spotify playlist settings updated successfully" });
});

module.exports = router;
