const express = require("express");
const router = express.Router();
const Message = require("../../models/Message");

async function createMessage(body, from, to) {
	return await Message.create([{ body, from, to }]);
}

async function getMessages(from, to) {
	if (to === "") to = "all";
	const messages = await Message.find().or([
		{ from: from, to: to },
		{ from: to, to: from }
	]);
	return messages;
}

async function getMessagesToAll() {
	const messages = await Message.find({ to: "all" });
	return messages;
}

router.post("/add", async (req, res) => {
	let { body, from, to } = req.body;
	if (to === "") {
		to = "all";
	}
	try {
		let r = await createMessage(body, from, to);
		return res.send(r);
	} catch (err) {
		return res.send(err);
	}
});

router.post("/", async (req, res) => {
	const { from, to } = req.body;
	try {
		let r = await getMessages(from, to);
		return res.send(r);
	} catch (err) {
		return res.send(err);
	}
});

router.post("/get/all", async (req, res) => {
	try {
		let r = await getMessagesToAll();
		return res.send(r);
	} catch (err) {
		return res.send(err);
	}
});
module.exports = router;
