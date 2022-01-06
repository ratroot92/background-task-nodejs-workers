const nodemailer = require('nodemailer');

const mailTransports = {

    gmailTransport: nodemailer.createTransport({
        port: process.env.GMAIL_SERVICE_PORT, // true for 465, false for other ports
        host: process.env.GMAIL_SERVICE_HOST,
        auth: {
            user: process.env.GMAIL_SERVICE_USERNAME,
            pass: process.env.GMAIL_SERVICE_PASSWORD,
        },
        secure: process.env.GMAIL_SERVICE_SECURE,
    }),
};

module.exports = mailTransports;
