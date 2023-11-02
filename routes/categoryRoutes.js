const express = require("express");
const categoryController = require("./../controllers/categoryController");
const authController = require("./../controllers/authController");

const router = express.Router();

// router.use(authController.protect, authController.restrictTo("admin"));

router
  .route("/")
  .get(categoryController.getAllCategories)
  .post(
    categoryController.uploadCategoryImage,
    categoryController.resizeCategoryImage,
    categoryController.createCategory
  );
router
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(
    categoryController.uploadCategoryImage,
    categoryController.resizeCategoryImage,
    categoryController.updateCategory
  )
  .delete(categoryController.deleteCategory);

module.exports = router;
