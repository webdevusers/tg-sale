const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000;

const authRouter = require('./Auth/router/router')
const itemRouter = require('./Product/router/router')

app.use(cors())
app.use(express.json())

app.use('/user', authRouter)
app.use('/item', itemRouter)

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://tgselldb:vyHzInqF6NJEPvvS@tgsell.wlqaemh.mongodb.net/');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (e) {
        console.log(e)
    }
}
start();