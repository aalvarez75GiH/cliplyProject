/* eslint-disable */
const { v4: uuidv4 } = require("uuid");
const app = require("../../express")();

const usersController = require("./users.controllers");
const globalCategoriesController = require("../global_categories/global_categories.controllers");
const { user } = require("firebase-functions/v1/auth");

//** Getting Category Data by user ID
app.get("/userDataByUserId", (req, res) => {
  const user_id = req.query.user_id;
  (async () => {
    try {
      const user_data_found = await usersController.getUserDataByUserID(
        user_id
      );
      console.log("USER DATA AT ROUTE:", user_data_found);
      user_data_found.length > 0
        ? res.status(200).json(user_data_found)
        : res.status(404).send({ status: "404", msg: "USER DATA NOT FOUND" });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

//******************** POSTS ****************************************
app.post("/", (req, res) => {
  const user_id = uuidv4();
  const isFirstTime = true;
  const user = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    role: req.body.role,
    uid: req.body.uid,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    diaplay_name: req.body.display_name,
    phone_number: req.body.phone_number,
    isFirstTime,
    user_id,
  };
  console.log("USER AT END POINT:", user);
  (async () => {
    try {
      const newUser = await usersController.createUser(user);

      if (newUser) {
        const messages_categories =
          await globalCategoriesController.getAllGlobalCategories();

        const users_data_created =
          await usersController.createUserDataAfterUserCreation(
            newUser.user_id,
            messages_categories
          );
        console.log(
          "USERS DATA CREATED:",
          JSON.stringify(users_data_created, null, 2)
        );
        if (users_data_created.success) {
          res.status(201).json(users_data_created);
        } else {
          res.status(503).send({
            status: "503",
            msg: `USER DATA FOR USER ID ${newUser.user_id} NOT CREATED - SERVER UNAVAILABLE`,
          });
        }
      }
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        status: "Failed",
        msg: "Something went wrong saving Data...",
      });
    }
  })();
});

module.exports = app;
