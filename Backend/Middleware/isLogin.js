const jwt = require("jsonwebtoken");
const User = require("../Model/UserModels");

module.exports.isLogin = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    console.log(req.cookies)
    if (token == undefined || !token ) return res.status(500).send({ message: "User Unauthorize" });
    const decode = jwt.verify(token,process.env.JWT_SECRETKEY);
    if (!decode)
      return res
        .status(500)
        .send({ message: "User Unauthorize - Invalide Token" });
    const user = await User.findById(decode.userId).select("-password");
    if (!user) return res.status(500).send({ message: "User not found!" });
    req.user = user;
    // console.log(user,"..............")
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: err });
  }
};
