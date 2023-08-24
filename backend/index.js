const express = require("express");
const cors = require("cors");
require("./db/config");

const User = require("./db/userSch");
const Product = require("./db/productSch")

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  result.password = '****';
  // delete result.password;
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

app.post("/add-product", async (req, res) => {
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
})

app.get("/products", async (req, res) => {
  let products = await Product.find();
  if(products.length > 0){
    res.send(products);
  }else{
    res.send("No product found")
  }
})

app.listen(3001);
