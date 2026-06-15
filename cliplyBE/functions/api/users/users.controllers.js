/* eslint-disable */

const { db } = require("../../fb");

// ** get a user by UID
const getUserByUId = async (uid) => {
  console.log("UID AT CONTROLLER:", uid);
  let found_user;
  await db
    .collection("users")
    .where(`uid`, "==", uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("THIS IS DOC:", doc.data());
        found_user = doc.data();
      });
    });
  return found_user;
};
// ** get a user by UID
const getUserByUserID = async (user_id) => {
  console.log("USER ID AT CONTROLLER:", user_id);
  let found_user;
  await db
    .collection("users")
    .where(`user_id`, "==", user_id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log("THIS IS DOC:", doc.data());
        found_user = doc.data();
      });
    });
  return found_user;
};

// ** Create a user - Http Request
const createUser = async (user) => {
  const { user_id } = user;
  await db.collection("users").doc(`/${user_id}/`).create(user);
  return user;
};
// ** Create a user - Http Request
const updateUser = async (user) => {
  const { user_id } = user;
  await db.collection("users").doc(`/${user_id}/`).update(user);
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
  getUserByUId,
  getUserByUserID,
  updateUser,
};
