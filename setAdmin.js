const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Replace 'USER_UID_HERE' with the UID of your admin user
admin.auth().setCustomUserClaims("Gawd2TtvGCc7JYmiWDsEHhcII7A3", { admin: true })
  .then(() => {
    console.log("Admin claim set successfully!");
    process.exit();
  })
  .catch((error) => {
    console.error("Error setting admin claim:", error);
  });
