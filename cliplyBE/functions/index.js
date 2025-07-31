/* eslint-disable */
const functions = require("firebase-functions");
const transcriptionsRouter = require("./api/transcription/transcriptions.routes");
const typeMessageRouter = require("./api/type_message/type_message.routes");
exports.transcriptionsEndPoint =
  functions.https.onRequest(transcriptionsRouter);
exports.typeMessageEndPoint = functions.https.onRequest(typeMessageRouter);
