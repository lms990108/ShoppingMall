const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  /* 
  자동으로 생성되는 _id 대신 
  product_number를 고유 식별자로 사용.
  이 숫자는 제품이 추가될때마다 하나씩 증가 초기값 1
  */

  product_number: {
    type: Number,
    required: true,
    unique: true,
  },
  product_name: {
    type: String,
    required: true,
    unique: true,
  },
  main_img_url: {
    type: String,
    required: true,
  },
  des_img_url: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  higher_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  lower_category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  inDate: {
    type: Date,
    default: Date.now,
  },
  cnt: {
    type: Number,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
