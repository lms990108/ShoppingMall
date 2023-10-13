const express = require("express");
const path = require("path");

const viewRouter = express.Router();
const resourcePath = path.join(__dirname, "../views");

viewRouter.use(express.static(path.join(__dirname, "../views")));

// 메인페이지 연결
viewRouter.get("/", async (req, res) => {
  res.sendFile(path.join(resourcePath, "/mainPage/mainPage.html"));
});

// 상품리스트페이지 연결
viewRouter.get("/products", async (req, res) => {
  res.sendFile(path.join(resourcePath, "/productList/productList.html"));
});

// 상품 상세페이지 연결
viewRouter.get("/product_detail", async (req, res) => {
  res.sendFile(path.join(resourcePath, "/product/productDetail.html"));
});

// 장바구니 페이지 연결
viewRouter.get("/cart", async (req, res) => {
  res.sendFile(path.join(resourcePath, "/cart/cart.html"));
});

// 결제페이지 연결
viewRouter.get("/payment", async (req, res) => {
  res.sendFile(path.join(resourcePath, "/paymentPage/paymentPage.html"));
});

// 로그인페이지 연결
viewRouter.get("/login", async (req, res) => {
  res.sendFile(path.join(resourcePath, "/login/login.html"));
});

// 회원가입페이지 연결
viewRouter.get("/signUp", async (req, res) => {
  res.sendFile(path.join(resourcePath, "/signUp/signUp.html"));
});

// 마이페이지 연결
viewRouter.get("/myPage", async (req, res) => {
  res.sendFile(path.join(resourcePath, "/myPage/myPage.html"));
});

// 주문조회페이지 연결
viewRouter.get("/myOrder", async (req, res)=> {
  res.sendFile(path.join(resourcePath, "/myOrder/myOrder.html"));
})

// 관리자페이지 연결
viewRouter.get("/admin", async (req, res) => {
  res.sendFile(path.join(resourcePath, "/admin/admin.html"));
});

module.exports = { viewRouter };
