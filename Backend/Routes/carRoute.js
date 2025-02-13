const { getCarController,postCarController,seeCarController } = require("../Controllers/carController");
const { isLogin } = require("../Middleware/isLogin");

const router = require("express").Router();

router.get("/",getCarController)
router.post("/add",isLogin,postCarController)
router.get("/see/:id",seeCarController)


module.exports = router