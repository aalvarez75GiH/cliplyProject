/* eslint-disable */
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const app = require("../../express")();
const Buffer = require("buffer").Buffer;
const crypto = require("crypto");

const usersController = require("./users.controllers");
const users_dataController = require("../users_data/users_data.controllers");
const globalOperationsController = require("../global_operations/global_operations.controllers");
const { loadPrivateKeyOnce, sendingEmailToUser } = require("./users.handlers");
const { decryptingPINAndReturningIt } = require("./users.handlers");
const { admin } = require("../../fb");
//******************** GETS ****************************************

const isSixDigitPin = (pin) => typeof pin === "string" && /^\d{6}$/.test(pin);

//** Getting a user by Google UID
app.get("/userByUId", (req, res) => {
  const uid = req.query.uid;
  (async () => {
    try {
      let userResponse;
      await usersController.getUserByUId(uid).then((user) => {
        users_dataController
          .getUserDataByUserID(user.user_id)
          .then((user_data) => {
            console.log("USER DATA AT ROUTE:", user_data);
            userResponse = {
              ...user,
              user_data: user_data,
            };
            user_data
              ? res.status(200).json(userResponse)
              : res
                  .status(404)
                  .send({ status: "404", msg: "USER DATA NOT FOUND" });
          });
        // user
        //   ?
        //   : res.status(404).send({ status: "404", msg: "USER NOT FOUND" });
      });
    } catch (error) {
      return res.status(404).send({
        status: "404",
        msg: "UID NOT FOUND",
      });
    }
  })();
});

//******************** POSTS ****************************************

app.post("/", async (req, res) => {
  try {
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
      display_name: req.body.display_name,
      encrypted_pin: req.body.encrypted_pin,
      isFirstTime,
      user_id,
    };
    console.log("USER AT END POINT:", user);

    // 1) Create user first (if your logic needs the user_id in DB)
    const newUser = await usersController.createUser(user);

    // 2) Kick off email + user_data creation in parallel
    const [emailInfo, users_data_created] = await Promise.all([
      // make sure sendingEmailToUser returns a Promise that resolves after sendMail finishes
      sendingEmailToUser(user.email, user.encrypted_pin),
      (async () => {
        const global_operations =
          await globalOperationsController.getAllGlobalOperations();
        return usersController.createUserDataAfterUserCreation(
          newUser.user_id,
          global_operations
        );
      })(),
    ]);

    console.log("Email result:", emailInfo); // ideally contains messageId/response
    console.log(
      "USERS DATA CREATED:",
      JSON.stringify(users_data_created, null, 2)
    );

    if (users_data_created.success) {
      return res.status(201).json(users_data_created);
    } else {
      return res.status(503).send({
        status: "503",
        msg: `USER DATA FOR USER ID ${newUser.user_id} NOT CREATED - SERVER UNAVAILABLE`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      status: "Failed",
      msg: "Something went wrong saving Data...",
    });
  }
});

