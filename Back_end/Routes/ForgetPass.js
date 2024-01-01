const sgMail = require('@sendgrid/mail');
const secureRandomString = require('secure-random-string');
const express = require('express');
const router = express.Router();
const ResetToken = require('../Models/Reset');
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const A_email = process.env.A_email;
// Function to store reset token in the database
const saveResetTokenToDB = async (email, token) => {
    try {
        await ResetToken.create({
            email: email,
            token: token,
        });
    } catch (error) {
        console.error('Error saving reset token to the database:', error);
        throw error;
    }
};

router.post('/ForgetPass', async (req, res) => {
    const { email } = req.body;
    const resetToken = secureRandomString({ length: 32, symbols: false });

    try {
        await saveResetTokenToDB(email, resetToken);

        const resetLink = `https://smart-tech-bm78.vercel.app/${resetToken}`;

        const msg = {
            to: email,
            from: A_email,
            subject: 'Password Reset',
            text: `Click on the following link to reset your password: ${resetLink}`,
            html: `<b>Click on the following link to reset your password:</b><a href="${resetLink}">${resetLink}</a>`
        };

        await sgMail.send(msg);
        console.log('Email sent');
        res.status(200).json({ success: true, message: 'Reset email sent successfully' });
    } catch (error) {
        console.error('Error sending reset email:', error);
        res.status(500).json({ success: false, error: 'Failed to send reset email' });
    }
});

router.post('/reset-password', async (req, res) => {
    const { email, password, token } = req.body;
    try {
        let usr = await ResetToken.findOne({ email, token });
        if (!usr) {
            return res.status(400).json({ errors: "No record found Email Id" });
        }
        try {
            const user = await User.findOneAndUpdate(
                { email },
                {
                    $set: {
                        password: bcrypt.hashSync(password, 15),
                    },
                },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found or invalid token' });
            }

            res.status(200).json({ success: true, message: 'Password reset successful' });
        } catch (error) {
            console.error('Error resetting password:', error);
            res.status(500).json({ success: false, error: 'Internal Server Error' });
        }
    }
    catch (error) {
        console.log(error);
    }

});


module.exports = router;
