const sgMail = require('@sendgrid/mail');
const secureRandomString = require('secure-random-string');
const express = require('express');
const router = express.Router();
const ResetToken = require('../Models/Reset');
const User = require('../Models/User');
const bcrypt = require('bcryptjs');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const A_email = process.env.Email_Address;
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
            
        const resetLink = `https://smart-tech-syyf.vercel.app/reset/${resetToken}`;

        const msg = {
            to: email,
            from: {email : A_email},
            subject: 'Password Reset',
            html: `<!DOCTYPE html>
            <html lang="en">

              <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Password Reset - Smart Tech Electric Store</title>
                <style>
                body {
                font-family: 'Arial', sans-serif;
                background-color: #0d0d0d;
                color: #ffffff;
                margin: 0;
                padding: 0;
                }

            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                }

            .header {
                text-align: center;
                padding: 20px 0;
                }

            .logo {
                max-width: 150px;
                }

            .content {
                text-align: center;
                padding: 20px 0;
                }

            .reset-link {
                background-color: #007BFF;
                color: #ffffff;
                text-decoration: none;
                padding: 10px 20px;
                border-radius: 5px;
                display: inline-block;
                }

        .footer {
            text-align: center;
            padding: 20px 0;
            font-size: 12px;
        }
    </style>
</head>

<body>
    <div class="container">
        <div class="header">
            <img src="https://example.com/smart-tech-logo.png" alt="Smart Tech Electric Store" class="logo">
        </div>
        <div class="content">
            <h2>Password Reset Request</h2>
            <p>Dear User,</p>
            <p>We received a request to reset your password for your Smart Tech Electric Store account. If you did not make this request, you can safely ignore this email.</p>
            <p>To reset your password, please click on the link below:</p>
            <p><a href=`${resetLink}`class="reset-link" target="_blank">Reset Your Password</a></p>
            <p>If the above link does not work, copy and paste the following URL into your browser:</p>
            <p>[${resetLink}]</p>
            <p>Thank you for choosing Smart Tech Electric Store!</p>
        </div>

        <div class="footer">
            <p>© 2024 Smart Tech Electric Store. All rights reserved.</p>
         </div>
       </div>
    </body>`
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
