const orderModel = require("../models/orderModel");
const cron = require("node-cron");

function updateOrderStatus() {
  cron.schedule(
    "0 12 * * *",
    async function () {
      console.log("주문 상태 변경");

      const ordersInPreShipping = await orderModel.find({ status: 0 });
      for (const order of ordersInPreShipping) {
        order.status = 1;
        await order.save();
      }

      const ordersInShipping = await orderModel.find({ status: 1 });
      for (const order of ordersInShipping) {
        order.status = 2;
        await order.save();
      }
    },
    {
      timezone: "Asia/Seoul",
    },
  );
}

module.exports = updateOrderStatus;
