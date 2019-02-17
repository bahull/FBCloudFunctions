const admin = require("firebase-admin");
const twilio = require("./twilio");

module.exports = function(req, res) {
  if (!req.body.phone) {
    res.stauts(422).send({ error: "You must provide a phone number" });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "");

  admin
    .auth()
    .getUser(phone)
    .then(userRecord => {
      const code = Math.floor(Math.random() * 8999 + 1000);

      twilio.messages.create({
        body: `Your code is ${code}`,
        to: phone,
        from: "+15012224246"
      });
    })
    .then(resp => {
      console.log("I amde it");
      console.log("in the db");
      admin
        .database()
        .ref("users/" + phone)
        .update({ code: code, codeValid: true }, err => {
          return console.log(err, "success on db");
        });
    })
    .catch(err => {
      return res.status(422).send({ error: `${err}: IN THE TWILIO ` });
    });
};
