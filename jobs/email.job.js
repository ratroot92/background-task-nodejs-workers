/* eslint-disable no-console */
const mailTranports = require('../utils/mailTransport.util');

const emailJobs = {
    sendEmail: async (data) => {
        try {
            // data = { to: 'maliksblr92@gmail.com', subject: 'test', text: 'test' }
            const email = {
                to: process.env.GMAIL_SERVICE_USERNAME,
                subject: data.subject,
                text: data.text,
            };
            const info = await mailTranports.gmailTransport.sendMail(email);
            return { email, info };
        } catch (err) {
            console.log(err.message);
            throw new Error(err.message);
        }
    },
};

module.exports = emailJobs;
