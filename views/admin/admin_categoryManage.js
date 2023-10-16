import { getCategoryMap } from "../utils/catergoryHandler.js";

/* 카테고리 관리 section */
const category_manage_section = document.querySelector("#category_manage");

category_manage_section.insertAdjacentHTML(
  "beforeend",
  `
        <table class="table">
          <tbody></tbody>
        </table>`,
);

const categoryTable = document.querySelector("#category_manage tbody");

const loadCategory = async () => {
  const category_map = await getCategoryMap();
  let categoryHtml = "";
  category_map.forEach(({ higher_category, lower_category }) => {
    categoryHtml += `<tr>
      <td class="higherCategory">${higher_category.name}</td>
      <td class="higherCategory"></td>
      </tr>`;
    lower_category.forEach((lowerItem) => {
      categoryHtml += `<tr>
      <td>${lowerItem.name}</td>
      <td>      <button class="button is-warning is-light is-small">수정</button>
      <button class="button is-danger is-light is-small">삭제</button></td>
      </tr>`;
    });
  });
  categoryTable.insertAdjacentHTML("beforeend", categoryHtml);
};

loadCategory();
