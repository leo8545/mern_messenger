const mongoose = require("mongoose");
const GroupSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	members: {
		type: [String],
		validate: v => v == null || v.length > 0
	}
});
module.exports = Group = mongoose.model("Group", GroupSchema);
