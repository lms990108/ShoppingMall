// 모든 페이지에서 공통으로 사용되는 요소들을 정의하기 위한 파일입니다.
import { getLowerCategory } from "../utils/catergoryHandler.js";
const url = "http://localhost:5001";

/* head 태그 */
/* favicon 적용, bulma 사용 */
const headTag = document.querySelector("head");
headTag.insertAdjacentHTML(
  "beforeend",
  /*html*/
  `
    <link rel="icon" href="/common/favicon.ico" type="image/x-icon" sizes="16x16">
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"
    />`,
);

/* header(navigator) */
const header = document.getElementById("header");

header.insertAdjacentHTML(
  "beforeend",
  /*html*/
  ` <div>
    <section class="header_top">[OPEN EVENT] 전품목 무료배송 이벤트 <a href="/products?higherCategory=키보드">상품 구경하기</a></section>
    <section class="header_bottom">
        <a class="header_logo" href="/" alt="DevGear logo">
            <img src="/common/logo.png">
        </a>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-menu">
                <div class="navbar-start">
                    <a class="navbar-link is-arrowless" href="/">홈</a>
                </div>
            </div>
        </nav>

        <div class="header_bottom_right">
            <!-- <div class="search">
                <input class="input is-small" type="text" placeholder="상품 검색하기">
                <button class="button is-small is-white ">
                    <span class="icon is-small">
                        <i class="fas fa-heading"> <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z" fill-rule="nonzero" />
                            </svg></i>
                    </span>
                </button>
            </div> 
            -->
            <div>
                <a href="/cart"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M13.5 21c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m-6 2c-.276 0-.5-.224-.5-.5s.224-.5.5-.5.5.224.5.5-.224.5-.5.5m0-2c-.828 0-1.5.672-1.5 1.5s.672 1.5 1.5 1.5 1.5-.672 1.5-1.5-.672-1.5-1.5-1.5m16.5-16h-2.964l-3.642 15h-13.321l-4.073-13.003h19.522l.728-2.997h3.75v1zm-22.581 2.997l3.393 11.003h11.794l2.674-11.003h-17.861z"/></svg>
                <a id="myPageButton" class="" href="/mypage"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z" /></svg></a>
                <a id="adminPageButton" class="is-hidden" href="/admin"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 8.666c-1.838 0-3.333 1.496-3.333 3.334s1.495 3.333 3.333 3.333 3.333-1.495 3.333-3.333-1.495-3.334-3.333-3.334m0 7.667c-2.39 0-4.333-1.943-4.333-4.333s1.943-4.334 4.333-4.334 4.333 1.944 4.333 4.334c0 2.39-1.943 4.333-4.333 4.333m-1.193 6.667h2.386c.379-1.104.668-2.451 2.107-3.05 1.496-.617 2.666.196 3.635.672l1.686-1.688c-.508-1.047-1.266-2.199-.669-3.641.567-1.369 1.739-1.663 3.048-2.099v-2.388c-1.235-.421-2.471-.708-3.047-2.098-.572-1.38.057-2.395.669-3.643l-1.687-1.686c-1.117.547-2.221 1.257-3.642.668-1.374-.571-1.656-1.734-2.1-3.047h-2.386c-.424 1.231-.704 2.468-2.099 3.046-.365.153-.718.226-1.077.226-.843 0-1.539-.392-2.566-.893l-1.687 1.686c.574 1.175 1.251 2.237.669 3.643-.571 1.375-1.734 1.654-3.047 2.098v2.388c1.226.418 2.468.705 3.047 2.098.581 1.403-.075 2.432-.669 3.643l1.687 1.687c1.45-.725 2.355-1.204 3.642-.669 1.378.572 1.655 1.738 2.1 3.047m3.094 1h-3.803c-.681-1.918-.785-2.713-1.773-3.123-1.005-.419-1.731.132-3.466.952l-2.689-2.689c.873-1.837 1.367-2.465.953-3.465-.412-.991-1.192-1.087-3.123-1.773v-3.804c1.906-.678 2.712-.782 3.123-1.773.411-.991-.071-1.613-.953-3.466l2.689-2.688c1.741.828 2.466 1.365 3.465.953.992-.412 1.082-1.185 1.775-3.124h3.802c.682 1.918.788 2.714 1.774 3.123 1.001.416 1.709-.119 3.467-.952l2.687 2.688c-.878 1.847-1.361 2.477-.952 3.465.411.992 1.192 1.087 3.123 1.774v3.805c-1.906.677-2.713.782-3.124 1.773-.403.975.044 1.561.954 3.464l-2.688 2.689c-1.728-.82-2.467-1.37-3.456-.955-.988.41-1.08 1.146-1.785 3.126"/></svg></a>
                <a id="logInButton" class="button is-success is-light is-small" href="/login">로그인</a>
                <a id="logOutButton" class="button is-danger is-light is-small" >로그아웃</a>
            </div>
        </div>
    </section>
</div>`,
);

