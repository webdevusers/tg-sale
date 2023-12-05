const express = require('express');
const controller = require('../controller/controller');

const router = express.Router();

router.post('/create', controller.autentificate)
router.put('/update', controller.update)
router.get('/get', controller.getUsers)
router.get('/getuser', controller.getUser)
router.post('/add', controller.addItem)
router.post('/change', controller.moveItemBetweenArrays)

module.exports = router;