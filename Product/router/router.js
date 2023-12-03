const express = require('express');
const controller = require('../controller/controller');

const router = express.Router();

router.post('/create', controller.create)
router.post('/get', controller.getItems)

module.exports = router;