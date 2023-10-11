const orderModel = require("../models/orderModel");
const cron = require("node-cron");

function updateOrderStatus() {
  cron.schedule(
    "*/1 * * * *", // 매 분마다 실행
    async function () {
      const oneDayAgo = new Date(new Date() - 24 * 60 * 60 * 1000);

      // status: 0인 주문 중 24시간이 경과한 주문을 status: 1로 업데이트
      await orderModel.updateMany(
        { status: 0, createdAt: { $lte: oneDayAgo } },
        { status: 1 },
      );

      // status: 1인 주문 중 24시간이 경과한 주문을 status: 2로 업데이트
      await orderModel.updateMany(
        { status: 1, createdAt: { $lte: oneDayAgo } },
        { status: 2 },
      );
    },
    {
      timezone: "Asia/Seoul",
    },
  );
}

module.exports = updateOrderStatus;
