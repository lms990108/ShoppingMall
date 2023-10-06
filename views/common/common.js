// 모든 페이지에서 공통으로 사용되는 요소들을 정의하기 위한 파일입니다.

/* head 태그 */
/* favicon 적용, bulma 사용 */
document.querySelector("head").innerHTML += /*html*/ `
    <link rel="icon" href="/common/favicon.ico" type="image/x-icon" sizes="16x16">
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"
    />`;

/* header(navigator) */
let str = "";
fetch("common/mockCategory.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok" + response.statusText);
    }
    return response.json();
  })
  .then((category) => {
    category.forEach(({ higher_category, lower_category }) => {
      str += `<div class="navbar-item is-hoverable has-dropdown">
    <a class="navbar-link is-arrowless" href="/product/?higherCategory=${higher_category.url}">${higher_category.name}</a>
    <div class="navbar-dropdown">`;
      lower_category.forEach(({ name, url }) => {
        str += `<a class = "navbar-item" href = "/product/?lowerCategory=${url}">${name}</a>`;
      });
      str += `</div>
    </div>`;
    });
    document.getElementById("header").innerHTML = /*html*/ ` 
<div>
    <section class="header_top">[OPEN EVENT] 전품목 무료배송 이벤트 <a href="/products">상품 구경하기</a></section>
    <div class="header_bottom">
        <a class="header_logo" href="/">
            <img src="/common/logo.png">
        </a>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <a class="navbar-link is-arrowless" href="/">홈</a>
            ${str}
        </nav>
        <div>
            <input type="text">
            <svg clip-rule="evenodd" fill-rule="evenodd" stroke-linejoin="round" stroke-miterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="m15.97 17.031c-1.479 1.238-3.384 1.985-5.461 1.985-4.697 0-8.509-3.812-8.509-8.508s3.812-8.508 8.509-8.508c4.695 0 8.508 3.812 8.508 8.508 0 2.078-.747 3.984-1.985 5.461l4.749 4.75c.146.146.219.338.219.531 0 .587-.537.75-.75.75-.192 0-.384-.073-.531-.22zm-5.461-13.53c-3.868 0-7.007 3.14-7.007 7.007s3.139 7.007 7.007 7.007c3.866 0 7.007-3.14 7.007-7.007s-3.141-7.007-7.007-7.007z" fill-rule="nonzero" /></svg>
        </div>
        <div>
            <a href="/login">로그인</a>
            <a href="/cart"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.558 7l4.701-4.702c.199-.198.46-.298.721-.298.613 0 1.02.505 1.02 1.029 0 .25-.092.504-.299.711l-3.26 3.26h-2.883zm12.001 0h2.883l-4.701-4.702c-.199-.198-.46-.298-.721-.298-.613 0-1.02.505-1.02 1.029 0 .25.092.504.299.711l3.26 3.26zm3.703 4l-.016.041-3.598 8.959h-9.296l-3.597-8.961-.016-.039h16.523zm3.738-2h-24v2h.643c.534 0 1.021.304 1.256.784l4.101 10.216h12l4.102-10.214c.233-.481.722-.786 1.256-.786h.642v-2z"/></svg></a>
            <a href="/mypage"><svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z"/></svg></a>
        </div>
    </div>
</div>`;
  });

/* footer */

document.getElementById("footer").innerHTML = /*html*/ ` <div>footer</div>`;
