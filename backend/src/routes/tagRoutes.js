// src/routes/tagRoutes.js
const express = require('express');
const tagController = require('../controllers/tagController');
const router = express.Router();

router.get('/tags', tagController.getAllTags);
router.get('/tags/:id', tagController.getTagById);
router.get('/tags/:id/parents', tagController.getTagParents);
router.get('/tags/:id/children', tagController.getTagChildren);
router.post('/tags', tagController.createTag);
router.put('/tags/:id', tagController.updateTag);

module.exports = router;
