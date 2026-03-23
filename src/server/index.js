// Implement a simple express server in index.js that will respond to requests from “/” path with “Hello World!”
const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.send("Hello world")
});

// now you can open http://localhost:3000 in your browser to see the result
app.listen(port, () => {
    console.log(` Server is running at http://localhost:${port} ⁠`);
});