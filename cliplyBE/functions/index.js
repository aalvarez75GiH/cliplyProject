/* eslint-disable */
const functions = require("firebase-functions");
const transcriptionsRouter = require("./api/transcription/transcriptions.routes");
const typeMessageRouter = require("./api/type_message/type_message.routes");
const globalMessagesRouter = require("./api/global_categories/global_categories.routes");
const usersRouter = require("./api/users/users.routes");

exports.transcriptionsEndPoint =
  functions.https.onRequest(transcriptionsRouter);
exports.typeMessageEndPoint = functions.https.onRequest(typeMessageRouter);
exports.globalCategoriesEndPoint =
  functions.https.onRequest(globalMessagesRouter);
exports.usersEndPoint = functions.https.onRequest(usersRouter);
// exports.globalCategoriesEndPoint = functions.https.onRequest((req, res) => {
//   res.send("Hello from Firebase!");
// });
