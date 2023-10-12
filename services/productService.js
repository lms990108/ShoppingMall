const productModel = require("../models/productModel");
const categoryModel = require("../models/categoryModel");

class ProductService {
  constructor(productModel, categoryModel) {
    this.productModel = productModel;
    this.categoryModel = categoryModel;
  }

  // 상품 추가
  /** 예시 Json
{
  "product_name": "Cool Mechanical Keyboard",
  "main_img_url": "http://example.com/images/keyboard_main.jpg",
  "des_img_url": "http://example.com/images/keyboard_description.jpg",
  "content": "This is a high-quality mechanical keyboard with RGB lighting.",
  "price": 99.99,
  "higher_category": "키보드",
  "lower_category": "기계식",
  "inDate": "2023-10-06T12:00:00Z",
  "cnt": 10
}
   */
  async addProduct(newProduct) {
    // 가장 최근 제품의 번호 찾고, 새로운 제품의 번호 설정
    const lastProduct = await this.productModel
      .findOne()
      .sort({ product_number: -1 });
    const nextProductNumber = lastProduct ? lastProduct.product_number + 1 : 1;

    newProduct.product_number = nextProductNumber;

    // 카테고리 이름으로 ObjectId 를 검색해서 대체
    const higher_category = await categoryModel.findOne({
      name: newProduct.higher_category,
    });
    const lower_category = await categoryModel.findOne({
      name: newProduct.lower_category,
    });

    if (!higher_category || !lower_category) {
      throw new Error("Category not found");
    }

    newProduct.higher_category = higher_category._id;
    newProduct.lower_category = lower_category._id;

    return await this.productModel.create(newProduct);
  }

  // 데이터 여러개 한꺼번에 배열로 추가
  async addProducts(newProducts) {
    const lastProduct = await this.productModel
      .findOne()
      .sort({ product_number: -1 });
    let nextProductNumber = lastProduct ? lastProduct.product_number + 1 : 1;

    // 데이터 전처리
    const processedProducts = await Promise.all(
      newProducts.map(async (product) => {
        const higher_category = await categoryModel.findOne({
          name: product.higher_category,
        });
        const lower_category = await categoryModel.findOne({
          name: product.lower_category,
        });

        if (!higher_category || !lower_category) {
          throw new Error("Category not found");
        }

        return {
          ...product,
          product_number: nextProductNumber++,
          higher_category: higher_category._id,
          lower_category: lower_category._id,
        };
      }),
    );

    // 데이터 일괄 추가
    return await this.productModel.insertMany(processedProducts);
  }

  // 상품조회, 필드는 번호인지 이름인지 등
  async getProductByField(fieldName, value) {
    const query = {};
    query[fieldName] = value;

    const products = await this.productModel
      .findOne(query)
      .populate("higher_category lower_category");
    if (!products || products.length === 0) {
      throw new Error("상품 정보 없음");
    }
    return products;
  }

  // 번호로 조회
  async getProductByNumber(productNumber) {
    return await this.getProductByField("product_number", productNumber);
  }

  // 이름으로 조회
  async getProductByName(productName) {
    return await this.getProductByField("product_name", productName);
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

  /*
  상품 수정
  수정버튼 클릭시 해당 상품 번호 페이지로 이동
  예시 : localhost:3000/product/update/10
  여기서 10은 상품 번호
  만약 카테고리가 변경된다면 카테고리 정보를 포함
  카테고리를 변경하지 않는다면 누락해도 괜찮음.
  */
  async updateProduct(productNumber, updatedProduct) {
    const [higherCategory, lowerCategory] = await Promise.all([
      updatedProduct.higher_category
        ? categoryModel.findOne({ name: updatedProduct.higher_category })
        : null,
      updatedProduct.lower_category
        ? categoryModel.findOne({ name: updatedProduct.lower_category })
        : null,
    ]);

    if (higherCategory) {
      updatedProduct.higher_category = higherCategory;
    }
    if (lowerCategory) {
      updatedProduct.lower_category = lowerCategory;
    }

    const product = await this.productModel
      .findOneAndUpdate({ product_number: productNumber }, updatedProduct, {
        new: true,
      })
      .populate("higher_category lower_category");

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

  // 페이징 처리를 위한 함수
  async pagingProducts(filter = {}, skip = 0, limit = 10, sortType) {
    let sortTo;

    switch (sortType) {
      case "priceDesc":
        sortTo = { price: -1, product_number: 1 };
        break;
      case "priceAscend":
        sortTo = { price: 1, product_number: 1 };
        break;
      case "recent":
        sortTo = { inDate: -1, product_number: 1 };
        break;
      case "old":
        sortTo = { inDate: 1, product_number: -1 };
        break;
      default:
        sortTo = { product_number: 1 };
        break;
    }

    return await this.productModel
      .find(filter)
      .sort(sortTo)
      .skip(skip)
      .limit(limit);
  }
}

module.exports = ProductService;
