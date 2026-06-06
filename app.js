const express=require('express');
require('dotenv').config();
// const products=require('./models/product.model');
const limiter=require('./middlewares/ratelimit');
const connectDB=require('./config/db');
const cors=require('cors');

const app=express();
const PORT=process.env.port;
app.use(express.json());
app.use(cors());
const productroutes = require('./routes/productroute');
const authroutes = require('./routes/authroute');
app.use(limiter);
//custom middleware
app.use(function(req,res,next){
  console.log("middleware executed for every request");
  next();
});
//routes
app.use('/api/products', productroutes);
app.use('/api/auth', authroutes);





//user registration route,

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);     
    connectDB();
})