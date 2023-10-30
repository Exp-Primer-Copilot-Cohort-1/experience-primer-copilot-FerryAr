// Create web server
// Load modules
var express = require("express");
var bodyParser = require("body-parser");
var fs = require("fs");
var app = express();
// Set port
var port = process.env.PORT || 3000;
// Set static folder
app.use(express.static(__dirname + "/public"));
// Use body parser
app.use(bodyParser.urlencoded({ extended: true }));
// Set views folder
app.set("views", __dirname + "/views");
// Set view engine
app.set("view engine", "ejs");
// Set routes
app.get("/", function(req, res) {
    // Read comments from file
    fs.readFile("comments.json", function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send("Error reading comments file");
            return;
        }
        // Convert to JSON
        var comments = JSON.parse(data);
        // Render comments
        res.render("comments", { comments: comments });
    });
});
app.post("/new", function(req, res) {
    // Read comments from file
    fs.readFile("comments.json", function(err, data) {
        if (err) {
            console.log(err);
            res.status(500).send("Error reading comments file");
            return;
        }
        // Convert to JSON
        var comments = JSON.parse(data);
        // Add new comment
        comments.push(req.body);
        // Write comments to file
        fs.writeFile("comments.json", JSON.stringify(comments), function(err) {
            if (err) {
                console.log(err);
                res.status(500).send("Error writing comments file");
                return;
            }
            // Render comments
            res.render("comments", { comments: comments });
        });
    });
});
// Start server
app.listen(port, function() {
    console.log("Listening on port " + port);
});