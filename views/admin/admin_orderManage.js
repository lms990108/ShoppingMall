const order_manage_section = document.querySelector("#order_manage");
order_manage_section.insertAdjacentHTML(
  "beforeend",
  `        <div class="btn_container">
          <button class="add_product_btn button is-primary is-light is-small">
            주문추가
          </button>
        </div>
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
