const {Schema, model} = require('mongoose')

const User = new Schema({
    telegramId: {type: Number, unique: true},
    status: {type: String},
    itemModeration: {type: Array},
    itemRejected: {type: Array},
    itemSucceffuly: {type: Array},
    itemFavorites: {type: Array}
})

module.exports = model('User', User)