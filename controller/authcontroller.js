const bcrypt=require('bcrypt');
let users=require('../models/usermodel');
const jwt=require('jsonwebtoken');
const mail=require('../utills/gmail');
//register route
exports.register=async(req,res)=>{
try{
  //validate user input
  const {username,password,email,role}=req.body;
  if(!username || !password || !email || !role){
    return res.json({message:"All fields are required"});
  }
  //check if user already exists ,useing username as unique identifier.here users is the usermodel imported from models/usermodel.js
  let FindUser=await users.findOne({username});
  if(FindUser){
    return res.json({message:"Username already exists"});
  }
  //hash password before storing in database and then create user and added hashed password to database
 
  let hashedPassword=await bcrypt.hash(password,10);
   //jwt token generation   
  let payload = { username, role };
  let secretkey = process.env.secretkey;
  let token = jwt.sign(payload, secretkey, { expiresIn: '1h' });
  res.status(201).json({ "message": "User registered successfully!", "token": token });
  await users.create({username,password:hashedPassword,email,role});
  await mail(email); // Call the mail function after successful user registration
  res.json({message:"User registered successfully"});
} catch (error) {
  res.json({message:"Error registering user",error:error.message});
}
};
//login route
exports.login=async(req,res)=>{
try{
  const {username,password}=req.body;
  if(!username || !password){
    return res.json({message:"All fields are required"});
  }
  let userDetails=await users.findOne({username});
  if(!userDetails){
    return res.json({message:"Invalid username or password"});
  }
  let checkpassword=await bcrypt.compare(password,userDetails.password);
  if(!checkpassword){
    return res.json({message:"Invalid username or password"});
  }
  
     //iwt verify(token)
    //if token is not valid then throw error"invalid token"
    let tokenx =req.headers.authorization.split(' ')[1];
    let secretkey = process.env.secretkey;
    let verification = jwt.verify(tokenx,secretkey);
    if (!verification) {
      return res.status(400).json({ "error": "Invalid token!" });
    }

    let currentlocation=req.header.location;
    res.status(200).json({ "message": "Login successful!",currentlocation });
} catch (error) {
  res.json({message:"Error logging in",error:error.message});
}
};
