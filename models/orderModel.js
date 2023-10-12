const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const orderSchema = new Schema(
  {
    userId: {
      type: String,
    },
    status: {
      // 0: 배송 전, 1: 배송 중, 2:  배송 완료, 3: 취소 됨
      type: Number,
      default: "0",
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    },
    destination: {
      // 배송주소
      type: String,
      required: true,
    },
    phone_number: {
      // 연락처
      type: String,
      required: true,
    },
    memo: {
      type: String,
    },
    order_number: {
      type: Number,
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
      },
    ],
  },
  { timestamps: true },
  { versionKey: false },
);

const order = mongoose.model("order", orderSchema);
module.exports = order;
