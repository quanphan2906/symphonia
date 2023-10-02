const express = require("express");

// Import the endpoint files
const spotifyRoutes = require("./spotifyRoutes");

// Use the endpoint files
const router = require("express").Router();
router.use("/spotify", spotifyRoutes);

module.exports = router;
