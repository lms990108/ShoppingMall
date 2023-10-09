const { Router } = require("express");
const asyncHandler = require("../utils/async-handler");

const categoryService = require("../services/categoryService");
const categoryModel = require("../models/categoryModel");
const categoryServiceInstance = new categoryService(categoryModel);

// 상위 주소는 /api/order
const router = Router();

// CREATE: 카테고리 추가
router.post(
  "/add_category",
  asyncHandler(async (req, res) => {
    const category = await categoryServiceInstance.createCategory(req.body);

    if (!category) {
      const error = new Error("카테고리를 생성할 수 없습니다");
      error.statusCode = 400;
      throw error;
    }

    res.status(201).json(category);
  }),
);

// READ: 특정 카테고리 조회 (이름 기준)
router.get(
  "/:categoryName",
  asyncHandler(async (req, res) => {
    const category = await categoryServiceInstance.getCategoryByName(
      req.params.categoryName,
    );

    if (!category) {
      const error = new Error("해당하는 카테고리가 없습니다.");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json(category);
  }),
);

// READ: 모든 카테고리 조회
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const categories = await categoryServiceInstance.getAllCategories();
    res.status(200).json(categories);
  }),
);

// UPDATE: 카테고리 업데이트 (이름 기준)
router.put(
  "/:categoryName",
  asyncHandler(async (req, res) => {
    const updatedCategory = await categoryServiceInstance.updateCategory(
      req.params.categoryName,
      req.body,
    );

    if (!updatedCategory) {
      const error = new Error("카테고리를 업데이트할 수 없습니다");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json(updatedCategory);
  }),
);

// DELETE: 카테고리 삭제 (이름 기준)
router.delete(
  "/:categoryName",
  asyncHandler(async (req, res) => {
    const deletedCategory = await categoryServiceInstance.deleteCategory(
      req.params.categoryName,
    );

    if (!deletedCategory) {
      const error = new Error("카테고리를 삭제할 수 없습니다");
      error.statusCode = 400;
      throw error;
    }

    res.status(200).json(deletedCategory);
  }),
);

module.exports = router;
