const productModel = require("../models/productModel");

class ProductService {
  constructor(productModel) {
    this.productModel = productModel;
  }

  // 상품 추가
  async addProduct(newProduct) {
    // 가장 최근의 제품 번호 찾기
    const lastProduct = await this.productModel
      .findOne()
      .sort({ product_number: -1 });

    // 제품 없으면 1, 있으면 기존값 +1
    const nextProductNumber = lastProduct ? lastProduct.product_number + 1 : 1;

    // 새 제품에 product_number 설정
    newProduct.product_number = nextProductNumber;
    const createdProduct = await this.productModel.create(newProduct);

    return createdProduct;
  }

  // 상품조회, 필드는 번호인지 이름인지 등
  async getProductsByField(fieldName, value) {
    const query = {};
    query[fieldName] = value;

    const products = await this.productModel.findOne(query);

    if (!products || products.length === 0) {
      throw new Error("상품 정보 없음");
    }

    return products;
  }

  // 번호로 조회
  async getProductByNumber(productNumber) {
    return await this.getProductsByField("product_number", productNumber);
  }

  // 이름으로 조회
  async getProductsByName(productName) {
    return await this.getProductsByField("product_name", productName);
  }

  // 검색기능을 위한 조회
  async searchProductByName(searchString) {
    const searchProducts = await this.productModel.find({
      product_name: { $regex: searchString, $options: "i" },
    });

    if (!searchProducts || searchProducts.length === 0) {
      return [];
    }

    return searchProducts;
  }

  // 상품 수정
  // 수정버튼 클릭시 해당 상품 번호 페이지로 이동
  // 예시 : localhost:3000/product/update/10
  // 여기서 10은 상품 번호
  async updateProduct(productNumber, updatedProduct) {
    const product = await this.productModel.findOneAndUpdate(
      { product_number: productNumber },
      updatedProduct,
      { new: true },
    );

    if (!product) {
      throw new Error("상품 정보 없음");
    }

    return product;
  }

  // 상품 삭제
  async deleteProduct(product_number) {
    const deletedProduct = await this.productModel.findOneAndDelete({
      product_number: product_number,
    });

    if (!deletedProduct) {
      throw new Error("상품 정보 없음");
    }

    return deletedProduct;
  }

  /* 페이징 하면서 불필요해 짐

  // 카테고리 상품 조회
  async getProductsByCategory(categoryType, categoryValue) {
    const query = {};
    if (
      categoryType !== "higher_category" &&
      categoryType !== "lower_category"
    ) {
      throw new Error("Invalid category type");
    }
    query[categoryType] = categoryValue;

    const products = await this.productModel.find(query);

    if (!products || products.length === 0) {
      throw new Error("카테고리에 해당하는 상품 정보 없음");
    }

    return products;
  }

  // 상위 카테고리로 조회
  async getProductsByHigherCategory(category) {
    return await this.getProductsByCategory("higher_category", category);
  }

  // 하위 카테고리로 조회
  async getProductsByLowerName(category) {
    return await this.getProductsByCategory("lower_category", category);
  }
  */

  // 페이징 처리를 위한 함수
  async pagingProducts(filter = {}, skip = 0, limit = 10) {
    return await this.productModel.find(filter).skip(skip).limit(limit);
  }
}

module.exports = ProductService;
