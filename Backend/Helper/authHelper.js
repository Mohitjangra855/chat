const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
module.exports.hashedPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};
module.exports.comparePassword = async (password,hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
module.exports.createToken = async (userId,res)=>{
  const token = await jwt.sign({userId},process.env.JWT_SECRETKEY,{expiresIn:'7d'})
  // console.log(".......",token)
  res.cookie("jwt", token,{
    maxAge:30*24*60*60*1000,
    httpOnly:true,
    sameSite: "Lax",
    secure:process.env.SECURE === "production"


  });
  return token;
}
