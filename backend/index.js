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
    res.status(200).send(products);
  }else{
    res.status(404).send("No product found")
  }
})

app.get("/product/:id", async (req, res) => {
  console.log(req.params.id)
  const product = await Product.find({_id:req.params.id})
  if(product.length > 0){
    res.status(200).send(product);
  }else{
    res.status(404).send("No product found")
  }
})

app.put("/product/:id", async (req, res) => {
  const result = await Product.updateOne(
    {_id:req.params.id},
    {$set: req.body} 
  )
  res.send(result)
})

app.delete("/product/:id", async (req, res) => {
  const result = await Product.deleteOne({_id:req.params.id})
  res.send(result)
})

app.listen(3001);
