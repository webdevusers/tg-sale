const express = require('express');
const controller = require('../controller/controller');

const router = express.Router();

router.post('/create', controller.create)
router.post('/get', controller.getItems)
router.post('/update', controller.update)

module.exports = router;
