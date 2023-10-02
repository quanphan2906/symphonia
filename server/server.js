const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);

//route handling
const router = require("./routes/index");
app.use("/api", router);

// Start the Express server
server.listen(3000, () => {
	console.log("Server is running on port 3000");
});
