/* eslint-disable*/

// ** Create a Global category
const { v4: uuidv4 } = require("uuid");
const { db } = require("../../fb");

const getAllGlobalCategories = async () => {
  return await db
    .collection("global_categories")
    .get()
    .then((data) => {
      let global_categories = [];
      let docs = data.docs;
      if (docs.length) {
        docs.map((doc) => {
          const selectedGlobalCategory = {
            category_id: doc.data().category_id,
            category_name: doc.data().category_name,
            createdAt: doc.data().createdAt,
            updatedAt: doc.data().updatedAt,
            icon_name: doc.data().icon_name,
            type: doc.data().type,
            preloaded_messages: doc.data().preloaded_messages,
            splitted_name: doc.data().splitted_name,
          };
          global_categories.push(selectedGlobalCategory);
        });
        // res.status(200).json(expenses_categories);
        return global_categories;
      }
      if (!docs.length) {
        return global_categories;
      }
    });
};

// ** Create a Global category
const createGlobalCategory = async (category) => {
  if (!category || typeof category !== "object") {
    throw new Error("Invalid category object");
  }

  const category_id = uuidv4();
  const timestamp = new Date().toISOString();
  const globalCategoryToCreate = {
    ...category,
    category_id,
    createdAt: timestamp,
    updatedAt: timestamp,
  };

  try {
    await db
      .collection("global_categories")
      .doc(`/${category_id}/`)
      .create(globalCategoryToCreate);
    return globalCategoryToCreate;
  } catch (error) {
    console.error("Error creating global category:", error);
    throw new Error("Failed to create global category");
  }
};

module.exports = {
  createGlobalCategory,
  getAllGlobalCategories,
};
