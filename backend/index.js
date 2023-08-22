const express = require("express");
const cors = require("cors");
require("./db/config");

const User = require("./db/userSch");

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
    console.log(req);
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  result.deleteOne("password")
  res.send(result);
});

app.post("/login", async (req, res) => {
  if(req.body.email && req.body.password){
    let user = await User.findOne(req.body).select("-password");
    if(user){
      res.send(user);
    } else {
      res.status(400).send("User not found");
    }
  } else {
    res.send("Please enter email and password");
  }
});

app.listen(3001);
