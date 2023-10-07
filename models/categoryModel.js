const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category", // 참조는 같은 스키마에 대한 것이므로 'Category'로 지정합니다.
    default: null, // 최상위 카테고리의 경우 null 값을 가집니다.
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
