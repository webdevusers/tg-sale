const axios = require("axios");
const Item = require("../models/product");
const moment = require("moment-timezone");

const token = "1ff5fe24c503fad6fc8669120fa0a449";

class ItemController {
  async create(req, res) {
    try {
      const {
        name,
        age,
        price,
        category,
        profit,
        comments,
        first_url,
        second_url,
        userID,
        connect,
        status,
      } = req.body;

      const candidate = await Item.find({ name });

      if (!candidate) {
        res.status(400).json({ msg: "Channel with that name exists" });
      }

      const [stats, avgpostreach, subscribers, er, get, views] = await Promise.all([
        axios.get(
          `https://api.tgstat.ru/channels/stat/?token=${token}&channelId=${name}`
        ),
        axios.get(
          `https://api.tgstat.ru/channels/avg-posts-reach/?token=${token}&channelId=${name}`
        ),
        axios.get(
          `https://api.tgstat.ru/channels/subscribers/?token=${token}&channelId=${name}`
        ),
        axios.get(
          `https://api.tgstat.ru/channels/er/?token=${token}&channelId=${name}`
        ),
        axios.get(
          `https://api.tgstat.ru/channels/get/?token=${token}&channelId=${name}`
        ),
        axios.get(
          `https://api.tgstat.ru/channels/views/?token=${token}&channelId=${name}`
        ),
      ]);
      const filteredData = {
        stat: stats.data.status === "ok" ? stats.data.response : "Exists",
        avg: avgpostreach.data.status === "ok" ? avgpostreach.data : "Exists",
        subs:
          subscribers.data.status === "ok"
            ? subscribers.data.response
            : "Exists",
        er: er.data.status === "ok" ? er.data.response : "Exists",
        get: get.data.status === "ok" ? get.data.response : "Exists",
        views: views.data.status === "ok" ? views.data.response : "Exists"
      };

      const newItem = await new Item({
        name: name,
        age: age,
        price: price,
        category: category,
        profit: profit,
        comments: comments,
        first_url: first_url,
        second_url: second_url,
        userID: userID,
        connect: connect,
        status: status,
        tgStat: {
          filteredData,
        },
      }).save();
      res.status(200).json(newItem);
    } catch (e) {
      res.status(500).json({ msg: "Internal server error", error: `${e}` });
    }
  }
  async getItems(req, res) {
    try {
      const { status } = req.body;

      const channels = await Item.find({ status: status });

      res.status(200).json(channels);
    } catch (e) {
      res.status(500).json({ msg: "Internal server error", error: `${e}` });
    }
  }
  async update(req, res) {
    try {
      const { id, newStatus } = req.body;

      const itemToUpdate = await Item.findById(id);

      if (!itemToUpdate) {
        return res.status(404).json({ msg: "Item not found" });
      }

      itemToUpdate.status = newStatus;
      await itemToUpdate.save();

      res.status(200).json({
        msg: `Status updated to ${newStatus} for item with id ${id}`,
        item: itemToUpdate,
      });
    } catch (e) {
      res.status(500).json({ msg: "Internal server error", error: `${e}` });
    }
  }
  async updateTgStatDataForAllItems() {
    try {
      const items = await Item.find();

      const currentDate = moment().tz("Europe/Kiev");

      const targetTime = currentDate
        .clone()
        .set({ hour: 0, minute: 0, second: 0 });

      const delayPerChannel = 5000;

      for (const item of items) {
        const delay = items.indexOf(item) * delayPerChannel;

        setTimeout(async () => {
          const [stats, avgpostreach, subscribers, er, get, views] = await Promise.all(
            [
              axios.get(
                `https://api.tgstat.ru/channels/stat/?token=${token}&channelId=${item.name}`
              ),
              axios.get(
                `https://api.tgstat.ru/channels/avg-posts-reach/?token=${token}&channelId=${item.name}`
              ),
              axios.get(
                `https://api.tgstat.ru/channels/subscribers/?token=${token}&channelId=${item.name}`
              ),
              axios.get(
                `https://api.tgstat.ru/channels/er/?token=${token}&channelId=${item.name}`
              ),
              axios.get(
                `https://api.tgstat.ru/channels/get/?token=${token}&channelId=${item.name}`
              ),
              axios.get(
                `https://api.tgstat.ru/channels/views/?token=${token}&channelId=${item.name}`
              ),
            ]
          );

          item.tgStat = {
            stat: stats.data.status === "ok" ? stats.data.response : "Exists",
            avg:
              avgpostreach.data.status === "ok" ? avgpostreach.data : "Exists",
            subs:
              subscribers.data.status === "ok"
                ? subscribers.data.response
                : "Exists",
            er: er.data.status === "ok" ? er.data.response : "Exists",
            get: get.data.status === "ok" ? get.data.response : "Exists",
            views: views.data.status === "ok"  ? views.data.response : "Exists",
          };

          await item.save();
        }, delay);
      }
    } catch (e) {
      console.error("Error updating tgstat data:", e);
    }
  }
  async getOneItem(req, res) {
    try {
      const { name } = req.query;

      const itemToSend = await Item.findOne({ name: name });

      if (!itemToSend) {
        return res.status(500).json({ msg: "Channel is not defined" });
      }

      return res.status(200).json(itemToSend);
    } catch (e) {
      return res
        .status(500)
        .json({ msg: "Internal Server Error", error: `${e}` });
    }
  }
  async deleteItem(req, res) {
    const { name } = req.body;
    try {
      const item = await Item.findOne({ name: name });
      if (!item) {
        res.status(404).json({ item, msg: "exists" });
      }
      await item.deleteOne();
      res.status(200).json({ msg: "deleted" });
    } catch (e) {
      res.status(500).json({ msg: "Internal Server Error", error: `${e}` });
    }
  }
}
module.exports = new ItemController();
