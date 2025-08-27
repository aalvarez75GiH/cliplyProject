/* eslint-disable */
const express = require("express");
const app = express();

const globalOperationController = require("./global_operations.controllers");

// ********************************** GETS **********************************

//** Getting all Global categories
app.get("/", (req, res) => {
  (async () => {
    try {
      await globalOperationController
        .getAllGlobalOperations()
        .then((global_operations) => {
          global_operations.length
            ? res.status(200).json(global_operations)
            : res.status(404).send({
                status: "404",
                msg: "GLOBAL OPERATIONS WERE NOT FOUND",
              });
        });
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

// ********************************** POSTS **********************************

app.post("/postGlobalOperations", async (req, res) => {
  const global_operations = req.body.global_operations;

  if (!global_operations || !Array.isArray(global_operations)) {
    return res.status(400).json({ error: "Invalid global_operations format" });
  }

  try {
    // Process each category asynchronously
    await Promise.all(
      global_operations.map(async (operation) => {
        console.log("Processing operation:", operation);
        // Add your async logic here, e.g., saving to Firestore
        await globalOperationController.createGlobalOperation(operation);
      })
    );

    // Send response after all operations are completed
    res.status(200).json({
      status: "Success",
      msg: "GLOBAL OPERATIONS ADDED",
      global_operations,
    });
  } catch (error) {
    // Handle errors and send a single response
    res.status(500).send({
      status: "Failed",
      msg: error.message || "An error occurred",
    });
  }
});

module.exports = app;
