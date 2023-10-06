const { Router } = require("express");
const asyncHandler = require("../utils/async-handler");

const categoryService = require("../services/categoryService");
const categoryModel = require("../models/categoryModel");
const categoryServiceInstance = new categoryService(categoryModel);

// 상위 주소는 /order
const router = Router();

// CREATE: 카테고리 추가
// http://kdt-sw-6-team05.elicecoding.com/category/add_category
router.post(
  "/add_category",
  asyncHandler(async (req, res) => {
    const category = await categoryServiceInstance.createCategory(req.body);
    res.status(201).json(category);
  }),
);

// READ: 특정 카테고리 조회 (이름 기준)
// http://kdt-sw-6-team05.elicecoding.com/category/:categoryName
router.get(
  "/:categoryName",
  asyncHandler(async (req, res) => {
    const category = await categoryServiceInstance.getCategoryByName(
      req.params.categoryName,
    );
    res.status(200).json(category);
  }),
);

// READ: 모든 카테고리 조회
// http://kdt-sw-6-team05.elicecoding.com/category
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const categories = await categoryServiceInstance.getAllCategories();
    res.status(200).json(categories);
  }),
);

// UPDATE: 카테고리 업데이트 (이름 기준)
// http://kdt-sw-6-team05.elicecoding.com/category/:categoryName
router.put(
  "/:categoryName",
  asyncHandler(async (req, res) => {
    const updatedCategories = await categoryServiceInstance.updateCategory(
      req.params.categoryName,
      req.body,
    );
    res.status(200).json(updatedCategories);
  }),
);

// DELETE: 카테고리 삭제 (이름 기준)
// http://kdt-sw-6-team05.elicecoding.com/category/:categoryName
router.delete(
  "/:categoryName",
  asyncHandler(async (req, res) => {
    const updatedCategories = await categoryServiceInstance.deleteCategory(
      req.params.categoryName,
    );
    res.status(200).json(updatedCategories);
  }),
);

module.exports = router;
