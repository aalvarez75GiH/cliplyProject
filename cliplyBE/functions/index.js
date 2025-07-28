/* eslint-disable */
const functions = require("firebase-functions");
const transcriptionsRouter = require("./api/transcription/transcriptions.routes");

exports.transcriptionsEndPoint =
  functions.https.onRequest(transcriptionsRouter);
