const twilio = require("twilio");
const { accountSID, authToken } = require("./twilio_service");

module.exports = new twilio.Twilio(accountSID, authToken);
