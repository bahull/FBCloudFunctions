const admin = require("firebase-admin");

module.exports = function(req, res) {
  if (!req.body.phone || !req.body.code) {
    return res
      .stauts(422)
      .send({ error: "You must provide a phone number and a code" });
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  const code = parseInt(req.body.code);

  admin
    .auth()
    .getUser(phone)
    .then(user => {
      const ref = admin.database().ref("users/" + phone);
      ref.on("value", snapshot => {
        ref.off();
        const user = snapshot.val();

        if (user.code !== code || !user.codeValid) {
          return res.status(422).send({ error: "Code not valid" });
        }

        ref.update({ codeValid: false });

        admin
          .auth()
          .createCustomToken(phone)
          .then(token => res.send({ token: token }))
          .catch(err =>
            res.status(422).send({ error: `Error sending token ${err}` })
          );
      });
    })
    .catch(err => {
      res.status(422).send({ error: `Error getting user + ${err}` });
    });
};
