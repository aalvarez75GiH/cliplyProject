/* eslint-disable */
const express = require("express");
const app = express();

const globalCategoryController = require("./global_categories.controllers");

// ********************************** GETS **********************************

//** Getting all Global categories
app.get("/", (req, res) => {
  (async () => {
    try {
      await globalCategoryController
        .getAllGlobalCategories()
        .then((global_categories) => {
          global_categories.length
            ? res.status(200).json(global_categories)
            : res.status(404).send({
                status: "404",
                msg: "GLOBAL CATEGORIES WERE NOT FOUND",
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

app.post("/postGlobalCategories", async (req, res) => {
  const global_categories = req.body.global_categories;

  if (!global_categories || !Array.isArray(global_categories)) {
    return res.status(400).json({ error: "Invalid global_categories format" });
  }

  try {
    // Process each category asynchronously
    await Promise.all(
      global_categories.map(async (category) => {
        console.log("Processing category:", category);
        // Add your async logic here, e.g., saving to Firestore
        await globalCategoryController.createGlobalCategory(category);
      })
    );

    // Send response after all operations are completed
    res.status(200).json({
      status: "Success",
      msg: "GLOBAL CATEGORIES ADDED",
      global_categories,
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
