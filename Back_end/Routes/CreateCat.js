const express = require('express');
const router = express.Router();
const category = require('../Models/Cartegory');
const jwt = require('jsonwebtoken');
router.post('/CreateCat', async (req, res) => {
        try {
            await category.create({
                Name: req.body.Name,
                Discription: req.body.Discription
            });
            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    });
module.exports = router;