const { Router } = require("express");
const asyncHandler = require("../utils/async-handler");
const productModel = require("../models/productModel");
const productService = require("../services/productService");

const productServiceInstance = new productService(productModel);

const router = Router();

// 상품 추가 Post 요청
router.post(
  "/add_product",
  asyncHandler(async (req, res) => {
    const new_product = req.body;

    if (!new_product) {
      return res
        .status(400)
        .json({ error: "new_order is required in the body" });
    }

    const createdProduct = await productServiceInstance.addProduct(new_product);

    console.log("상품 추가");
    return res
      .status(201)
      .json({ message: "Product added successfully", order: createdProduct });
  }),
);

// 상품 조회 Get 요청
// 번호 조회 예시 : http://127.0.0.1:3000/product/product_detail/1
// 이름 조회 예시 : http://127.0.0.1:3000/product/product_detail/productname
router.get(
  "/product_detail/:searchParams",
  asyncHandler(async (req, res) => {
    let search_product;
    if (!isNaN(req.params.searchParams)) {
      // searchParams가 숫자라면
      search_product = await productServiceInstance.getProductByNumber(
        req.params.searchParams,
      );
    } else {
      // searchParams가 문자열이라면
      search_product = await productServiceInstance.getProductByName(
        req.params.searchParams,
      );
    }

    if (!search_product) {
      return res.status(404).send("Product not found");
    }

    return res.status(200).json(search_product);
  }),
);

// 상품 수정 Patch 요청
// 예시: http://127.0.0.1:3000/product/product_detail?productNumber=1
router.patch(
  "/product_detail",
  asyncHandler(async (req, res) => {
    if (!req.query.productNumber) {
      res.status(400).send("Product number is required");
      return;
    }

    const updatedProduct = await productServiceInstance.updateProduct(
      req.query.productNumber,
      req.body, // req.body에는 수정할 상품의 정보가 들어있어야 합니다.
    );

    if (!updatedProduct) {
      res.status(404).send("Product not found");
      return;
    }

    return res.status(200).json(updatedProduct);
  }),
);

// 상품 삭제
// 1번 상품 삭제 예시 : http://127.0.0.1:3000/product/delete_product/1
router.delete(
  "/delete_product/:product_number",
  asyncHandler(async (req, res) => {
    const { product_number } = req.params;
    const deletedProduct =
      await productServiceInstance.deleteProduct(product_number);
    if (!deletedProduct) {
      res.status(404).send("Product not found");
      return;
    }

    return res.status(200).json(deletedProduct);
  }),
);

// 페이징
/* 예시
기본 리스트 : http://127.0.0.1:3000/product/
2페이지 상품 : http://127.0.0.1:3000/product/?page=2
상위 카테고리 : http://127.0.0.1:3000/product/?higherCategory=clothing
하위 카테고리 3페이지 : http://127.0.0.1:3000/product/?lowerCategory=jeans&page=3
*/
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.pageSize) || 10;
    const skip = (page - 1) * pageSize;

    const filter = {};

    // 상위 카테고리와 하위 카테고리로 필터링하기 전에 이름을 ObjectId로 변경
    if (req.query.higherCategory) {
      const higherCategory = await Category.findOne({
        name: req.query.higherCategory,
      });
      if (higherCategory) {
        filter.higher_category = higherCategory._id;
      } else {
        return res.status(400).json({ error: "Invalid higherCategory" });
      }
    }

    if (req.query.lowerCategory) {
      const lowerCategory = await Category.findOne({
        name: req.query.lowerCategory,
      });
      if (lowerCategory) {
        filter.lower_category = lowerCategory._id;
      } else {
        return res.status(400).json({ error: "Invalid lowerCategory" });
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

// 삭제한 로직

/*
// 카테고리별 상품 조회 Get 요청
// http://127.0.0.1:3000/product/category?higherCategory=clothing
// http://127.0.0.1:3000/product/category?lowerCategory=jeans
router.get(
  "/category",
  asyncHandler(async (req, res) => {
    let products;

    // 상위 카테고리로 상품 전체 조회
    if (req.query.higherCategory) {
      products = await productServiceInstance.getProductsByHigherCategory(
        req.query.higherCategory,
      );
    }
    // 하위 카테고리로 상품 전체 조회
    else if (req.query.lowerCategory) {
      products = await productServiceInstance.getProductsByLowerCategory(
        req.query.lowerCategory,
      );
    } else {
      // 기본 로직 또는 에러 처리
      res.status(400).send("Invalid query parameters");
      return;
    }

    return res.status(200).json(products);
  }),
);
*/
