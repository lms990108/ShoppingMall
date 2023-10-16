import { setProductModal } from "./admin_productManage.js";

const product_manage_section = document.querySelector("#product_manage");
const category_manage_section = document.querySelector("#category_manage");
const order_manage_section = document.querySelector("#order_manage");

const add_btn = document.querySelector(".add_btn");
const modal = document.querySelector(".modal");
const close_btn = document.querySelector(".close");
const cancel_btn = document.querySelector(".cancel");
const token = localStorage.getItem("token");

/* 관리자가 아닌데 관리자페이지 접근 시 접근 막고, 이전페이지로 이동함 */
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch(`/api/user`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const { level } = await response.json();
    if (!response.ok || (response.ok && level != 1)) {
      alert("페이지 접근 권한이 없습니다.\n이전 페이지로 이동합니다.");
      history.go(-1);
    }
  } catch {}
});

/* 모달 창의 toggle 기능 구현 */
const toggleModal = () => {
  modal.classList.toggle("is-active");
};

close_btn.addEventListener("click", toggleModal);
cancel_btn.addEventListener("click", toggleModal);

/* tab의 값에 따라 관리하고자하는 target 화면 보여주기 */
const tabs = Array.prototype.slice.call(
  document.querySelectorAll("#tabs li"),
  0,
);
const contents = Array.prototype.slice.call(
  document.querySelectorAll(".content-tab"),
  0,
);
add_btn.innerHTML = "상품 추가";

if (product_manage_section.classList.contains("is-active")) {
  add_btn.addEventListener("click", () => {
    toggleModal();
    setProductModal("POST");
  });
}

tabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("is-active"));
    tab.classList.add("is-active");

    contents.forEach((c) => c.classList.remove("is-active"));
    document.getElementById(contents[index].id).classList.add("is-active");

    if (category_manage_section.classList.contains("is-active")) {
      add_btn.innerHTML = "카테고리 추가";
      add_btn.addEventListener("click", () => {
        toggleModal();
      });
    } else if (product_manage_section.classList.contains("is-active")) {
      add_btn.innerHTML = "상품 추가";
      add_btn.addEventListener("click", () => {
        toggleModal();
        setProductModal("POST");
      });
    } else if (order_manage_section.classList.contains("is-active")) {
      add_btn.innerHTML = "주문 추가";
      add_btn.addEventListener("click", () => {
        toggleModal();
      });
    }
  });
});

export { toggleModal };
