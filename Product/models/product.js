const { Schema, model } = require("mongoose");

const ItemSchema = new Schema({
  "name": {type: String, unique: true},
  "age": {type: String},
  "price": {type: String},
  "category": {type: String},
  "profit": {type: String},
  "comments": {type: String},
  "first_url": {type: String},
  "second_url": {type: String},
  "userID": {type: String},
  "connect": {type: String},
  "tgStat": { type: Object},
  "status": {type: String},
});

module.exports = model("Item", ItemSchema);
