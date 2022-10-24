const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const items = ["Nodejs", "Expressjs", "React"];
const workItems = [];

app.get("/", function (req, res) {
	const day = date.getDate();
	res.render("list", { listTitle: day, newListItems: items });
});

app.post("/", function (req, res) {
	const item = req.body.newItem;

	if (req.body.list === "Work List") {
		workItems.push(item);
		res.redirect("/work");
	} else {
		items.push(item);
		res.redirect("/");
	}
});

app.get("/work", function (req, res) {
	res.render("list", { listTitle: "Work List", newListItems: workItems });
});

const PORT = 3000 || process.env.PORT;
app.listen(PORT, () => console.log("Server running on port " + PORT));
