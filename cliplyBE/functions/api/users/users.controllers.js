/* eslint-disable */

const { v4: uuidv4 } = require("uuid");
const { db } = require("../../fb");
const { user } = require("firebase-functions/v1/auth");

// ** Create a user - Http Request
const createUser = async (user) => {
  const { user_id } = user;
  await db.collection("users").doc(`/${user_id}/`).create(user);
  return user;
};

const createUserDataAfterUserCreation = async (user_id, global_operations) => {
  const user_data_to_create = {
    user_id,
    recent_messages: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    global_operations,
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
};