const logInButton = document.querySelector("#logInButton");
const logOutButton = document.querySelector("#logOutButton");
const myPageButton = document.querySelector("#myPageButton");
const adminPageButton = document.querySelector("#adminPageButton");

logOutButton.addEventListener("click", () => {
  localStorage.removeItem("token");
  alert("로그아웃 되었습니다.");
  location.reload();
});
document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  if (token) {
    logInButton.classList.add("is-hidden");
    logOutButton.classList.remove("is-hidden");
    try {
      const response = await fetch(`${url}/api/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { level } = await response.json();
      if (response.ok && level === 1) {
        myPageButton.classList.add("is-hidden");
        adminPageButton.classList.remove("is-hidden");
      } else {
        adminPageButton.classList.add("is-hidden");
        myPageButton.classList.remove("is-hidden");
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    logInButton.classList.remove("is-hidden");
    logOutButton.classList.add("is-hidden");
  }
});

/* Category nav 띄우기 위한 HTML 생성 */
const generateCategoryHtml = (higher_category_name, lower_category) => {
  let categoryHtml = "";
  categoryHtml += `<div class="navbar-item is-hoverable has-dropdown">
   <a class="navbar-link is-arrowless" href="/products?higherCategory=${higher_category_name}">${higher_category_name}</a>
  <div class="navbar-dropdown">`;
  lower_category.forEach((lowerItem) => {
    categoryHtml += `<a class="navbar-item" href="/products?higherCategory=${higher_category_name}&lowerCategory=${lowerItem.name}">${lowerItem.name}</a>`;
  });
  categoryHtml += `</div>
    </div>`;
  return categoryHtml;
};

/* category nav HTML 화면에 보이기 */
const loadCategory = async () => {
  const higher_category = ["키보드", "마우스", "음향장비", "기타"];
  const categoryDiv = document.querySelector(".navbar-start");
  higher_category.forEach(async (higherItem) => {
    const lower_category = await getLowerCategory(higherItem);
    categoryDiv.insertAdjacentHTML(
      "beforeend",
      generateCategoryHtml(higherItem, lower_category),
    );
  });
};

loadCategory();

/* footer */
const footer = document.getElementById("footer");
footer.insertAdjacentHTML(
  "beforeend",
  /*html*/
  ` <div>
  <div class="footer_first">
  (주) DevGear<br>
서울특별시 성동구 123<br>
대표이사 : team.code blue<br>
사업자등록번호 : 123-45-67890<br>
통신판매업신고 : 성동 54321호<br>
</div>
  <div class="footer_second">이 사이트는 상업적 목적이 아닌 
학업적 목적의 가상 쇼핑몰로서, <br>
아래 출처의 데이터들을 포함하고 있습니다.<br><br>

주식회사 투비네트웍스 글로벌 (키크론)<br>
melgeek (멜긱)
hottracks (핫트랙스)<br>

</div>
  <div class="footer_third"><img src="/common/logo2.png"></div>
</div>`,
);
