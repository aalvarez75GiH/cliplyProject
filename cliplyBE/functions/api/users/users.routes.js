/* eslint-disable */
const { v4: uuidv4 } = require("uuid");
const app = require("../../express")();

const usersController = require("./users.controllers");
const globalOperationsController = require("../global_operations/global_operations.controllers");
const { user } = require("firebase-functions/v1/auth");

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
        const global_operations =
          await globalOperationsController.getAllGlobalOperations();

        const users_data_created =
          await usersController.createUserDataAfterUserCreation(
            newUser.user_id,
            global_operations
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
