const express = require("express");
const router = express.Router();
const data = require("../data");
const userData = data.users;

router.get("/:id", async (req, res) => {
  try {
    const user = await userData.getUserById(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(404).json({ error: "User not found" });
  }
});

router.get("/", async (req, res) => {
  try {
    const userList = await userData.getAllUsers();
    res.json(userList);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.post("/", async (req, res) => {
  const userInfo = req.body;

  if (!userInfo) {
    res.status(400).json({ error: "You must provide data to create a user" });
    return;
  }

  if (!userInfo.firstName) {
    res.status(400).json({ error: "You must provide a first name" });
    return;
  }

  if (!userInfo.lastName) {
    res.status(400).json({ error: "You must provide a last name" });
    return;
  }

  try {
    const newUser = await userData.addUser(
      userInfo.firstName,
      userInfo.lastName
    );
    res.json(newUser);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.put("/:id", async (req, res) => {
  const userInfo = req.body;

  if (!userInfo) {
    res.status(400).json({ error: "You must provide data to update a user" });
    return;
  }

  if (!userInfo.firstName) {
    res.status(400).json({ error: "You must provide a first name" });
    return;
  }

  if (!userInfo.lastName) {
    res.status(400).json({ error: "You must provide a last name" });
    return;
  }

  try {
    await userData.getUserById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  try {
    const updatedUser = await userData.updateUser(req.params.id, userInfo);
    res.json(updatedUser);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await userData.getUserById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  try {
    await userData.removeUser(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
    return;
  }
});

module.exports = router;
