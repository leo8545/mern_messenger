const express = require("express");
const router = express.Router();
const User = require("../../models/User");

async function createUser(name, password) {
	return await User.create([{ name, password }]);
}

async function getAllUsers() {
	const filter = {};
	const users = await User.find(filter);
	return users;
}

async function getUserByName(name) {
	const filter = { name };
	const user = await User.find(filter);
	return user;
}

router.get("/", async (req, res) => {
	const users = await getAllUsers();
	res.json(users);
});

router.post("/add", async (req, res) => {
	const { username, password } = req.body;
	try {
		let r = await createUser(username, password);
		return res.send(r);
	} catch (err) {
		return res.send(err);
	}
});

router.post("/login", async (req, res) => {
	const { username, password } = req.body;
	if (!username) return res.send({ error: "Please provide your username" });
	if (!password) return res.send({ error: "Please provide your password" });
	try {
		let r = await getUserByName(username);
		if (!r.length) return res.send({ error: "Username not found" });
		if (r[0].name !== username || r[0].password !== password)
			return res.send({ error: "Wrong username or password." });
		return res.send(r);
	} catch (err) {
		return res.send(err);
	}
});

router.post("/search", async (req, res) => {
	const { search } = req.body;
	try {
		let r = await getUserByName(search);
		return res.send(r);
	} catch (err) {
		return res.send(err);
	}
});

module.exports = router;
