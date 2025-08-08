/* eslint-disable */

const { v4: uuidv4 } = require("uuid");
const { db } = require("../../fb");

// ** get Category data by user ID controller
const getUserDataByUserID = async (user_id) => {
  let found_userData = [];
  await db
    .collection("users_data")
    .where(`user_id`, "==", user_id)
    .get()

    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        found_userData.push(doc.data());
      });
    });
  return found_userData;
};

// ** Create a user - Http Request
const createUser = async (user) => {
  const { user_id } = user;
  await db.collection("users").doc(`/${user_id}/`).create(user);
  return user;
};

const createUserDataAfterUserCreation = async (
  user_id,
  messages_categories
) => {
  const user_data_to_create = {
    user_id,
    recent_messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    messages_categories,
  };
  await db
    .collection("users_data")
    .doc(`/${user_id}/`)
    .create(user_data_to_create);
  return { success: true, data: user_data_to_create };
};

module.exports = {
  createUser,
  createUserDataAfterUserCreation,
  getUserDataByUserID,
};
