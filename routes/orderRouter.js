const {Router} = require('express')
const asyncHandler = require('../utils/async-handler')
const orderModel = require('../models/orderModel');
const orderService = require('../services/orderService');

const orderServiceInstance = new orderService(orderModel);

// 상위 주소는 /order
const router = Router()

// 주문 목록에 들어가면 id를 확인해서 주문 목록을 뽑아옴
router.get('/:user_id', asyncHandler(async (req, res) => {
    const userId = req.params.user_id;
    const allOrders = await orderServiceInstance.getFindOrderByUserId(userId)
    console.log(allOrders)
    res.json(allOrders);
}))

// order?order_number=3
router.get('/', asyncHandler(async (req, res) => {
    const orderNumber = req.query.order_number;
    if (!orderNumber) {
        return res
            .status(400)
            .json({error: "order_number query parameter is required"});
    }
    const order = await orderServiceInstance.getFindOrderByOrderNumber(orderNumber);
    console.log("주문 번호로 조회 성공")
    res.json(order);
}));

// 결제버튼 누르면 주문 하는 라우팅 addOrder
router.post('/add_order', asyncHandler(async (req, res) => {
    const new_order = req.body;

    // 요청없는 에러처리
    if (!new_order) {
        return res
            .status(400)
            .json({error: "new_order is required in the body"});
    }

    const createdOrder = await orderServiceInstance.addOrder(new_order);

    console.log('주문 추가');
    return res
        .status(201)
        .json({message: 'Order added successfully', order: createdOrder});
}));

// 주문 취소 cancelOrder 결제하기 click : addOrder -> 주문 정보 확인 -> 최종 결제 in 주문 정보 확인 : 주문
// 번호가 포함 주문 번호 = 주문이 생성될 때 자동으로 생성되는 _id, ordernumber 둘 중 뭘 하든. 주문 이미 추가 if 취소
// : 다시 삭제 else 결제 : db create 주문 취소 (취소할 경우 ordernumber를 받아야함) 주문 취소 (취소할 경우
// ordernumber를 받아야함)
router.delete('/cancel_order/', asyncHandler(async (req, res) => {
    const targetOrderNumber = req.query.order_number;

    if (!targetOrderNumber) {
        return res
            .status(400)
            .json({error: "order_number query parameter is required"});
    }
    
    const canceledOrder = await orderServiceInstance.cancelOrder(targetOrderNumber);

    if (!canceledOrder) {
        return res
            .status(404)
            .json({error: "Order not found or already canceled"});
    }

    console.log('주문 취소');
    return res
        .status(200)
        .json({message: 'Order canceled successfully', order: canceledOrder});
}));

module.exports = router