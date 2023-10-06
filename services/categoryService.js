const categoryModel = require("../models/categoryModel");

class categoryService {
  constructor(categoryModel) {
    this.categoryModel = categoryModel;
  }

  async getAllCategories() {
    return await this.categoryModel.find().exec();
  }

  async createCategory(data) {
    const category = new this.categoryModel(data);
    await category.save();
    return this.getAllCategories();
  }

  async getCategoryByName(categoryName) {
    const category = await this.categoryModel
      .findOne({ name: categoryName })
      .exec();
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }

  async updateCategory(categoryName, data) {
    const updatedCategory = await this.categoryModel
      .findOneAndUpdate({ name: categoryName }, data, { new: true })
      .exec();
    if (!updatedCategory) {
      throw new Error("Category not found");
    }
    return this.getAllCategories();
  }

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
