const router = require("express").Router();
const { getUserBySearchController,getCurrentChatters } = require("../Controllers/userController");
const { isLogin } = require("../Middleware/isLogin");
router.get("/search",getUserBySearchController)
router.get("/currentchatters",isLogin,getCurrentChatters)

module.exports = router;
