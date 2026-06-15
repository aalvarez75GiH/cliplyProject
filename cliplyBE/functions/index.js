/* eslint-disable */
const functions = require("firebase-functions");
const transcriptionsRouter = require("./api/transcription/transcriptions.routes");
const typeMessageRouter = require("./api/type_message/type_message.routes");
const globalOperationsRouter = require("./api/global_operations/global_operations.routes");
const usersRouter = require("./api/users/users.routes");
const usersDataRouter = require("./api/users_data/users_data.routes");

if (process.env.FUNCTIONS_EMULATOR === "true") {
  require("dotenv").config(); // make sure .env is in functions/ working dir
}

exports.transcriptionsEndPoint =
  functions.https.onRequest(transcriptionsRouter);
exports.typeMessageEndPoint = functions.https.onRequest(typeMessageRouter);
exports.globalOperationsEndPoint = functions.https.onRequest(
  globalOperationsRouter
);
// exports.usersEndPoint = functions.https.onRequest(usersRouter);
exports.usersEndPoint = functions
  .runWith({ secrets: ["RSA_PRIVATE_KEY"] }) // 👈 v1 syntax
  .https.onRequest(usersRouter);

exports.usersDataEndPoint = functions.https.onRequest(usersDataRouter);
// exports.globalCategoriesEndPoint = functions.https.onRequest((req, res) => {
//   res.send("Hello from Firebase!");
// });
