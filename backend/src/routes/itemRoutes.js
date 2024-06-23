// src/routes/itemRoutes.js
const express = require('express');
const itemController = require('../controllers/itemController');
const router = express.Router();

router.get('/items', itemController.getAllItems);
router.get('/items/:id', itemController.getItemById);
router.get('/items/:id/parents', itemController.getItemParents);
router.get('/items/:id/children', itemController.getItemChildren);
router.get('/items/:id/paths', itemController.getItemPathsToRoot);
router.post('/items/add', itemController.createItem);
router.put('/items/:id', itemController.updateItem);

module.exports = router;
