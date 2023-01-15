const express = require("express");
const loginRoute = express.Router();
const { UserModel } = require("../models/user.model");
loginRoute.use(express.json());
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");




loginRoute.post("/login", async (req, res) => {
  const { email, pass } = req.body;

  

  try {
    const isUserpresent = await UserModel.find({ email: email });

    if (isUserpresent.length > 0) {
      bcrypt.compare(pass, isUserpresent[0].pass, (err,result)=>{
        
        const token = jwt.sign({ course: "backend" }, "heroku");
        
        if(err){
            console.log(err)
            res.send({"error":"error  while comparing hashed_pass"})
        }
        else if(result){
            res.send({ msg: "login success", token: token });
        }
        else{
            res.send("Invalid passWord")
        }

       
      });

     
    } else {
      res.send({ error: "no user found" });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "some errror while log-In" });
  }
});

module.exports = {
  loginRoute,
};
