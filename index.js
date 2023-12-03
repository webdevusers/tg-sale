const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 3001;

const authRouter = require('./Auth/router/router')
const itemRouter = require('./Product/router/router')

app.use(cors())
app.use(express.json())

app.use('/user', authRouter)
app.use('/item', itemRouter)

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://developer:a5f2rWpV0IXuCTcM@tgsell.ngapsqp.mongodb.net/');
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (e) {
        console.log(e)
    }
}
start();