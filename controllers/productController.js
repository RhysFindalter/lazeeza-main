const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const Product = require("../modles/productModel");
const handlerFactory = require("./handlerFactory");
const AppError = require("./../utils/appError");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("The uploaded file is not a image!", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadProductPhoto = upload.single("image");

exports.resizeProductPhoto = async (req, res, next) => {
  if (!req.file) return next();

  req.body.image = `product-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(1700, 1110)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/imgs/products/${req.body.image}`);

  const product = await Product.findById(req.params.id);

  if (!product) return next();

  fs.unlink(`public/imgs/products/${product.image}`, (err) => {
    if (err) {
      return next(new AppError("Could not update image!", 400));
    }
  });

  next();
};

exports.createProduct = handlerFactory.createOne(Product);
exports.getAllProducts = handlerFactory.getAll(Product);
exports.getProduct = handlerFactory.getOne(Product);
exports.updateProduct = handlerFactory.updateOne(Product);
exports.deleteProduct = handlerFactory.deleteOne(Product);
