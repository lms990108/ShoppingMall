import {
  getCategoryMap,
  getCategoryNameFromCategoryId,
} from "../utils/catergoryHandler.js";

/* 상품 관리 section */
const product_manage_section = document.querySelector("#product_manage");

/* 상품 관리 table head 불러오기 */
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
        <div class="modal product_modal">
          <div class="modal-background"></div>
          <div class="modal-card">
            <header class="modal-card-head">
              <h2 class="modal-card-title">상품 추가</h2>
              <button class="delete close" aria-label="close"></button>
            </header>
            <section class="modal-card-body">

            </section>
            <footer class="modal-card-foot is-justify-content-center">
              <input class="button is-success submit-btn" type="submit" value="추가">
              <button class="button cancel">취소</button>
            </footer>
          </div>
        </div>`,
);

/* 전체 product 불러오기 */
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
  let target = null;
  products.forEach(async (product) => {
    productsTable.insertAdjacentHTML(
      "beforeend",
      `<tr>
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
      <td>      <button class="button patch_product_btn is-warning is-light is-small">수정</button>
      <button class="button is-danger is-light is-small">삭제</button></td>

      </tr>`,
    );
  });
  /* 수정 버튼 클릭 시 현재 상품의 정보를 같이 넘겨주어 모달 창에서 수정 가능하도록 함 */
  document.querySelectorAll(".patch_product_btn").forEach((btn, index) => {
    btn.addEventListener("click", () => {
      toggleModal();
      setProductModal("PATCH", products[index]);
    });
  });
};

/* 상품추가 or 상품수정에 따라 modal 구분하여 보여줌 */
const setProductModal = async (method, target = null) => {
  const title = document.querySelector(".modal-card-title");
  title.innerHTML = method === "ADD" ? "상품 추가" : "상품 수정";
  const submitBtn = document.querySelector(".submit-btn");
  submitBtn.innerHTML = method === "ADD" ? "추가" : "수정";
  const modal_card_body = document.querySelector(".modal-card-body");
  const category = await getCategoryMap();

  let modalHtml = "";
  modalHtml +=
    /*html*/
    `<form id="productForm">
      <div class="field">
        <label class="label" >상품명</label>
        <input class="input" type="text" name="product_name" value="${
          target ? target.product_name : ""
        }" />
      </div>
            <div class="field category-field">
        <label class="label">카테고리</label>
        <div class="control">
          <div class="select" >
            <select name="lower_category">`;

  /* 카테고리 선택 option 추가하기 */
  category.forEach(({ higher_category, lower_category }) => {
    lower_category.forEach((lowerItem) => {
      modalHtml += `<option value="${lowerItem.name}">${higher_category.name} - ${lowerItem.name}</option>`;
    });
  });

  modalHtml += `</select>
          </div>
        </div>
      <div class="field">
        <label class="label" >메인이미지 주소</label>
        <input class="input" type="text" name="main_img_url" value="${
          target ? target.main_img_url : ""
        }" />
      </div>
      <div class="field">
        <label class="label">추가이미지 주소</label>
        <input class="input" type="text" name="des_img_url" value="${
          target ? target.des_img_url : ""
        }" />
      </div>
      <div class="field">
        <label class="label">설명</label> <textarea class="textarea" name="content">${
          target ? target.content : ""
        }</textarea>
      </div>
      <div class="field">
        <label class="label">가격</label> <input class="input" type="number" name="price" value="${
          target ? target.price : 0
        }"/>
      </div>
      </div>
    </form>`;

  modal_card_body.innerHTML = modalHtml;

  const productForm = document.querySelector("#productForm");

  submitBtn.addEventListener("click", async (e) => {
    e.preventDefault();
    const productData = {};
    const formData = new FormData(productForm);

    formData.forEach((value, key) => {
      productData[key] = value;
    });

    /* lower_category 따라 higher_category 값 넣어주기 */
    const category = await getCategoryMap();
    category.forEach(({ higher_category, lower_category }) => {
      lower_category.forEach((lowerItem) => {
        if (lowerItem.name === productData.lower_category) {
          productData["higher_category"] = higher_category.name;
          console.log(higher_category.name);
          return higher_category.name;
        } else return null;
      });
    });

    productData["indate"] = method === "ADD" ? Date.now() : target.indate; // 상품 추가일때만
    console.log(productData);
    fetch("/api/add_product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => Promise.reject(data));
        }
        return response.json();
      })
      .then((data) => {
        console.log("Product added successfully:", data);
      })
      .catch((error) => {
        console.error("Error adding product:", error);
      });
  });
};

loadProducts();

const modal = document.querySelector(".modal");
const add_product_btn = document.querySelector(".add_product_btn");
const close_btn = document.querySelector(".close");
const cancel_btn = document.querySelector(".cancel");

const toggleModal = () => {
  modal.classList.toggle("is-active");
};

add_product_btn.addEventListener("click", () => {
  toggleModal();
  setProductModal("ADD");
});

close_btn.addEventListener("click", toggleModal);
cancel_btn.addEventListener("click", toggleModal);
