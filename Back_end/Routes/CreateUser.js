require('dotenv').config();
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs'); // Use bcryptjs instead of bcrypt
const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey;

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
    const tokenHeader = req.header('Authorization');

    if (!tokenHeader) {
        return res.status(401).json({ success: false, error: 'Unauthorized: No token provided' });
    }

    const token = tokenHeader.split(' ')[1];

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).json({ success: false, error: 'Unauthorized: Invalid token' });
        }

        req.userId = decoded.userId;
        req.username = decoded.username;
        next();
    });
};

router.post('/createUser',
    body('email', "Your email is incorrect").isEmail(),
    body('password', "your Password is Incorrect").isLength({ min: 5 }),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        try {
            const hash = bcrypt.hashSync(req.body.password, 15);
            await User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                gender: req.body.gender,
                password: hash
            });
            res.json({ success: true });
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    });

router.post('/login',
    body('email', "Your email is incorrect").isEmail(),
    body('password', "your Password is Incorrect").isLength({ min: 5 }),
    async (req, res) => {
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ errors: result.array() });
        }
        let email = req.body.email;
        try {
            let UserData = await User.findOne({ email });
            if (!UserData) {
                return res.status(400).json({ errors: "Incorrect Email Id" });
            }

            let hash = UserData.password;
            if (bcrypt.compareSync(req.body.password, hash)) {
                const payload = {
                    userId: UserData._id,
                    username: UserData.firstName,
                };

                const options = {
                    expiresIn: '0.5h', // Token expiration time
                    audience: 'SmartTech', // Intended audience
                    issuer: 'AttaUnNabi', // Token issuer
                };

                const secureToken = jwt.sign(payload, secretKey, options);
                res.json({
                    success: true,
                    authToken: secureToken
                });
            } else {
                return res.status(400).json({ errors: "Incorrect Password" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    });

// Endpoint for token verification
router.post('/authCheck', verifyToken, (req, res) => {

    // If the middleware passes, the token is valid
    res.json({ success: true, message: 'Token is valid', user: { userId: req.userId, username: req.username } });
});

module.exports = router;
