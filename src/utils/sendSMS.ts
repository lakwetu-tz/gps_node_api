// utils/smsSender.js
import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

const sendSMS = async (phoneNumber: string, message: string) => {
  try {
    const smsResponse = await client.messages.create({
      body: message,
      from: twilioPhoneNumber,
      to: phoneNumber
    });
    console.log("SMS sent successfully:", smsResponse);
    return smsResponse;
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw error;
  }
};

module.exports = sendSMS;
