const express = require("express");
const router = express.Router();
const Group = require("../../models/Group");
/**
 * @route	POST api/groups/add
 * @desc	Add a group
 * @access	Public
 */

router.post("/add", async (req, res) => {
	const { name, members } = req.body;
	try {
		let r = await Group.create([{ name, members }]);
		return res.send(r);
	} catch (err) {
		return res.send(err);
	}
});

/**
 * @route	GET api/groups
 * @desc	Get all groups
 * @access	Public
 */

router.get("/get/all", async (req, res) => {
	try {
		let r = await Group.find({});
		res.send(r);
	} catch (err) {
		res.send(err);
	}
});

module.exports = router;
