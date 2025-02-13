const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/authRoute");
const messageRoute = require("./Routes/messageRoute");
const userRoute = require("./Routes/userRoute");
const carRoute = require("./Routes/carRoute");

const PORT = process.env.PORT;
const URL = process.env.MONGO_URL;

const corsOptions = {
  origin: "http://localhost:3001",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
main()
  .then(() => {
    console.log("connected successfully");
  })
  .catch((err) => {
    console.log("showing this err: ", err);
  });
async function main() {
  await mongoose.connect(`${URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}
app.use("/api/auth/", authRoute);
app.use("/api/message/", messageRoute);
app.use("/api/user/", userRoute);
app.use("/api/cars/", carRoute);
app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
