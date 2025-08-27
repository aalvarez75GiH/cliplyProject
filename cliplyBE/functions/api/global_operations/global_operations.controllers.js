/* eslint-disable*/

// ** Create a Global category
const { v4: uuidv4 } = require("uuid");
const { db } = require("../../fb");

const getAllGlobalOperations = async () => {
  return await db
    .collection("global_operations")
    .get()
    .then((data) => {
      let global_operations = [];
      let docs = data.docs;
      if (docs.length) {
        docs.map((doc) => {
          const selectedGlobalOperation = {
            operation_id: doc.data().operation_id,
            operation_name: doc.data().operation_name,
            createdAt: doc.data().createdAt,
            updatedAt: doc.data().updatedAt,
            statuses: doc.data().statuses,
          };
          global_operations.push(selectedGlobalOperation);
        });
        // res.status(200).json(expenses_categories);
        return global_operations;
      }
      if (!docs.length) {
        return global_operations;
      }
    });
};

// ** Create a Global category
const createGlobalOperation = async (operation) => {
  if (!operation || typeof operation !== "object") {
    throw new Error("Invalid operation object");
  }

  const operation_id = uuidv4();
  const timestamp = new Date().toISOString();
  const globalOperationToCreate = {
    ...operation,
    operation_id,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  try {
    await db
      .collection("global_operations")
      .doc(`/${operation_id}/`)
      .create(globalOperationToCreate);
    return globalOperationToCreate;
  } catch (error) {
    console.error("Error creating global operation:", error);
    throw new Error("Failed to create global operation");
  }
};

module.exports = {
  createGlobalOperation,
  getAllGlobalOperations,
};
