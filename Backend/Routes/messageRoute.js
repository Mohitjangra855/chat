const { sendMessage,getMessage } = require("../Controllers/messageController");
const { isLogin } = require("../Middleware/isLogin");

const router = require("express").Router();

router.get("/:id",isLogin,getMessage)
router.post("/send/:id",isLogin,sendMessage)

module.exports = router;