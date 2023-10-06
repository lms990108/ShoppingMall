const orderModel = require('../models/orderModel')

class orderService {
    constructor(orderModel) {
        this.orderModel = orderModel;
    }

    // 주문 추가 (구매버튼 누르면)
    async addOrder(newOrder) {
        const createNewOrder = await this
            .orderModel
            .create(newOrder)
        return createNewOrder;
    }

    // userId 주문 전체 조회 (get요청 들어올때 해야할듯?)
    async getFindOrderByUserId(userId) {
        const userOrder = await this
            .orderModel
            .find({userId: userId});

        if (!userOrder) {
            throw new Error("주문 내역 없음")
        }

        return userOrder
    }

    // orderNumber 주문 상세 조회 (ex. 9월 4일 주문내역 누르면)
    async getFindOrderByOrderNumber(orderNumber) {
        const getOrder = await this
            .orderModel
            .findOne({orderNum: orderNumber});

        if (!getOrder) {
            throw new Error("주문 내역 없음")
        }

        return getOrder
    }

    // 주문 수정 (쓸 일이 있을까?)
    async updateOrder(orderNumber, newOrder) {
        const targetOrder = await this
            .orderModel
            .findOne({orderNum: orderNumber});

        if (!targetOrder) {
            throw new Error("주문 내역 없음")
        }

        // 주문번호는 그대로 유지하고, 그 외 정보들만 newOrder 객체 정보로 수정
        const updateOrder = await this
            .orderModel
            .update({orderNum, update: newOrder})

        return updateOrder;
    }

    // 주문 취소
    async cancelOrder(orderNumber) {
        // 상태값 확인 -> 배송중/배송전/도착
        // if 배송전 -> 취소 <<<<<  
        // else :  배송이 이미 시작했다는 Error
        const targetOrder = await this
            .orderModel
            .findOne({orderNum: orderNumber});

        if (!targetOrder) {
            throw new Error("주문 내역 없음")
        }

        await this
            .orderModel
            .deleteOne({orderNum: orderNumber});

        return targetOrder;
    }
}

module.exports = orderService;
