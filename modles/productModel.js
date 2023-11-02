const mongoose = require("mongoose");
const slugify = require("slugify");

const productSchema = mongoose.Schema({
  category: {
    type: String,
    required: [true, "Please enter a product category"],
  },
  name: {
    type: String,
    required: [true, "Please enter a product name"],
    unique: [true, "A product with this name already exists"],
  },
  slug: String,
  smallDescription: {
    type: String,
    required: [true, "Please enter a small description"],
  },
  description: {
    type: String,
    required: [true, "Please enter a description"],
  },
  originalPrice: Number,
  sellingPrice: {
    type: Number,
    // validate: {
    //   validator: function (val) {
    //     return val < this.originalPrice;
    //   },
    //   message:
    //     "The original price must be less than the selling price ({VALUE})",
    // },
  },
  image: {
    type: String,
    required: [true, "Please enter a product image"],
  },
  quantity: {
    type: Number,
    required: [true, "Please enter a product quantity"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  trending: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

productSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});

productSchema.pre("save", function (next) {
  this.name = this.name
    .split(" ")
    .map((word) => {
      const firstLetter = word.charAt(0).toUpperCase();
      const rest = word.slice(1).toLowerCase();
      return firstLetter + rest;
    })
    .join(" ");

  next();
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
