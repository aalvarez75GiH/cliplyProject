/* eslint-disable */
// const { v4: uuidv4 } = require("uuid");
const app = require("../../express")();

const users_dataController = require("./users_data.controllers");

// ************************ GETS ******************************
//** Getting a user data by user ID
app.get("/userDataByUserID", (req, res) => {
  const user_id = req.query.user_id;
  (async () => {
    try {
      await users_dataController
        .getUserDataByUserID(user_id)
        .then((user_data) => {
          console.log("USER DATA AT ROUTE:", user_data);
          user_data
            ? res.status(200).json(user_data)
            : res
                .status(404)
                .send({ status: "404", msg: "USER DATA NOT FOUND" });
        });
    } catch (error) {
      return res.status(404).send({
        status: "500",
        msg: error,
      });
    }
  })();
});

// ************************ POSTS ******************************
//** Post a new message at user data by user ID
app.post("/postNewMessageAtUserData", (req, res) => {
  (async () => {
    const new_message_to_add = req.body.new_message;
    const user_id = req.body.user_id;
    const operation_name = req.body.operation_name;
    const status_name = req.body.status_name;
    const updatedUserData =
      await users_dataController.postNewMessageAtUserDataByUserId(
        user_id,
        operation_name,
        status_name,
        new_message_to_add
      );

    // const userData = await users_dataController.getUserDataByUserID(user_id);
    return res.status(201).send({
      status: "Successfully",
      msg: "New message was added",
      userData: updatedUserData,
    });
  })();
});
// ************************ PUTS ******************************
app.put("/updateStoredMessageUsedCount", (req, res) => {
  (async () => {
    const data_needed_to_update_message = {
      user_id: req.body.user_id,
      operation_id: req.body.operation_id,
      status_name: req.body.status_name,
      message_id: req.body.message_id,
    };
    const userDataUpdated = await users_dataController.updatingMessageUsedCount(
      data_needed_to_update_message
    );

    // const userData = await users_dataController.getUserDataByUserID(user_id);
    return res.status(201).send({
      status: "Successfully",
      msg: "Message usedCount was updated",
      userData: userDataUpdated,
    });
  })();
});

// ******************* DELETEs **************************
//** Delete one recent message by user ID and item ID
app.delete("/deleteOneRecentMessageByUserID", async (req, res) => {
  try {
    const data_to_delete = req.body.data_to_delete;
    console.log(
      "DATA TO DELETE AT DELETE RECENT MESSAGE:",
      JSON.stringify(data_to_delete, null, 2)
    );
    if (
      !data_to_delete ||
      !data_to_delete.user_id ||
      !data_to_delete.message_id
    ) {
      return res.status(400).send({
        status: "Failed",
        msg: "Invalid request. 'user_id' and 'item_id' are required.",
      });
    }

    const user_id = data_to_delete.user_id;
    const message_id = data_to_delete.message_id;

    console.log("USER ID AT DELETE RECENT MESSAGE:", user_id);
    console.log("ITEM ID AT DELETE RECENT MESSAGE:", message_id);

    const result = await users_dataController.deleteRecentMessageByUserID(
      user_id,
      message_id
    );
    if (!result || result.status !== "success") {
      return res.status(404).send({
        status: "Failed",
        msg: "No matching record found to delete.",
      });
    }
    if (!result.msg) {
      return res.status(500).send({
        status: "Failed",
        msg: "An error occurred while deleting the recent message.",
      });
    }
    if (result || result.status === "sucesss") {
      console.log("Recent message deleted successfully.");
      return res.status(200).send({
        status: "Successfully",
        msg: "Recent message was deleted successfully.",
      });
    }
  } catch (error) {
    console.error("Error deleting recent message:", error);
    return res.status(500).send({
      status: "Failed",
      msg: "An error occurred while deleting the recent message.",
    });
  }
});
app.delete("/deleteStoredMessageByUserID", async (req, res) => {
  try {
    const data_of_message_to_delete = req.body.specificTextClipData;
    console.log(
      "DATA TO DELETE AT DELETE RECENT MESSAGE:",
      JSON.stringify(data_of_message_to_delete, null, 2)
    );
    if (
      !data_of_message_to_delete ||
      !data_of_message_to_delete.user_id ||
      !data_of_message_to_delete.message_id
    ) {
      return res.status(400).send({
        status: "Failed",
        msg: "Invalid request. 'user_id' and 'item_id' are required.",
      });
    }

    const user_id = data_of_message_to_delete.user_id;
    const message_id = data_of_message_to_delete.message_id;

    console.log("USER ID AT DELETE STORED MESSAGE:", user_id);
    console.log("ITEM ID AT DELETE STORED MESSAGE:", message_id);

    const result = await users_dataController.deletingStoredMessage(
      data_of_message_to_delete
    );

    if (result) {
      console.log("Stored message deleted successfully.");
      return res.status(200).send({
        status: "Successfully",
        msg: "Store message was deleted successfully.",
      });
    }
  } catch (error) {
    console.error("Error deleting stored message:", error);
    return res.status(500).send({
      status: "Failed",
      msg: "An error occurred while deleting the recent message.",
    });
  }
});
module.exports = app;
