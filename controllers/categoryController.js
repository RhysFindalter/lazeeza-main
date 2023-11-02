const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const catchAsync = require("../utils/catchAsync");
const Category = require("../modles/categoryModel");
const handlerFactory = require("./handlerFactory");
const AppError = require("../utils/appError");

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

exports.uploadCategoryImage = upload.single("image");

exports.resizeCategoryImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  // Resize and create new image

  req.body.image = `category-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(1700, 1110)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/imgs/categories/${req.body.image}`);

  // Delete old image

  const category = await Category.findById(req.params.id);

  if (!category) return next();

  fs.unlink(`public/imgs/categories/${category.image}`, (err) => {
    if (err) {
      return next(new AppError("Could not update image!", 400));
    }
  });

  next();
});

exports.createCategory = handlerFactory.createOne(Category);
exports.getAllCategories = handlerFactory.getAll(Category);
exports.getCategory = handlerFactory.getOne(Category);
exports.updateCategory = handlerFactory.updateOne(Category);
exports.deleteCategory = handlerFactory.deleteOne(Category);
