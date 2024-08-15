const express = require("express");
const router = express.Router();

const User = require("../models/user");
const { render } = require("ejs");

router.get("/:applicationId", async (req, res) => {
  try {
    const currentUser = await User.findById(req.session.user.id);
    const apps = currentUser.applications;
    res.render("applications/index.ejs", { apps });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});
router.post("/", async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    req.body.date = new Date(req.body.date);
    currentUser.applications.puhs(req.body);
    res.redirect(`/users/${currentUser._id}/applications`);
  } catch (error) {
    res.redirect("/");
  }
});
router.get("/edit", async (req, res, next) => {
  try {
    const currentUser = await User.findById(req.session.user._id);
    const app = currentUser.applications;
    res.render("/applications/edit.ejs", { app });
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

router.get("/new", (req, res) => {
  res.render("applications/new.ejs");
});
module.exports = router;
