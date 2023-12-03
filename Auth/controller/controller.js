const User = require("../models/User");
const Product = require("../../Product/models/product")

class AuthController {
  async autentificate(req, res) {
    try {
      const { telegramId } = req.body;

      const candidate = await User.find({ telegramId });

      if (candidate.length > 0) {
        return res.status(200).json({ candidate: candidate[0] });
      }

      const item = await new User({
        telegramId: telegramId,
        status: "User",
        itemModeration: [],
        itemRejected: [],
        itemSucceffuly: [],
        itemFavorites: [],
      }).save();

      return res.status(200).json({
        created: true,
        item,
      });
    } catch (e) {
      return res
        .status(500)
        .json({ msg: "Internal server error", error: `${e}` });
    }
  }
  async update(req, res) {
    try {
      const { newStatus,telegramId } = req.body;

      const updatedUser = await User.findOneAndUpdate(
        { telegramId },
        { $set: { status: newStatus } },
        { new: true }
      );

      if (updatedUser) {
        return res.status(200).json({ updatedUser });
      } else {
        return res.status(404).json({ msg: "User not found" });
      }
    } catch (e) {
      return res
        .status(500)
        .json({ msg: "Internal server error", error: `${e}` });
    }
  }
  async addItem(req, res) {
    try {
      const { itemArrayName, telegramId, channel } = req.body;
  
      const user = await User.findOne({ telegramId });
  
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }
  
      if (!user[itemArrayName]) {
        return res.status(400).json({ msg: "Invalid array name" });
      }
  
      user[itemArrayName].push(channel);
      await user.save();
  
      return res.status(200).json({
        msg: `Channel added to ${itemArrayName} array for user ${telegramId}`,
        user,
      });
    } catch (e) {
      return res.status(500).json({ msg: "Internal server error", error: `${e}` });
    }
  }
  async getUsers(req, res) {
    const users = await User.find()

    res.status(200).json({users})
  }
  async getUser(req, res) {
    try {
      const {telegramId} = req.query;

      const candidate = await User.find({telegramId: telegramId});

      if (!candidate) {
        res.status(404).json({msg: "User exists"})
      }
      res.status(200).json(candidate)
    } catch(e) {
      res.status(500).json({msg: "Internal server error", error: `${e}`})
    }
  }
  
}

module.exports = new AuthController();