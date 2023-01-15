const express = require("express");
const { authenticate } = require("../midlleware/authenticate");
const todoRoute = express.Router();
todoRoute.use(express.json());
const { TodoModel } = require("../models/todo.model");
const cors = require("cors");
todoRoute.use(cors());

todoRoute.get("/read", async (req, res) => {
  try {
    const data = await TodoModel.find();
    res.send({ data: data });
  } catch (err) {
    console.log(err);
    res.send({ error: "connot read req from server" });
  }
});
todoRoute.get("/read/:id", async (req, res) => {
  const ID = req.params.id;
  try {
    let data = await TodoModel.findOne({ _id: ID });
    res.send({ data: data });
  } catch (err) {
    console.log(err);
    res.send({ error: "error while reading single doc" });
  }
});

todoRoute.use(authenticate);

todoRoute.post("/create", async (req, res) => {
  const { titel, status, userId } = req.body;

  try {
    const payload = await new TodoModel({
      titel,
      status,
      userId,
    });
    await payload.save();
    res.send({ succ: "data updated on server" });
  } catch (error) {
    console.log(error);
    res.send({ error: "server busy canot post data" });
  }
});

// authenticate

todoRoute.patch("/fix/:id", async (req, res) => {
  try {
    const ID = req.params.id;
    const payload = req.body;
    console.log(payload);
    const isFixone = await TodoModel.findOneAndUpdate({ _id: ID }, payload);

    res.send({ msg: "fixComplete" });
  } catch (err) {
    console.log(err);
    res.send({ error: "canont Patch" });
  }
});

todoRoute.delete("/delete/:id", async (req, res) => {
  console.log("helolo");
  try {
    const ID = req.params.id;
    const data = await TodoModel.find({ _id: ID });

    if (data.length > 0 && ID) {
      const findDel = await TodoModel.findByIdAndDelete({ _id: ID });

      res.send({ msg: `item deleted with ${ID}` });
    } else {
      res.send({ anounce: "_id not present" });
    }
  } catch (err) {
    console.log(err);
    res.send({ error: "cannot del the request" });
  }
});

module.exports = {
  todoRoute,
};
