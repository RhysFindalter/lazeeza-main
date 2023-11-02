const catchAsync = require("./../utils/catchAsync");
const Product = require("./../modles/productModel");
const Category = require("./../modles/categoryModel");

exports.getHome = catchAsync(async (req, res, next) => {
  const trendingProducts = await Product.find({
    trending: true,
    status: { $ne: false },
  });

  res.status(200).render("homepage", {
    title: "Silver Licious",
    trendingProducts,
  });
});

exports.getProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find({ status: { $eq: true } });

  res.status(200).render("products", {
    title: "Jewellery",
    products,
  });
});

exports.getJewelleryProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({
    slug: req.params.slug,
    status: { $ne: false },
  });

  res.status(200).render("jewelleryProduct", {
    title: product.name,
    product,
  });
});

exports.getCollections = catchAsync(async (req, res, next) => {
  const categories = await Category.find({ status: { $eq: true } });

  res.status(200).render("categories", {
    title: "Jewellery",
    categories,
  });
});

exports.getCollection = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug });
  const products = await Product.find({
    category: category._id,
    status: { $eq: true },
  });

  res.status(200).render("category", {
    title: category.name,
    collection: category.slug,
    products,
  });
});

exports.getCollectionProduct = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.catSlug });
  const product = await Product.findOne({
    slug: req.params.prodSlug,
    status: { $ne: false },
  });

  res.status(200).render("collectionProduct", {
    title: product.name,
    category,
    product,
  });
});

exports.getRegisterForm = catchAsync(async (req, res, next) => {
  res.status(200).render("register", {
    title: "Register a account",
  });
});

exports.getLoginForm = catchAsync(async (req, res, next) => {
  res.status(200).render("login", {
    title: "Login",
  });
});

exports.getMyAccount = catchAsync(async (req, res, next) => {
  res.status(200).render("account", {
    title: "My account",
  });
});

// ADMIN
exports.getAdminCategories = catchAsync(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).render("./admin/allCategories", {
    title: "All categories",
    categories,
  });
});

exports.getAdminProducts = catchAsync(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).render("./admin/allProducts", {
    title: "All products",
    products,
  });
});

exports.getAdminAddProduct = catchAsync(async (req, res, next) => {
  const categories = await Category.find();

  res.status(200).render("./admin/addProduct", {
    title: "Add Product",
    categories,
  });
});

exports.getAdminAddCategory = catchAsync(async (req, res, next) => {
  res.status(200).render("./admin/addCategory", {
    title: "Add category",
  });
});

exports.getAdminEditCategory = catchAsync(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug });

  res.status(200).render("./admin/editCategory", {
    title: "Edit category",
    category,
  });
});

exports.getAdminEditProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug });
  const categories = await Category.find();

  res.status(200).render("./admin/editProduct", {
    title: "Edit product",
    product,
    categories,
  });
});
