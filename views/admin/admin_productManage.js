const product_manage_section = document.querySelector("#product_manage");
product_manage_section.insertAdjacentHTML(
  "beforeend",
  /*html*/ `
        <div class="btn_container">
          <button class="add_product_btn button is-primary is-light is-small">
            상품추가
          </button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th title="num">상품 번호</th>
              <th title="name">상품명</th>
              <th title="main_img_url">메인이미지</th>
              <th title="des_img_url">추가이미지</th>
              <th title="content">설명</th>
              <th title="price">가격</th>
              <th title="higher_category">상위카테고리</th>
              <th title="lower_category">하위카테고리</th>
              <th title="indate">생성일자</th>
              <th title="cnt">조회수</th>
              <th title="button"></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <div class="modal">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <h2 class="modal-card-title">상품 추가</h2>
              <button class="delete" aria-label="close"></button>
            </header>
            <section class="modal-card-body">
              <div><span>상품명</span> <input type="text" /></div>
              <div><span>메인이미지 주소</span> <input type="text" /></div>
              <div><span>추가이미지 주소</span> <input type="text" /></div>
              <div><span>설명</span> <input type="text" /></div>
              <div><span>가격</span> <input type="number" /></div>
              <div>
                <span>상위카테고리</span>
                <select type="number">
                  <option value="키보드">키보드</option>
                </select>
              </div>
            </section>
            <footer class="modal-card-foot">
              <button class="button is-success">추가</button>
              <button class="button">취소</button>
            </footer>
          </div>
        </div>`,
);

const getAllProducts = async () => {
  try {
    const response = await fetch("http://localhost:5001/api/product", {
      method: "GET",
    });
    const products = await response.json();
    return products;
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
};

/* 상품관리 테이블 불러오기 */

const productsTable = document.querySelector("#product_manage tbody");
const loadProducts = async () => {
  const products = await getAllProducts();
  let productsHtml = "";
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
  productsTable.insertAdjacentHTML("beforeend", productsHtml);
};

const modal = document.querySelector(".modal");
const add_product_btn = document.querySelector(".add_product_btn");
const close_btn = document.querySelector(".delete");

const toggleModal = () => {
  modal.classList.toggle("is-active");
};

add_product_btn.addEventListener("click", toggleModal);
close_btn.addEventListener("click", toggleModal);

loadProducts();
