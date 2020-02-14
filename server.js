const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
	.connect(
		"mongodb+srv://sharjeel:sYmbolic*9@approck-mai7f.mongodb.net/mern_messenger_db" ||
			"mongodb://localhost/approckmsg",
		{
			useUnifiedTopology: true,
			useNewUrlParser: true,
			useFindAndModify: false,
			useCreateIndex: true,
			useMongoClient: true
		}
	)
	.then(() => console.log("Connected to mongodb"))
	.catch(err => console.log("couldnot connect to mongodb", err));

/**
 * Routes
 */

app.use("/api/users", require("./routes/api/users"));
app.use("/api/messages", require("./routes/api/messages"));

// Serve static assets if in production
// if (process.env.NODE_ENV === "production") {
// 	// Set static folder
// 	app.use(express.static("client/build"));

// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
// 	});
// }

app.listen(port, () => console.log(`Server started at port ${port}`));
