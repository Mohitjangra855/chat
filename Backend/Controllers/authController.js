const {
  createToken,
  hashedPassword,
  comparePassword,
} = require("../Helper/authHelper");
const User = require("../Model/UserModels.js");

module.exports.registerController = async (req, res) => {
  try {
    const { fullname, gender, password, email, username, profilepic } =
      req.body;
    const findUser = await User.findOne({ email });
    // console.log(findUser);
    if (findUser) {
      return res.status(502).json({
        success: false,
        message: "you have already a account exist then go to singup!",
      });
    }

    let profileBoy =
      profilepic ||
      `https://avatar.iran.liara.run/public/boy?username=${username}`;

    let profileGirl =
      profilepic ||
      `https://avatar.iran.liara.run/public/girl?username=${username}`;
    const hashPass = await hashedPassword(password);
    const newUser = new User({
      email,
      username,
      fullname,
      profilepic: gender == "male" ? profileBoy : profileGirl,
      gender,
      password: hashPass,
    });
    console.log(newUser);
    await newUser.save();
   const token = await createToken(newUser._id, res);
    res.status(200).json({
      success: true,
      message: "successfully registered..",
      token,
      fullname: newUser.fullname,
      username: newUser.username,
      email: newUser.email,
      gender: newUser.gender,
      profilepic: newUser.profilepic,
    });
  } catch (err) {
    console.log(err);
    res.status(502).json({
      success: false,
      message: "user not registerd succesfully",
      err: err,
    });
  }
};

module.exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const existUser = await User.findOne({ email });
    if (!existUser) {
      return res.status(502).json({
        success: false,
        message: "you have not account, create a account!",
      });
    }
    const cmpPass = await comparePassword(password, existUser.password);
    if (!cmpPass) {
      return res.status(400).json({
        success: false,
        message: "email or password is wrong, Plz try again!",
      });
    }
    const token = await createToken(existUser._id, res);
    res.status(200).json({
      success: true,
      message: "successfully logged in..",
      token,
      fullname: existUser.fullname,
      username: existUser.username,
      email: existUser.email,
      gender: existUser.gender,
      profilepic: existUser.profilepic,
    });
  } catch (err) {
    console.log(err);
    res.status(502).json({
      success: false,
      message: "user not loged in succesfully",
      err: err,
    });
  }
};

module.exports.logoutController = async (req, res) => {
  try{
    res.cookie("jwt",'',{
      maxAge:0,
     
    });
    res.status(200).json({
      success: true,
      message: "user logout successfully.",
    });

  }catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "user not log out!",
      err: err,
    });
  }
};
