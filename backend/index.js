const express = require("express");
const cors = require("cors");
require("./db/config");
const mongoose = require('mongoose');
const User = require("./db/userSch");
const Product = require("./db/productSch")

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => { // User Register
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  result.password = '****';
  // delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => { // User Login
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

app.post("/add-product", async (req, res) => { // Product Add
  let product = new Product(req.body);
  let result = await product.save();
  res.send(result);
})

app.get("/products", async (req, res) => { // Product listing
  let products = await Product.find();
  if(products.length > 0){
    res.status(200).send(products);
  }else{
    res.status(404).send("No product found")
  }
})

app.get("/product/search/:query?", async (req, res) => { // Product search API // (?) For optional parameters 
  try{
    const query = req.params.query
    if(!query) {
      return res.status(400).send("Please provide a search query.");
    }

    let searchCondition = {
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { category: { $regex: query, $options: 'i' } },
        { company: { $regex: query, $options: 'i' } },
      ],
    };
     if (!isNaN(query)) {// Check if the query is numeric and search by exact price
      searchCondition.$or.push({ price: Number(query) });
    }
    
    const products = await Product.find(searchCondition);

    if(products.length > 0) {
      return res.status(200).send(products);
    } else{
      return res.status(404).send("No products found matching the search query.")
    }
  } catch (err){
    return res.status(500).send(`Internal Server Error: ${err}`)
  }  
})

app.get("/product/:id", async (req, res) => { // Product search API on ID
  try{
    const id = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(id)) { // checking ID is a valid ObjectId
      return res.status(400).send("Invalid product ID");
    }
    const product = await Product.find({_id:id})
    if(product){
      res.send(product);
    }else{
      res.send("No product found")
    }
  } catch (err){
    res.status(500).send(`Internal Server Error!: ${err}`)
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

app.use((req, res, next) => {
  res.status(404).send("Sorry, the page you're looking for doesn't exist.");
});

app.listen(3001);
