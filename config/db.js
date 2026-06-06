const mongoose=require('mongoose');
require('dotenv').config();
async function connectDB(){
    try{
        await mongoose.connect(process.env.DB_CODE);
        console.log("Connected to MongoDB");
    }
    catch(error){
        console.error("Error connecting to MongoDB:", error);
    }
}
module.exports=connectDB;