app.post("/credentials", (req, res) => {
  try {
    const keyObject = loadPrivateKeyOnce();

    const { encrypted_pin } = req.body || {};
    if (!encrypted_pin)
      return res.status(400).json({ error: "Missing encryptedPin" });

    const decrypted = crypto.privateDecrypt(
      {
        key: keyObject,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      Buffer.from(encrypted_pin, "base64")
    );

    const decrypted_pin = decrypted.toString("utf8");
    console.log("Decrypted PIN:", decrypted_pin);
    // TODO: use `pin` securely (e.g., update Firebase password, or hash & discard)
    return res.json({ ok: true, pin: decrypted_pin }); // ← do NOT send the pin back
  } catch (e) {
    console.error("Decrypt failed:", e);
    return res.status(500).json({ error: "Decrypt failed" });
  }
});

app.post("/reset-pin", async (req, res) => {
  try {
    const { email, encrypted_pin } = req.body || {};
    if (!email || typeof email !== "string") {
      return res
        .status(400)
        .json({ error: "invalid_email", message: "Email is required." });
    }

    const decrypted_pin = decryptingPINAndReturningIt(encrypted_pin);
    console.log("Decrypted PIN at reset-pin endpoint:", decrypted_pin);

    // Look up user at Firebase by email
    const user = await admin.auth().getUserByEmail(email);
    console.log("User found for email:", user.email);
    console.log("User id:", user.uid);

    // Fetch user at Cliply DB by UID
    const user_found = await usersController.getUserByUId(user.uid);
    if (!user_found) {
      return res.status(404).send({
        status: "Failed",
        msg: "User not found",
      });
    }
    console.log("USER FOUND AT DB ENDPOINT:", user_found);

    await admin.auth().updateUser(user.uid, { password: decrypted_pin });
    // Update user at DB with the new encrypted PIN

    const user_updated = {
      ...user_found,
      encrypted_pin: encrypted_pin,
      updatedAt: new Date().toISOString(),
    };
    await usersController.updateUser(user_updated);

    // Decrypt the PIN & send email to user
    await sendingEmailToUser(user_found.email, encrypted_pin);

    // (Optional) Send a notification email to the user letting them know their PIN was changed.

    // Return success. If your client initiated this, it's ok to return the new PIN.
    // If you prefer, omit returning the PIN and instead instruct the client to prompt the user to create a new one.
    return res.status(200).send({
      status: "200",
      msg: "USER PIN WAS UPDATED...",
      user_updated: user_updated,
    });
  } catch (err) {
    console.error("reset-pin error:", err);

    if (err && err.code === "auth/user-not-found") {
      return res.status(404).json({
        error: "user_not_found",
        message: "No user found with that email.",
      });
    }

    // Hide internal details from client
    return res.status(500).json({
      error: "internal",
      message: "Could not reset PIN.",
    });
  }
});

//** Updating a real income by adding a new week income
app.put("/updatePreferenceLanguage", (req, res) => {
  const user_id = req.query.user_id;
  const preference_language = req.query.preference_language;

  (async () => {
    try {
      console.log("USER ID AT UPDATE PREF LANGUAGE ROUTE:", user_id);
      console.log(
        "PREFERENCE LANGUAGE AT UPDATE PREF LANGUAGE ROUTE:",
        preference_language
      );
      const user_found = await usersController.getUserByUserID(user_id);
      console.log("USER FOUND AT UPDATE PREF LANGUAGE ROUTE:", user_found);
      const user_updated = {
        ...user_found,
        preference_language,
        updatedAt: new Date().toISOString(),
        isFirstTime: false,
      };
      const user_response = await usersController.updateUser(user_updated);
      return res.status(200).send({
        status: "200",
        msg: "USER PREFERENCE LANGUAGE UPDATED",
        user_updated: user_response,
      });
    } catch (error) {
      return res.status(500).send({
        status: "Failed",
        msg: error,
      });
    }
  })();
});

app.put("/updatePINNumberOnDemand", async (req, res) => {
  const user_id = req.query.user_id;
  const encrypted_pin = decodeURIComponent(req.body.encrypted_pin);
  // const encrypted_pin = req.query.encrypted_pin;

  // Validate required parameters
  if (!user_id || !encrypted_pin) {
    return res.status(400).send({
      status: "Failed",
      msg: "Missing required parameters: user_id or encrypted_pin",
    });
  }

  try {
    console.log("USER ID AT ENDPOINT:", user_id);
    console.log("ENCRYPTED PIN AT ENDPOINT:", encrypted_pin);

    // Fetch user by ID
    const user_found = await usersController.getUserByUserID(user_id);
    if (!user_found) {
      return res.status(404).send({
        status: "Failed",
        msg: "User not found",
      });
    }

    // Update user at DB with the new encrypted PIN
    const user_updated = {
      ...user_found,
      encrypted_pin: encrypted_pin,
      updatedAt: new Date().toISOString(),
    };
    await usersController.updateUser(user_updated);

    // Decrypt the PIN & send email to user
    await sendingEmailToUser(user_found.email, encrypted_pin);

    // Respond with success
    return res.status(200).send({
      status: "200",
      msg: "USER PIN WAS UPDATED...",
      user_updated: user_updated,
    });
  } catch (error) {
    console.error("Error in /updatePINNumberOnDemand:", error);
    return res.status(500).send({
      status: "Failed",
      msg: "An error occurred while updating the PIN",
      error: error.message,
    });
  }
});

module.exports = app;
