require('dotenv').config({ path: './info.env' });

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


//cross-origin resourse shear
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/' , (req,res)=>{
    res.sendFile(path.join(__filename + 'index.html'));
});

app.post('/send', (req, res) => {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `New message from ${name}: ${subject}`,
        text: `You have received a new message from your website contact form.\n\n` +
              `Here are the details:\n\n` +
              `Name: ${name}\n` +
              `Email: ${email}\n` +
              `Subject: ${subject}\n` +
              `Message: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Message sent: ' + info.response);
    });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
