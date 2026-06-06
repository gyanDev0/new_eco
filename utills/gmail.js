//create a transport
const nodeMailer=require('nodemailer');
require('dotenv').config();
//create a transport
async function mail(email){
  let transporter= await nodeMailer.createTransport({
    service:'gmail',
    auth:{
      user:process.env.email,
      pass:process.env.APP_PASSWORD
    }
  });

// create a message
const message={
  from: process.env.email, // sender address
    to: email, // list of recipients
    subject: "ACCOUNT CREATION", // subject line
    text: "Hello, your account has been created successfully.", // plain text body
    html: "<b>SUCCESSFUL ACCOUNT CREATION</b>", // HTML body
};
//send mail
await transporter.sendMail(message);
console.log("Email sent successfully");
}
module.exports=mail;