var admin = require("firebase-admin");

var serviceAccount = require("../../servicekey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://anonymouspace-bc341.firebaseio.com",
});

var db = admin.database();

module.exports = {
  db,
  admin,
};
