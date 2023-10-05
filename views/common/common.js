// 모든 페이지에서 공통으로 사용되는 요소들을 정의하기 위한 파일입니다.

/* head 태그 */
/* bulma 사용 */
document.querySelector("head").innerHTML += /*html*/ `
    <link
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"
    />`;

/* header(navigator) */

document.getElementById("header").innerHTML = /*html*/ ` 
<div>header</div>
<nav>
  <ul>
    <li><a href="/">홈</a></li>
    <li><a href="/products">상품리스트</a></li>
    <li><a href="/login">로그인</a></li>
  </ul>
</nav>`;

/* footer */

document.getElementById("footer").innerHTML = /*html*/ ` <div>footer</div>`;
