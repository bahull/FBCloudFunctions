const admin = require("firebase-admin");
const functions = require("firebase-functions");
const createUser = require("./create_user");
const serviceAccount = require("./service_account.json");
const requestOneTimePassword = require("./request_one_time_password");
const verifyOneTimePassword = require("./verify_one_time_password");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fbcloudfunctions.firebaseio.com"
});

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

exports.createUser = functions.https.onRequest(createUser);

exports.requestOneTimePassword = functions.https.onRequest(
  requestOneTimePassword
);

exports.verifyOneTimePassword = functions.https.onRequest(
  verifyOneTimePassword
);
