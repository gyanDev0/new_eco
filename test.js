const bcrypt = require('bcrypt');
async function hashPassword(){
  let user="gyana@123"
  let salt=await bcrypt.genSalt(10);
  let hashedPassword=await bcrypt.hash(user,salt);
  console.log("Hashed password:",hashedPassword);
}
hashPassword();
