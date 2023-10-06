const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lowerCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

const categorySchema = new Schema({
  higher_category: {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  lower_category: [lowerCategorySchema],
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
