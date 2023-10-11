const url = "http://localhost:5001";

const orderProduct_info = document.querySelector("#orderProduct_info");
const orderer_info = document.querySelector("#orderer_info");
const delivery_info = document.querySelector("#delivery_info");
const order_summary = document.querySelector("#order_summary");
const payment_method = document.querySelector("#payment_method");
const payment_modal = document.querySelector("#payment_modal");
const payment_button = document.querySelector(
  "#payment_buttonContainer button",
);
const close_btn = document.querySelector(".close");
const cancel_btn = document.querySelector(".cancel");
const modal_content = document.querySelector(".modal-card-body table");

/* 주문 정보 mockData */
let order_info = {
  destination: {
    name: "",
    address: "",
    city: "",
    zip: "",
  },
  contact: { phone: "", email: "" },
  items: [],
};

/* 단일 상품 정보 컴포넌트 */
const orderProductHTML = (product) => {
  return /*html*/ `<div class="is-flex product">
    <div class="is-flex-grow-1"> <img class="product_img" src="${
      product.main_img_url
    }" /></div>
    <div class="is-flex-grow-2">
        <p class="label">${product.product_name}</p>
        <p>개수 : <input type="number" class="input_qty mx-1" value=${
          product.qty
        }>개</p>
        <p>총 금액 : ${(product.price * product.qty).toLocaleString()} 원</p>
    </div>
</div>`;
};

/* 주문 상품 정보 불러오기 */
const loadOrderProductInfo = (products) => {
  products.forEach((product) => {
    orderProduct_info.insertAdjacentHTML(
      "beforeend",
      orderProductHTML(product),
    );
  });
};

/* 주문자 정보 불러오기 */
const loadOrdererInfo = (orderer) => {
  orderer_info.insertAdjacentHTML(
    "beforeend",
    /*html*/ `<div class="m-5 is-grid">
  <label class="label has-text-weight-bold">이름 </label><span>${orderer.name}</span>
  <label class="label has-text-weight-bold">연락처   </label><span>${orderer.contact}</span>
  <label class="label has-text-weight-bold">이메일  </label><span>${orderer.email}</span>
  </div>
  `,
  );
};

/* 배송정보 불러오기 */
const loadDeliveryInfo = (orderer) => {
  /* 주문자 정보와 동일 체크박스 선택 시 주문자와 동일 , 해제 시 직접 입력 */
  const checkbox = document.querySelector("#delivery_info .checkbox");

  const loadInputInDeliverInfo = () => {
    document.querySelector(".input-name").value = checkbox.checked
      ? orderer.name
      : "";
    document.querySelector(".input-contact").value = checkbox.checked
      ? orderer.contact
      : "";
    document.querySelector(".input-zip_code").value = checkbox.checked
      ? orderer.zip_code
      : "";
    document.querySelector(".input-address").value = checkbox.checked
      ? orderer.address
      : "";
    document.querySelector(".input-detail_address").value = checkbox.checked
      ? orderer.detail_address
      : "";
  };
  loadInputInDeliverInfo();
  checkbox.addEventListener("click", loadInputInDeliverInfo);

  /* 배송 메모의 직접 입력 옵션 선택 시 직접 입력 칸 보이기 */
  const select = document.querySelector("select");
  const direct_input = document.querySelector(".direct_input");

  select.addEventListener("input", () => {
    if (select.value === "직접입력") direct_input.classList.remove("is-hidden");
    else direct_input.classList.add("is-hidden");
  });
};

/* 주문 요약 불러오기 */
const loadOrderSumary = (order_products) => {
  let product_price = 0;
  let delivery_price = 0;

  order_products.forEach(({ price, qty }) => {
    product_price += price * qty;
  });

  const total_price = product_price + delivery_price;
  order_info.totalPrice = total_price;

  order_summary.insertAdjacentHTML(
    "beforeend",
    /*html*/ `<div class="py-5">
  <div class="mx-5 my-3 is-flex is-justify-content-space-between"><label class="label has-text-weight-bold">상품 가격</label><span>${product_price.toLocaleString()} 원</span></div>
  <div class="mx-5 my-3 is-flex is-justify-content-space-between"> <label class="label has-text-weight-bold">배송비</label></label><span class="has-text-grey-light">OPEN EVENT ★전상품 무료배송★</span><span>${delivery_price} 원</span></div>
  <div class="mx-5 my-3 py-2 is-flex is-justify-content-space-between total_price"> <label class="label has-text-weight-bold">총 결제금액</label></label><span class="has-text-weight-bold">${total_price.toLocaleString()} 원</span>
  </div></div>
  `,
  );
};

