/* eslint-disable */
const express = () => {
  const express = require("express");
  const cors = require("cors")({ origin: true });
  const morgan = require("morgan");

  const app = express();

  app.use(cors);
  app.use(morgan("combined"));

  return app;
};

module.exports = express;
