require("dotenv").config();

const admin = require("firebase-admin");

let db;
let getAuth;

try {
  const serviceAccount = require("./googleServicesAccountKey.json");

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  getAuth = admin.auth();
  db = admin.firestore();

  console.log("Firebase Admin SDK initialized successfully.");
} catch (error) {
  console.error("Error initializing Firebase Admin SDK:", error.message);
  process.exit(1); // Exit the process if initialization fails
}

module.exports = {
  db,
  getAuth,
  admin,
};

// const functions = require("firebase-functions");
// require("dotenv").config();

// const admin = require("firebase-admin");
// const serviceAccount = require("./googleServicesAccountKey.json");
// // const fcn = functions;
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });

// const getAuth = admin.auth();
// const db = admin.firestore();

// module.exports = {
//   db,
//   getAuth,
//   //   fcn,
//   admin,
// };
