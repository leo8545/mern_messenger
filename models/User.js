const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
		lowercase: true
	},
	password: {
		type: String,
		required: true
	}
});
module.exports = User = mongoose.model("User", userSchema);
