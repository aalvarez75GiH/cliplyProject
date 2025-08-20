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

const updateUserData = async (user_id, userData) => {
  await db.collection("users_data").doc(user_id).update(userData);
  return userData;
};

const deleteRecentMessageByUserID = async (user_id, item_id) => {
  try {
    console.log("USER ID AT DELETE RECENT MESSAGE:", user_id);
    console.log("ITEM ID AT DELETE RECENT MESSAGE:", item_id);

    const userData = await getUserDataByUserID(user_id);
    if (!userData) {
      throw new Error("User data not found");
    }

    if (!Array.isArray(userData.recent_messages)) {
      throw new Error("Recent messages data is invalid");
    }

    const updatedRecentMessages = userData.recent_messages.filter(
      (message) => message.message_id !== item_id
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
};
