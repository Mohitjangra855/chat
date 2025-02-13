const Garage = require("../Model/carModel.js");

module.exports.getCarController = async (req, res) => {
  try {
    const allCars = await Garage.find({});
    res.status(200).json({ success: true, data: allCars });
  } catch (err) {
    res
      .status(404)
      .send({ success: false, message: "something went wrong here!" });
  }
};

module.exports.postCarController = async (req, res) => {
 try{ const { name, hp, price, speed, image } = req.body;
  let Image = image;
  const currentUser = req.user._id;
  const newCar = new Garage({
    name,
    hp,
    price,
    speed,
    Image,
    owner: currentUser,
  });
  await newCar.save();
  res
    .status(200)
    .json({
      success: true,
      message: "successfully saved!",
      carName: newCar.name,
    });}catch(err){
        console.log(err)
        res.status(400).json({success:false,err:err,message:"car data is not saved! try again..."})
    }
};
module.exports.seeCarController = async(req,res)=>{
  try{
    const{ id}= req.params
    console.log(id)
const car = await Garage.findById(id).populate("owner","-password");
res.status(200).json({success:true,message:"car successfully finded",data:car})
  }catch(err){
    console.log(err)
    res.status(400).json({success:false,err:err,message:"Oops, car not found!!"})
}
}