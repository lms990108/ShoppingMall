const mongoose = require("mongoose");
// const User = require('./User'); const Product = require('./Product');
const { Schema } = require("mongoose");
const orderSchema = new Schema(
  {
    user_email: {
      type: String,
    },
    status: {
      // 0: 배송 전, 1: 배송 중, 2: 배송 완료, 3: 취소 됨
      type: Number,
      default: "0",
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    destination: {
      // 배송지
      type: Object,
      required: true,
    },
    contact: {
      // 연락처
      type: Object,
      required: true,
    },
    order_number: {
      type: String,
    },
    items: [
      {
        product_number: {
          type: Number,
        },
        price: {
          type: Number,
          required: true,
        },
        qty: {
          type: Number,
          required: true,
          default: 1,
        },
        size: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true },
);

/*
orderSchema.methods.toJSON = function () {     
    const obj = this._doc;
    delete obj.__v;     
    delete obj.updatedAt;     
    return obj; 
};
*/

const order = mongoose.model("order", orderSchema);
module.exports = order;
