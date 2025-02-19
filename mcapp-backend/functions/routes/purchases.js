// routes/purchases.js
const express = require('express');
const router = express.Router();
const purchasesController = require('../controllers/purchasesController');

// POST create a new purchase
router.post('/', purchasesController.createPurchase);

module.exports = router;

