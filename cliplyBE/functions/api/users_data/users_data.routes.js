/* eslint-disable */
// const { v4: uuidv4 } = require("uuid");
const app = require("../../express")();
const users_dataController = require("./users_data.controllers");

//** Getting all Category List
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

// ******************* DELETEs **************************

app.delete("/deleteOneRecentMessageByUserID", async (req, res) => {
  try {
    const data_to_delete = req.body.data_to_delete;
    console.log(
      "DATA TO DELETE AT DELETE RECENT MESSAGE:",
      JSON.stringify(data_to_delete, null, 2)
    );
    if (!data_to_delete || !data_to_delete.user_id || !data_to_delete.item_id) {
      return res.status(400).send({
        status: "Failed",
        msg: "Invalid request. 'user_id' and 'item_id' are required.",
      });
    }

    const user_id = data_to_delete.user_id;
    const item_id = data_to_delete.item_id;

    console.log("USER ID AT DELETE RECENT MESSAGE:", user_id);
    console.log("ITEM ID AT DELETE RECENT MESSAGE:", item_id);

    const result = await users_dataController.deleteRecentMessageByUserID(
      user_id,
      item_id
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
module.exports = app;
