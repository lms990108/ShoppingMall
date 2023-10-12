import {
  getCategoryMap,
  getCategoryNameFromCategoryId,
} from "../utils/catergoryHandler.js";
import { toggleModal } from "./admin.js";

const url = "http://localhost:5001/api/product"; // api 요청 endpoint
let currentPage = 1; // 현재 페이지

/* 상품 관리 section */
const product_manage_section = document.querySelector("#product_manage");

/* 상품 관리 table head 불러오기 */
const loadProductTable = () => {
  product_manage_section.insertAdjacentHTML(
    "beforeend",
    /*html*/ `
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
              <th title="button"></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
        <nav class="pagination is-centered m-2" role="navigation" aria-label="pagination">
  <ul class="pagination-list">

  </ul>
</nav> `,
  );
  /* 페이지네이션 */
  const pagination = document.querySelector(".pagination-list");

  const updatePagination = (newPage) => {
    document.querySelectorAll(".pagination-link").forEach((pageLink, index) => {
      if (index + 1 === newPage) {
        pageLink.classList.add("is-current");
      } else {
        pageLink.classList.remove("is-current");
      }
    });
  };

  for (let i = 1; i <= 5; i++) {
    const pageItem = document.createElement("li");
    const pageLink = document.createElement("a");

    pageLink.className = "pagination-link";

    pageLink.textContent = i;

    if (i === currentPage) {
      pageLink.classList.add("is-current");
    }

    pageLink.addEventListener("click", () => {
      currentPage = i;
      loadProducts(i);
      updatePagination(i); // 페이지네이션 업데이트
    });

    pageItem.appendChild(pageLink);
    pagination.appendChild(pageItem);
  }
  loadProducts(currentPage);
};

/* 전체 product 불러오기 , pagination 미구현 */
const getAllProducts = async (page) => {
  try {
    const response = await fetch(`${url}/?page=${page}`, {
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

const loadProducts = async (page) => {
  const productsTable = document.querySelector("#product_manage tbody");
  const { products } = await getAllProducts(page);
  productsTable.innerHTML = "";
  for (const product of products) {
    const higher_category = await getCategoryNameFromCategoryId(
      product.higher_category,
    );
    const lower_category = await getCategoryNameFromCategoryId(
      product.lower_category,
    );
    productsTable.insertAdjacentHTML(
      "beforeend",
      `<tr>
      <td>${product.product_number}</td>
      <td>${product.product_name}</td>
      <td><img src="${product.main_img_url}"></td>
      <td><img src="${product.des_img_url}"></td>
      <td>${product.content}</td>
      <td>${product.price}</td>
      <td>${higher_category}</td>
      <td>${lower_category}</td>
      <td>${new Date(product.inDate).toLocaleString()}</td>
      <td>      <button class="button patch_product_btn is-warning is-light is-small">수정</button>
      <button class="button delete_product_btn is-danger is-light is-small">삭제</button></td>
      </tr>`,
    );
  }

  /* 수정 버튼 클릭 시 현재 상품의 정보를 같이 넘겨주어 모달 창에서 수정 가능하도록 함 */
  document.querySelectorAll(".patch_product_btn").forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      const target = products[index];
      e.preventDefault();
      toggleModal();
      setProductModal("PATCH", target);
    });
  });

  /* 삭제 버튼 클릭 시  confirn창 띄우고 상품 삭제 */
  document.querySelectorAll(".delete_product_btn").forEach((btn, index) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const target = products[index];
      if (confirm(`${target.product_name}을 삭제하시겠습니까?`)) {
        fetch(`${url}/delete_product/${parseInt(target.product_number)}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(target),
        })
          .then((response) => {
            if (!response.ok) {
              return response.json().then((data) => Promise.reject(data));
            }
            return response.json();
          })
          .then((data) => {
            alert(`상품이 삭제되었습니다.`);
            location.reload();
          })
          .catch((error) => {
            alert(`상품 삭제에 실패했습니다. \n ${error.message}`);
          });
      }
    });
  });
};

/* 상품추가 or 상품수정에 따라 modal 구분하여 보여줌 */
const setProductModal = async (method, target = null) => {
  let api_url = `${url}`;
  let method_korean = "";
  console.log(method);
  switch (method) {
    case "POST": {
      api_url = `${url}/add_product`;
      method_korean = "추가";
      break;
    }
    case "PATCH": {
      api_url = `${url}/product_detail/${parseInt(target.product_number)}`;
      method_korean = "수정";
      break;
    }
  }

  const title = document.querySelector(".modal-card-title");
  const submitBtn = document.querySelector(".submit-btn");

  title.innerHTML = `상품 ${method_korean}`;
  submitBtn.value = method_korean;

  const category = await getCategoryMap();

  let modalHtml = "";
  modalHtml +=
    /*html*/
    `<form id="productForm">
      <div class="field">
        <label class="label" >상품명</label>
        <input class="input" type="text" name="product_name" value="${
          target ? target.product_name : ""
        }" placeholder="상품의 이름을 입력해 주세요." />
      </div>
            <div class="field category-field">
        <label class="label">카테고리</label>
        <div class="control">
          <div class="select" >
            <select name="lower_category">`;

  /* 카테고리 선택 option 추가하기 */
  category.forEach(({ higher_category, lower_category }) => {
    lower_category.forEach((lowerItem) => {
      if (target && target.lower_category === lowerItem._id) {
        // 상품 수정시, 해당 상품에 해당하는 카테고리가 기본 선택
        modalHtml += `<option selected value="${lowerItem.name}">${higher_category.name} - ${lowerItem.name}</option>`;
      } else {
        modalHtml += `<option value="${lowerItem.name}">${higher_category.name} - ${lowerItem.name}</option>`;
      }
    });
  });

  modalHtml += `</select>
          </div>
        </div>
      <div class="field">
        <label class="label" >메인 이미지 주소</label>
        <input class="input" type="text" name="main_img_url" value="${
          target ? target.main_img_url : ""
        }"  placeholder="메인 이미지 주소를 입력해 주세요."/>
      </div>
      <div class="field">
        <label class="label">추가 이미지 주소</label>
        <input class="input" type="text" name="des_img_url" value="${
          target ? target.des_img_url : ""
        }" placeholder="상세 이미지 주소를 입력해 주세요."/>
      </div>
      <div class="field">
        <label class="label">설명</label> <textarea class="textarea" name="content" placeholder="상품을 잘 표현할 수 있는 설명을 입력해 주세요.">${
          target ? target.content : ""
        } </textarea>
      </div>
      <div class="field">
        <label class="label">가격</label> <input class="input" type="number" name="price" value="${
          target ? target.price : 0
        }"/>
      </div>
      </div>
    </form>`;

  const modal_card_body = document.querySelector(".modal-card-body");
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
          return higher_category.name;
        } else return null;
      });
    });

    fetch(api_url, {
      method: method,
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
        alert(`상품이 ${method_korean}되었습니다.`);
        toggleModal();
        location.reload();
      })
      .catch((error) => {
        alert(`상품 ${method_korean}에 실패했습니다. \n ${error.message}`);
        console.error(error);
      });
  });
};

loadProductTable();

export { setProductModal };
