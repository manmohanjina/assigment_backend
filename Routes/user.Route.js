const mongoose = require("mongoose");
const express = require("express");
const registerRoute = express.Router();
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
require("dotenv").config();

registerRoute.post("/register", async (req, res) => {
  const { name, email, username, pass } = req.body;
  try {
    bcrypt.hash(pass, +process.env.saltRound, async (err, hashed_pass) => {
      if (err) {
        console.log(err, "ertt");
        res.send({ msg: "error while hashing password try again" });
      } else {
        const newuser = await new UserModel({
          name,
          email,
          username,
          pass: hashed_pass,
        });
        await newuser.save();
        res.send({ msg: "new user added successfully" });
      }
    });
  } catch (err) {
    console.log(err);
    res.send({ error: "not able to create new user" });
  }
});

module.exports = {
  registerRoute,
};

