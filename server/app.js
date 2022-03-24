// const express = require("express");
// const userRoutes = require("./routes/user");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const app = express();
// const bodyParser=require("body-parser");
// app.use(express.json());
// mongoose.connect("mongodb+srv://Team15:team15@cluster0.yirhq.mongodb.net/laundry?authSource=admin&replicaSet=atlas-c34egd-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true").then(()=>{console.log("db connected")})
// app.use(cors());
// app.use(bodyParser());

// app.use("/", userRoutes);
// app.listen(5000,console.log("server connected")); 

const express= require('express');
const mongoose=require('mongoose');
const bodyparser=require('body-parser');
const OrderRoute=require('./routes/Orders');
const Products =require("./models/Product");
const userRoutes = require("./routes/user");
const cors = require("cors");


const app=express()
app.use(bodyparser());
// ...................data base connection............................
mongoose.connect("mongodb+srv://Team15:team15@cluster0.yirhq.mongodb.net/laundry?retryWrites=true&w=majority").then(()=>{console.log("db connected")})

//...................routes ..................
app.use(cors());
app.use(OrderRoute)
app.use("/", userRoutes);
//Insert Product
app.post("/api/v1/insert_product",async(req,res)=>{
    console.log(req.body)
    const product= await Products.create({
        product_name:req.body.product_name,
        product_image:req.body.product_image,
        product_descriptiopn:req.body.product_descriptiopn,
    })
    res.json({
        status: "Product Added successfully",
        product
    })
})

//Get Product
app.get("/api/v1/products", async (req, res) =>{
    const products = await Products.find();
    res.json({
        status: "success",
        products
    });
})


app.listen(3000,()=>{
    console.log("server is listening")
})


