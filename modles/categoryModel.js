const mongoose = require("mongoose");
const slugify = require("slugify");

const categorySchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a category name"],
    unique: [true, "A category with this name already exists!"],
  },
  slug: String,
  image: {
    type: String,
    required: [true, "Please provide a category image"],
  },
  status: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

categorySchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });

  next();
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
