const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/', inventoryController.getAllInventory);
router.get('/:code', inventoryController.getInventoryByCode);
router.post('/', inventoryController.createInventoryItem);
router.put('/:code', inventoryController.updateInventoryItem);
router.delete('/:code', inventoryController.deleteInventoryItem);

module.exports = router;
