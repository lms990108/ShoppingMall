/* 상품관리 테이블 불러오기 */

const productsTable = document.querySelector("tbody");
const loadProducts = async () => {
  let productsHtml = "";
  try {
    const res = await fetch("../admin/mockProducts.json");
    const products = await res.json();
    products.forEach((product) => {
      productsHtml += `<tr>
      <td>${product.product_number}</td>
      <td>${product.product_name}</td>
      <td>${product.main_img_url}</td>
      <td>${product.des_img_url}</td>
      <td>${product.content}</td>
      <td>${product.price}</td>
      <td>${product.higher_category}</td>
      <td>${product.lower_category}</td>
      <td>${new Date(product.indate).toLocaleString()}</td>
      <td>${product.cnt}</td>
      <td>      <button class="button is-warning is-light is-small">수정</button>   
      <button class="button is-danger is-light is-small">삭제</button></td>

      </tr>`;
    });
  } catch (error) {
    console.error("Failed to load category:", error);
  }
  productsTable.insertAdjacentHTML("beforeend", productsHtml);
};

loadProducts();
