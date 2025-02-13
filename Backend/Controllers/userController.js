const User = require("../Model/UserModels.js");
const Conversation = require("../Model/conversationModel.js");
module.exports.getUserBySearchController = async (req, res) => {
  try {
    const search = req.query.search || "";
    // const currentUserID = req.user._id;

    const user = await User.find({
      $and: [
        {
          $or: [
            { username: { $regex: ".*" + search + ".*", $options: "i" } },
            { fullname: { $regex: ".*" + search + ".*", $options: "i" } },
          ],
        },
      ],
    })
      .select("-password")
      .select("-email");
    res.status(200).send(user);
  } catch (err) {
    res.status(502).json({
      success: false,
      message: "user not found",
      err: err,
    });
  }
};

module.exports.getCurrentChatters = async (req, res) => {
  try {
    const currentUserID = req.user._id;
    const currentChatters = await Conversation.find({
      participants: currentUserID,
    }).sort({ updatedAt: -1 });
    if (!currentChatters || currentChatters.length === 0)
      return res.json({ success: true, currentChatters: [] });
    const participantsIDS = currentChatters.reduce((ids, conversation) => {
      const otherParticipents = conversation.participants.filter(
        (id) => id !== currentUserID
      );
      return [...ids, ...otherParticipents];
    }, []);
    const otherParticipents = participantsIDS.filter(
      (id) => id.toString() !== currentUserID.toString
    );
    const user = await User.find({ _id: { $in: otherParticipents } })
      .select("-password")
      .select("-email");
    const users = otherParticipents.map((id) =>
      user.find(user=>user._id.toString() === id.toString())
    );
    res.status(200).json({ success: true, users });
  } catch (err) {
    res.status(502).json({
      success: false,
      message: err,
    });
  }
};

// module.exports.getCurrentChatters = async(req,res)=>{
//   const user = req.user._id
//   console.log(user)
//   res.json({message:"working"})
// }