const mongoose = require("mongoose");
// const User = require('./User'); const Product = require('./Product');
const { Schema } = require("mongoose");
const orderSchema = new Schema(
  {
    userId: {
      // type: mongoose.ObjectId, ref: User
      type: String,
    },
    status: {
      // 0: 배송 전, 1: 배송 중, 2: 배송 완료, 3: 취소 됨
      type: Number,
      default: "0",
    }, // 준비단계 표시
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
    }, // 총 주문금액
    shipTo: {
      type: Object,
      required: true,
    }, // 배송지 기입
    contact: {
      type: Object,
      required: true,
    },
    orderNum: {
      type: String,
    },
    items: [
      {
        productId: {
          // type: mongoose.ObjectId, ref: Product
          type: String,
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
