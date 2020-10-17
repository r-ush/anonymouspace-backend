var admin = require("firebase-admin");

// var serviceAccount = require("../../servicekey.json");
console.log(process.env.private_key_id);
admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "anonymouspace-bc341",
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key,
    client_email:
      "firebase-adminsdk-sdqz9@anonymouspace-bc341.iam.gserviceaccount.com",
    client_id: "106309187996855080331",
    auth_uri: process.env.auth_uri,
    token_uri: process.env.token_uri,
    auth_provider_x509_cert_url: process.env.auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.client_x509_cert_url,
  }),
  databaseURL: "https://anonymouspace-bc341.firebaseio.com",
});

var db = admin.database();
var ref = db.ref("/");

module.exports = {
  db,
  admin,
  ref,
};
