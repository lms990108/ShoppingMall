const { Router } = require("express");
const asyncHandler = require("../utils/async-handler");
const productModel = require("../models/productModel");
const productService = require("../services/productService");
const Category = require("../models/categoryModel");
const { authenticate } = require("../middlewares/authentication");
const { checkUserOrAdmin } = require("../middlewares/authorization");

const productServiceInstance = new productService(productModel);

const router = Router();

// 상품 추가 Post 요청
router.post(
  "/add_product",
  authenticate,
  checkUserOrAdmin,
  asyncHandler(async (req, res) => {
    const new_product = req.body;
    const { user } = req;

    if (user.level != 1) {
      const error = new Error("관리자 권한이 필요합니다.");
      error.statusCode = 403;
      throw error;
    }

    if (!new_product || Object.keys(new_product).length === 0) {
      const error = new Error("상품 데이터가 요청 본문에 필요합니다");
      error.statusCode = 400;
      throw error;
    }

    const createdProduct = await productServiceInstance.addProduct(new_product);

    console.log("상품 추가");
    return res.status(201).json({
      message: "상품이 성공적으로 추가되었습니다",
      order: createdProduct,
    });
  }),
);

// 상품 조회 Get 요청
router.get(
  "/product_detail/:searchParams",
  asyncHandler(async (req, res) => {
    let search_product;
    if (!isNaN(req.params.searchParams)) {
      search_product = await productServiceInstance.getProductByNumber(
        req.params.searchParams,
      );
    } else {
      search_product = await productServiceInstance.getProductByName(
        req.params.searchParams,
      );
    }

    if (!search_product) {
      const error = new Error("상품을 찾을 수 없습니다");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json(search_product);
  }),
);

// 상품 수정 Patch 요청
router.patch(
  "/product_detail/:productNumber",
  authenticate,
  checkUserOrAdmin,
  asyncHandler(async (req, res) => {
    const { productNumber } = req.params;
    const { user } = req;

    if (user.level != 1) {
      const error = new Error("관리자 권한이 필요합니다.");
      error.statusCode = 403;
      throw error;
    }

    if (!productNumber) {
      const error = new Error("상품 번호가 필요합니다");
      error.statusCode = 400;
      throw error;
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      const error = new Error("업데이트할 상품 데이터가 필요합니다");
      error.statusCode = 400;
      throw error;
    }

    const updatedProduct = await productServiceInstance.updateProduct(
      productNumber,
      req.body,
    );

    if (!updatedProduct) {
      const error = new Error("상품을 찾을 수 없거나 업데이트되지 않았습니다");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json(updatedProduct);
  }),
);

// 상품 삭제
router.delete(
  "/delete_product/:product_number",
  authenticate,
  checkUserOrAdmin,
  asyncHandler(async (req, res) => {
    const { product_number } = req.params;
    const { user } = req;

    if (user.level != 1) {
      const error = new Error("관리자 권한이 필요합니다.");
      error.statusCode = 403;
      throw error;
    }

    const deletedProduct =
      await productServiceInstance.deleteProduct(product_number);
    if (!deletedProduct) {
      res.status(404).send("상품을 찾을 수 없습니다");
      return;
    }

    return res.status(200).json(deletedProduct);
  }),
);

// 페이징
/** 예시
 * 기본 리스트 : http://127.0.0.1:3000/product/
 * 2페이지 상품 : http://127.0.0.1:3000/product/?page=2
 * 상위 카테고리 : http://127.0.0.1:3000/product/?higherCategory=clothing
 * 하위 카테고리 3페이지 : http://127.0.0.1:3000/product/?lowerCategory=jeans&page=3
 */
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const filter = {};

    if (req.query.higherCategory) {
      // console.log("상위 카테고리 = " + req.query.higherCategory);

      const higherCategory = await Category.findOne({
        name: req.query.higherCategory,
      });
      if (higherCategory) {
        filter.higher_category = higherCategory._id;
        console.log("상위 카테고리 id = " + filter.higher_category);
      } else {
        return res
          .status(400)
          .json({ error: "유효하지 않은 상위 카테고리입니다" });
      }
    } else if (req.query.lowerCategory) {
      // console.log("하위 카테고리 = " + req.query.lowercategory);

      const lowerCategory = await Category.findOne({
        name: req.query.lowerCategory,
      });
      if (lowerCategory) {
        filter.lower_category = lowerCategory._id;
        console.log("하위 카테고리 id = " + filter.lower_category);
      } else {
        return res
          .status(400)
          .json({ error: "유효하지 않은 하위 카테고리입니다" });
      }
    }

    const products = await productServiceInstance.pagingProducts(
      filter,
      skip,
      pageSize,
    );

    return res.status(200).json(products);
  }),
);

module.exports = router;
