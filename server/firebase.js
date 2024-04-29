import admin from "firebase-admin";
import serviceAccount from "./serviceAccount.json" assert {type:'json'};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: process.env.BUCKET_URL
});

export default admin;