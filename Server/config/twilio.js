
require("dotenv").config();
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const twilio = require("twilio");



const client = twilio(accountSid, authToken);

const sendSMS = async (to, body) => {
    try {
        const message = await client.messages.create({
            body,
            from: process.env.TWILIO_PHONE_NUMBER,
            to
        });
        console.log("SMS sent successfully:", message.sid);
        return message;
    } catch (error) {
        console.error("Error sending SMS:", error);
        throw error;
    }
}

module.exports = sendSMS;