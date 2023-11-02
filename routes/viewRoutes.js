const express = require("express");
const viewController = require("./../controllers/viewsController");
const orderController = require("./../controllers/orderController");
const authController = require("./../controllers/authController");

const router = express.Router();

// User
router.get("/", authController.isLoggedIn, viewController.getHome);
router.get("/jewellery", authController.isLoggedIn, viewController.getProducts);
router.get(
  "/jewellery/:slug",
  authController.isLoggedIn,
  viewController.getJewelleryProduct
);
router.get(
  "/collections",
  authController.isLoggedIn,
  viewController.getCollections
);
router.get(
  "/collections/:slug",
  authController.isLoggedIn,
  viewController.getCollection
);
router.get(
  "/collections/:catSlug/:prodSlug",
  authController.isLoggedIn,
  viewController.getCollectionProduct
);

router.get("/login", authController.isLoggedIn, viewController.getLoginForm);

router.get(
  "/signUp",
  authController.isLoggedIn,
  viewController.getRegisterForm
);
router.get("/account", authController.isLoggedIn, viewController.getMyAccount);

// Admin

router.get(
  "/allCategories",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.getAdminCategories
);
router.get(
  "/addCategory",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.getAdminAddCategory
);
router.get(
  "/allProducts",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.getAdminProducts
);
router.get(
  "/addProduct",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.getAdminAddProduct
);
router.get(
  "/editCategory/:slug",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.getAdminEditCategory
);
router.get(
  "/editProduct/:slug",
  authController.protect,
  authController.restrictTo("admin"),
  viewController.getAdminEditProduct
);

module.exports = router;
