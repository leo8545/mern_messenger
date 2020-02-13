const mongoose = require("mongoose");
const messageSchema = new mongoose.Schema({
	body: {
		type: String,
		required: true
	},
	from: {
		type: String,
		required: true
	},
	to: {
		type: String
		// required: true
	}
});
module.exports = Message = mongoose.model("Message", messageSchema);
