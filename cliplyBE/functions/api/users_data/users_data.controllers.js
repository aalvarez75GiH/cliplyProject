/* eslint-disable */
const { db } = require("../../fb");

const getUserDataByUserID = async (user_id) => {
  let found_userData;
  await db
    .collection("users_data")
    .where("user_id", "==", user_id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        found_userData = doc.data();
      });
    });
  // console.log("CATEGORY LIST AT CONTROLLER:", found_categoryList);
  return found_userData;
};

const postNewMessageAtUserDataByUserId = async (
  user_id,
  operation_name,
  status_name,
  new_message_to_add
) => {
  try {
    const userDataToWorkOn = await getUserDataByUserID(user_id);
    // console.log(
    //   "USER DATA TO WORK ON:",
    //   JSON.stringify(userDataToWorkOn, null, 2)
    // );
    const ops = userDataToWorkOn.global_operations.map((op) => {
      if (op.operation_name === operation_name) {
        const updated_statuses = op.statuses.map((st) => {
          if (st.status_name === status_name) {
            console.log("STATUS TO UPDATE:", JSON.stringify(st, null, 2));
            const updated_messages = [
              new_message_to_add,
              ...st.stored_messages,
            ];
            return { ...st, stored_messages: updated_messages };
          }
          return st;
        });
        return { ...op, statuses: updated_statuses };
      }
      return op;
    });
    const updatedUserData = {
      ...userDataToWorkOn,
      global_operations: ops,
    };
    await updateUserData(user_id, updatedUserData);
    return updatedUserData;
  } catch (error) {
    console.error("Error in postNewMessageAtUserDataByUserId:", error);
    throw error;
  }
};

const updateUserData = async (user_id, userData) => {
  await db.collection("users_data").doc(user_id).update(userData);
  return userData;
};

const updatingMessageUsedCount = async (data_needed_to_update_message) => {
  const { user_id, operation_id, status_name, message_id } =
    data_needed_to_update_message;
  try {
    const userDataToWorkOn = await getUserDataByUserID(user_id);

    const ops = userDataToWorkOn.global_operations.map((op) => {
      if (op.operation_id === operation_id) {
        const updated_statuses = op.statuses.map((st) => {
          if (st.status_name === status_name) {
            console.log("STATUS TO UPDATE:", JSON.stringify(st, null, 2));
            const message_to_update = st.stored_messages.find(
              (msg) => msg.message_id === message_id
            );
            if (!message_to_update) {
              throw new Error("Message to update not found");
            }
            const new_message_to_add = {
              ...message_to_update,
              usedCount: message_to_update.usedCount + 1,
            };
            const updated_stored_messages = st.stored_messages
              .map((msg) =>
                msg.message_id === message_id ? new_message_to_add : msg
              )
              .sort((a, b) => b.usedCount - a.usedCount); // Sort by usedCount in descending order

            return {
              ...st,
              stored_messages: updated_stored_messages,
            };
          }
          return st;
        });
        return { ...op, statuses: updated_statuses };
      }
      return op;
    });
    const updatedUserData = {
      ...userDataToWorkOn,
      global_operations: ops,
    };
    await updateUserData(user_id, updatedUserData);
    return updatedUserData;
  } catch (error) {
    console.error("Error updating message used count:", error.message);
    throw error;
  }
};

const deletingStoredMessage = async (data_needed_to_delete_message) => {
  const { user_id, operation_id, status_name, message_id } =
    data_needed_to_delete_message;
  try {
    const userDataToWorkOn = await getUserDataByUserID(user_id);

    const ops = userDataToWorkOn.global_operations.map((op) => {
      if (op.operation_id === operation_id) {
        const updated_statuses = op.statuses.map((st) => {
          if (st.status_name === status_name) {
            console.log(
              "STATUS TO DELETE MESSAGE FROM:",
              JSON.stringify(st, null, 2)
            );
            const message_to_delete = st.stored_messages.find(
              (msg) => msg.message_id === message_id
            );
            if (!message_to_delete) {
              throw new Error("Message to delete not found");
            }
            const updated_stored_messages = st.stored_messages.filter(
              (msg) => msg.message_id !== message_id
            ); // Remove the message with the given message_id

            return {
              ...st,
              stored_messages: updated_stored_messages,
            };
          }
          return st;
        });
        return { ...op, statuses: updated_statuses };
      }
      return op;
    });

    const updatedUserData = {
      ...userDataToWorkOn,
      global_operations: ops,
    };
    await updateUserData(user_id, updatedUserData);
    return updatedUserData;
  } catch (error) {
    console.error("Error deleting stored message:", error.message);
    throw error;
  }
};
const deleteRecentMessageByUserID = async (user_id, message_id) => {
  try {
    console.log("USER ID AT DELETE RECENT MESSAGE:", user_id);
    console.log("ITEM ID AT DELETE RECENT MESSAGE:", message_id);

    const userData = await getUserDataByUserID(user_id);
    if (!userData) {
      throw new Error("User data not found");
    }

    if (!Array.isArray(userData.recent_messages)) {
      throw new Error("Recent messages data is invalid");
    }

    const updatedRecentMessages = userData.recent_messages.filter(
      (message) => message.message_id !== message_id
    );

    await db
      .collection("users_data")
      .doc(userData.user_id)
      .update({
        ...userData, // Update the whole userData
        recent_messages: updatedRecentMessages,
      });

    return { status: "success", msg: "Recent message deleted successfully" };
  } catch (error) {
    console.error("Error deleting recent message:", error.message);
    throw error;
  }
};

module.exports = {
  deleteRecentMessageByUserID,
  getUserDataByUserID,
  updateUserData,
  postNewMessageAtUserDataByUserId,
  updatingMessageUsedCount,
  deletingStoredMessage,
};
