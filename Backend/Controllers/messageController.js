const Conversation = require("../Model/conversationModel");
const Message = require("../Model/messagesModel");

module.exports.sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: reciverId } = req.params;
    const senderId = req.user._id;
    let chats = await Conversation.findOne({
      participants: { $all: [senderId, reciverId] },
    });

    if (!chats) {
      chats = await new Conversation({
        participants: [senderId, reciverId],
      });
    }
    const newMessage = await new Message({
      senderId,
      reciverId,
      message,
      conversation: chats._id,
    });
    if (newMessage) {
      await chats.message.push(newMessage._id);
    }
    await Promise.all([chats.save(), newMessage.save()]);
    // SOCKET.IO function
    res.status(201).send(newMessage);
  } catch (err) {
    console.log(err);
  }
};

module.exports.getMessage = async (req, res) => {
  try {
    const { id: reciverId } = req.params;
    const senderId = req.user._id;
    const chats = await Conversation.findOne({
      participants:{$all:[senderId,reciverId]}
      
    }).populate("message")
    console.log(chats)
    if(!chats) return res.status(200).send([]);
    const message = chats.message;
    console.log(message)
    res.status(200).send({success:true,message:message})
  } catch (err) {
    res.status(400).send({ success: false, message: err });
  }
};
