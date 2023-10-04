// 모든 페이지에서 공통으로 사용되는 컴포넌트를 정의하기 위한 파일입니다.
// header와 footer가 모든 페이지에서 공통으로 사용됩니다.

document.getElementById("header").innerHTML = /*html*/ ` 
<div>header</div>
<nav>
  <ul>
    <li><a href="/">홈</a></li>
    <li><a href="/products">상품리스트</a></li>
    <li><a href="/login">로그인</a></li>
  </ul>
</nav>`;

document.getElementById("footer").innerHTML = /*html*/ ` <div>footer</div>`;
