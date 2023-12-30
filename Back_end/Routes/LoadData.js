const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../db');

router.post('/LoadData', async (req, res) => {
    try {
       await connectToDatabase();
        res.json({'Cat':global.catData, 'Product':global.productData});
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
    });
module.exports = router;
