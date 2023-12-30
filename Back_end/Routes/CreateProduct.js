const express = require('express');
const router = express.Router();
const Product = require('../Models/Product');
router.post('/CreateProduct', async (req, res) => {
    try {
        const { Name, Discription, Category, price, image, Date } = req.body;

        if (!Name || !Discription || !Category || !price || !image) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        await Product.create({
            Name,
            Discription,
            Category,
            price,
            image,
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/UpdateProduct', async (req, res) => {
    try {
        const { _id, Name, Discription, Category, price, image, Date } = req.body;

        if (!_id) {
            return res.status(400).json({ success: false, error: 'Missing product ID' });
        }

        const updatedProduct = await Product.findOneAndUpdate(
            { _id },
            { Name, Discription, Category, price, image, Date },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        res.json({ success: true, updatedProduct });
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

router.post('/DeleteProduct', async (req, res) => {
    try {
        const { _id } = req.body;

        if (!_id) {
            return res.status(400).json({ success: false, error: 'Missing product ID' });
        }

        const deletedProduct = await Product.findOneAndDelete({ _id });

        if (!deletedProduct) {
            return res.status(404).json({ success: false, error: 'Product not found' });
        }

        res.json({ success: true, deletedProduct });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

module.exports = router;
