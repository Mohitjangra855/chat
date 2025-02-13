const mongoose = require("mongoose");
const initData = require("./data.js");
const Garage = require("../Model/carModel.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/chats";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Garage.deleteMany({});
  const modifiedData = initData.data.map(item => ({
    ...item,  
    owner: "67a9b236b20ac040d9c9be68"  
  }));
  await Garage.insertMany(modifiedData);
  console.log("data was initialized");
};

initDB();
