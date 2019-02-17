const admin = require("firebase-admin");
const twilio = require("./twilio");

module.exports = function(req, res) {
  if (!req.body.phone || !req.body.code) {
    return res
      .stauts(422)
      .send({ error: "You must provide a phone number and a code" });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  const code = parseInt(code);
};
