const categoryModel = require("../models/categoryModel");

class categoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  /**
   * 모든 카테고리를 조회합니다.
   * @returns {Array} 모든 카테고리의 배열을 반환합니다.
   */
  async getAllCategories() {
    return await this.categoryModel.find().exec();
  }

  /**
   * 새로운 카테고리를 생성합니다.
   * @param {Object} data - 생성할 카테고리의 데이터입니다.
   */
  async createCategory(data) {
    const createNewCategory = await this.categoryModel.create(data);
    return createNewCategory;
  }

  /**
   * 카테고리 이름으로 카테고리를 조회합니다.
   * @param {string} categoryName - 조회할 카테고리의 이름입니다.
   * @returns {Object} 조회된 카테고리를 반환합니다.
   */
  async getCategoryByName(categoryName) {
    const category = await this.categoryModel
      .findOne({ name: categoryName })
      .exec();
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }

  /**
   * 카테고리 이름을 기준으로 카테고리를 수정합니다.
   * @param {string} categoryName - 수정할 카테고리의 이름입니다.
   * @param {Object} data - 수정할 데이터입니다.
   * @returns {Array} 모든 카테고리의 배열을 반환합니다.
   */
  async updateCategory(categoryName, data) {
    const updatedCategory = await this.categoryModel
      .findOneAndUpdate({ name: categoryName }, data, { new: true })
      .exec();
    if (!updatedCategory) {
      throw new Error("Category not found");
    }
    return this.getAllCategories();
  }

  /**
   * 카테고리 이름을 기준으로 카테고리를 삭제합니다.
   * @param {string} categoryName - 삭제할 카테고리의 이름입니다.
   * @returns {Array} 모든 카테고리의 배열을 반환합니다.
   */
  async deleteCategory(categoryName) {
    const deletedCategory = await this.categoryModel
      .findOneAndDelete({ name: categoryName })
      .exec();
    if (!deletedCategory) {
      throw new Error("Category not found");
    }
    return this.getAllCategories();
  }
}

module.exports = categoryService;