/* 결제 방법 불러오기 */
const loadPaymentMethod = () => {
  payment_method.insertAdjacentHTML(
    "beforeend",
    /*html*/ `
  <div class="buttons is-flex p-2">
  <!--
  <button class="button my-1 is-light">네이버 페이</button>
  <button class="button my-1 is-light">카카오 페이</button>
  <button class="button my-1 is-light">페이코</button>
  -->
  <button class="button is-active my-1 is-flex is-medium is-justify-content-space-between "><span class="has-text-weight-bold">신용카드</span>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M22 4h-20c-1.104 0-2 .896-2 2v12c0 1.104.896 2 2 2h20c1.104 0 2-.896 2-2v-12c0-1.104-.896-2-2-2zm0 13.5c0 .276-.224.5-.5.5h-19c-.276 0-.5-.224-.5-.5v-6.5h20v6.5zm0-9.5h-20v-1.5c0-.276.224-.5.5-.5h19c.276 0 .5.224.5.5v1.5zm-9 6h-9v-1h9v1zm-3 2h-6v-1h6v1zm10-2h-3v-1h3v1z"/></svg>
  </button>
  <button class="button my-1 is-flex is-medium is-justify-content-space-between"><span class="has-text-weight-bold">무통장 입금</span>
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14 11c-1.656 0-3 1.344-3 3s1.344 3 3 3 3-1.344 3-3-1.344-3-3-3zm.15 4.484v.315h-.3v-.299c-.311-.005-.632-.079-.899-.217l.135-.493c.287.11.669.229.968.162.345-.078.415-.433.034-.604-.279-.129-1.133-.242-1.133-.973 0-.409.313-.775.895-.855v-.319h.301v.305c.217.006.461.043.732.126l-.108.493c-.23-.08-.485-.154-.733-.139-.446.026-.486.413-.174.575.514.242 1.182.42 1.182 1.063.001.516-.403.791-.9.86zm-10.15-7.484v12h20v-12h-20zm18 10h-16v-8h16v8zm-1-12h-19v11h-2v-13h21v2z"/></svg></button><br>
  </div>

</div>
  `,
  );

  const method_buttons = document.querySelectorAll(".buttons .button");
  method_buttons.forEach((button) => {
    button.addEventListener("click", () => {
      method_buttons.forEach((innerButton) => {
        innerButton.classList.remove("is-active");
      });
      button.classList.add("is-active");
    });
  });
};

/* 모달 관련 설정 */
const toggleModal = () => {
  payment_modal.classList.toggle("is-active");
};

payment_button.addEventListener("click", () => {
  toggleModal();
  loadToggle();
});
close_btn.addEventListener("click", toggleModal);
cancel_btn.addEventListener("click", toggleModal);

/* 모달 창 내용 불러오기 */
const loadToggle = async () => {
  const orderer_name = orderer.name;

  const products_name = order_products
    .map(({ product_name }) => product_name)
    .join(",<br>");

  const destination = `(${document.querySelector(".input-zip_code").value}) ${
    document.querySelector(".input-address").value
  } ${document.querySelector(".input-detail_address").value}`;

  modal_content.innerHTML = /*html*/ `
  <table class="table is-bordered">
      <tbody>
          <tr>
              <td><label class="has-text-weight-bold">주문자</label></td>
              <td><span>${orderer_name}</span></td>
          </tr>
          <tr>
              <td><label class="has-text-weight-bold">배송지</label></td>
              <td><span>${destination}</span></td>
          </tr>
          <tr>
              <td><label class=" has-text-weight-bold">상품</label>
              </td>
              <td><span>${products_name}</span></td>
          </tr>
          <tr>
              <td><label class=" has-text-weight-bold">금액</label></td>
              <td>
                      <span>${order_info.totalPrice.toLocaleString()} 원</span>
              </td>
          </tr>
      </tbody>
  </table>
  `;
  const submit_button = document.querySelector(".submit-btn");
  const delivery_form = document.querySelector(".delivery_form");

  submit_button.addEventListener("click", async () => {
    const formData = new FormData(delivery_form);

    const deliveryData = {};
    formData.forEach((value, key) => {
      deliveryData[key] = value;
    });
    const orderData = {
      destination: `(${deliveryData.zip}) ${deliveryData.address}, ${deliveryData.city}`,
      phone_number: deliveryData.phone,
      items: order_products,
      memo:
        deliveryData.directMemo.length > 0
          ? deliveryData.directMemo
          : deliveryData.memo,
    };
    await fetch(`${url}/add_order`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((data) => Promise.reject(data));
        }
        return response.json();
      })
      .then((data) => {
        alert(`결제가 완료되었습니다.`);
        // location.reload();
      })
      .catch((error) => {
        alert(`결제에 실패했습니다. \n ${error.message}`);
      });
  });
};

/* 주문 상품 mockData */
const order_products = [
  {
    main_img_url:
      "https://tbnws.hgodo.com/gtgear/ver4.0/product/keychron/k8_pro/white/products_thumb_k8pro_white.jpg",
    price: 189000,
    product_name: "K8 Pro White",
    product_number: 1,
    _id: "6523f7e111164c55fc21efd3",
    qty: 1,
  },
  {
    main_img_url:
      "https://tbnws.hgodo.com/wordpress/keychorn/products/q3_retro/products_thumb_q3_retro_1.jpg",
    price: 245000,
    product_name: "Q3 Knob Retro 유선 키보드",
    product_number: 5,
    _id: "6523fcbb11164c55fc24dd28",
    qty: 2,
  },
  {
    main_img_url:
      "https://tbnws.hgodo.com/wordpress/keychorn/products/m34k/products_thumb_1.png",
    price: 35000,
    product_name: "M3 4K 무선 마우스",
    product_number: 10,
    _id: "65240016511ecf47e58fe11c",
    qty: 1,
  },
];

/* 주문자 mockData */
const orderer = {
  userId: "6526a173167f8c9569575133",
  name: "홍길동",
  email: "hong123@gmail.com",
  contact: "010-1111-1111",
  address: "서울특별시 성동구",
  detail_address: "123-12",
  zip_code: "10101",
};

const delivery = {
  name: "",
  email: "",
  contact: "",
  address: "",
  detail_address: "",
};

loadOrderProductInfo(order_products);
loadOrdererInfo(orderer);
loadDeliveryInfo(orderer);
loadOrderSumary(order_products);
loadPaymentMethod();
