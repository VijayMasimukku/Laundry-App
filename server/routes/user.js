const express = require("express");
const app=express();
const bodyParser = require('body-parser');
const User = require("../models/UserSchema");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { Router } = require("express");
app.use(bodyParser());

router.post("/signup", async function (req, res) {
  console.log("start..")
  try {
    const { name, email, phone, address, district, state, pincode, password } =
      req.body;
      const exist= await User.findOne({$or:[{email},{phone}]})
        if (exist){
            return res.status(400).send("user Already exist")
        }
      // const user = await User.findOne(email,phone);
    const hashedPassword = await bcrypt.hash(password, 12);
     await User.create({name,email,address,phone,state,district,pincode,password: hashedPassword,
    });
    res.json({
      status: "success",
      message:"registered successfully"
    });
  } catch (e) {
    res.json({
      status: "failed",
      message: e.message,
    });
  }
});

// router.post("/signin", async (req, res) => {
//   console.log("try start")
//   try {
//     const { string, password } = req.body;
//       //  const isemail=string.includes("@");
//       //  const query=isemail ? {"email":string} : {"phone": parseInt(string)}
//     const user = await User.findOne(query);
//     console.log(user)
//     if (!user) {
//       return res.json({
//         status: "failed",
//         message: "Please enter a valid email address or phone number",
//       });
//     }
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.json({
//         status: "failed",
//         message: "Incorrect password",
//       });
//     }
//     const str=String(user._id);
//     const token = jwt.sign(
//       {
//         data: str,
//         exp: Math.floor(Date.now() / 1000) + (60 * 60)
//       },
//       "SECRETKEYTRESDGHU"
//     );
//     res.json({
//       status: "success",
//       resToken: token,
//     });
//   } catch (err) {
//     res.json({
//       status: "failed",
//       message: err.message,
//     });
//   }
// });
router.post('/signin',async (req,res)=>{
  const {email,password}=req.body;
  
  try{
      const {email,password,phone}=req.body;
      const exist=await User.findOne({$or:[{email},{phone}]});
      if(!exist){
       res.status(400).send("User not found")
      }
    
      bcrypt.compare(password, exist.password).then(function(result) {
          if (result){
              let payload={
                  user:{
                      id:exist._id
                  }
              }
              jwt.sign(payload,"jwtscreate",{expiresIn:3600000},(err,token)=>{
                  if(err)throw err
                  return res.json({
                      status:"sucess",
                      message:"login sucessfuly",
                      token
                  })
              })
          }else{
           res.status(400).json({
                  status:"failed",
                  message:"Not authenticated"
              })
          }
      });
  }catch(err){
      return res.status(400).send("password hashin wrong")}
});

module.exports = router;
