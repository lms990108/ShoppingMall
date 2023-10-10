const { Router } = require("express");
const asyncHandler = require("../utils/async-handler");
const orderModel = require("../models/orderModel");
const orderService = require("../services/orderService");
const { authenticate } = require("../middlewares/authentication");
const { checkUserOrAdmin } = require("../middlewares/authorization");

const orderServiceInstance = new orderService(orderModel);

const router = Router();

// 주문 목록 조회
router.get(
  "/user/:userId/orders",
  authenticate,
  checkUserOrAdmin,
  asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { page, limit } = req.query;

    if (!userId) {
      const error = new Error("userId 가 필요합니다");
      error.statusCode = 400;
      throw error;
    }

    // 이하 로직은 userId가 제공된 경우에만 실행됩니다.
    const orders = await orderServiceInstance.getFindOrderByUserId(
      userId,
      +page,
      +limit,
    );
    res.status(200).json(orders);
  }),
);

// 주문 번호로 주문 조회
router.get(
  "/",
  authenticate,
  checkUserOrAdmin,
  asyncHandler(async (req, res) => {
    const orderNumber = req.query.order_number;
    if (!orderNumber) {
      const error = new Error("order_number 쿼리 파라미터가 필요합니다");
      error.statusCode = 400;
      throw error;
    }
    const order =
      await orderServiceInstance.getFindOrderByOrderNumber(orderNumber);
    console.log("주문 번호로 조회 성공");
    res.json(order);
  }),
);

// 주문 추가
router.post(
  "/add_order",
  authenticate,
  checkUserOrAdmin,
  asyncHandler(async (req, res) => {
    const new_order = req.body;
    const userId = req.userId; // 미들웨어에서 추가된 userId를 가져옵니다.

    if (!new_order || Object.keys(new_order).length === 0) {
      throw new Error("본문에 new_order가 필요합니다");
    }

    const createdOrder = await orderServiceInstance.addOrder(new_order, userId);
    return res.status(201).json({
      message: "주문이 성공적으로 추가되었습니다",
      order: createdOrder,
    });
  }),
);

// 주문 취소
router.delete(
  "/cancel_order/",
  authenticate,
  checkUserOrAdmin,
  asyncHandler(async (req, res) => {
    const targetOrderNumber = req.query.order_number;
    const { user } = req;

    // 유저 정보가 없거나 유저 레벨이 1이 아닐 경우 에러 처리
    if (!user.level === 1) {
      const error = new Error("관리자 권한이 필요합니다.");
      error.statusCode = 403; // 권한이 없는 경우 403 Forbidden을 반환하는 것이 적합합니다.
      throw error;
    }

    if (!targetOrderNumber) {
      const error = new Error("order_number 쿼리 파라미터가 필요합니다");
      error.statusCode = 400;
      throw error;
    }

    const canceledOrder =
      await orderServiceInstance.cancelOrder(targetOrderNumber);

    if (!canceledOrder) {
      const error = new Error("주문을 찾을 수 없거나 이미 취소되었습니다");
      error.statusCode = 404;
      throw error;
    }

    console.log("주문 취소");
    return res.status(200).json({
      message: "주문이 성공적으로 취소되었습니다",
      order: canceledOrder,
    });
  }),
);

module.exports = router;
