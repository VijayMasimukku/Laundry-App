const express = require("express");
const userRoutes = require("./routes/user");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const bodyParser=require("body-parser");
app.use(express.json());
mongoose.connect("mongodb+srv://Team15:team15@cluster0.yirhq.mongodb.net/laundry?authSource=admin&replicaSet=atlas-c34egd-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true").then(()=>{console.log("db connected")})
app.use(cors());
app.use(bodyParser());

app.use("/", userRoutes);
app.listen(5000,console.log("server connected")); 




