const express = require('express');
const controller = require('../controller/controller');
const cron = require("node-cron");

cron.schedule("0 0 * * *", async () => {
    console.log("Running task to update tgstat data...");
    await controller.updateTgStatDataForAllItems();
  });
const router = express.Router();

router.post('/create', controller.create)
router.post('/get', controller.getItems)
router.post('/update', controller.update)
router.get('/getChannel', controller.getOneItem)
router.delete('/delete', controller.deleteItem)

module.exports = router;