const order_manage_section = document.querySelector("#order_manage");
order_manage_section.insertAdjacentHTML(
  "beforeend",
  /*html*/ `
  <table class="table">
      <thead>
          <tr>
              <th title="num">주문번호</th>
              <th title="userID">사용자 ID</th>
              <th title="products">주문상품</th>
              <th title="price">총 가격</th>
              <th title="shipTo">배송지</th>
              <th title="contact">연락처</th>
              <th title="status">배송상태</th>
          </tr>
      </thead>
      <tbody></tbody>
  </table>`,
);
