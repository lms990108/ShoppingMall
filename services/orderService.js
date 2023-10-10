const orderModel = require("../models/orderModel");

class orderService {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }

  // 주문 추가 (구매버튼 누르면)
  async addOrder(newOrder, userId) {
    if (!userId) throw new Error("사용자 ID가 필요합니다");

    // userId를 newOrder에 추가합니다.
    const orderWithUser = { ...newOrder, userId };
    const createNewOrder = await this.orderModel.create(orderWithUser);
    return createNewOrder;
  }

  // userId 주문 전체 조회 with 페이징
  async getFindOrderByUserId(userId, page = 1, limit = 10) {
    const skip = (page - 1) * limit; // 페이지 시작 인덱스를 계산합니다.

    const userOrder = await this.orderModel
      .find({ userId: userId })
      .skip(skip)
      .limit(limit);

    if (!userOrder || userOrder.length === 0) {
      throw new Error("주문 내역 없음");
    }

    return userOrder;
  }

  // orderNumber 주문 상세 조회 (ex. 9월 4일 주문내역 누르면)
  async getFindOrderByOrderNumber(orderNumber) {
    const getOrder = await this.orderModel.findOne({ orderNum: orderNumber });

    if (!getOrder) {
      throw new Error("주문 내역 없음");
    }

    return getOrder;
  }

  // 주문 수정 (쓸 일이 있을까?)
  async updateOrder(orderNumber, newOrder) {
    const targetOrder = await this.orderModel.findOne({
      order_number: orderNumber,
    });

    if (!targetOrder) {
      throw new Error("주문 내역 없음");
    }

    // 주문번호는 그대로 유지하고, 그 외 정보들만 newOrder 객체 정보로 수정
    const updateOrder = await this.orderModel.update({
      order_number,
      update: newOrder,
    });

    return updateOrder;
  }

  async cancelOrder(orderNumber) {
    // 상태값 확인 -> 배송중/배송전/도착
    // if 배송전 -> 취소
    // else : 배송이 이미 시작했다는 Error
    const targetOrder = await this.orderModel.findOne({
      order_number: orderNumber,
    });

    if (!targetOrder) {
      throw new Error("주문 내역 없음");
    }

    // 상태값이 0이라면 (배송 전이라면) 취소가 가능.
    if (targetOrder.status === 0) {
      // 상태를 '취소 됨'으로 변경
      await this.orderModel.updateOne(
        { order_number: orderNumber },
        { status: 3 },
      );
    } else {
      throw new Error("배송이 이미 시작되었습니다. 주문을 취소할 수 없습니다.");
    }

    return targetOrder;
  }
}

module.exports = orderService;
