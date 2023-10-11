const orderProduct_info = document.querySelector("#orderProduct_info");
const orderer_info = document.querySelector("#orderer_info");
const delivery_info = document.querySelector("#delivery_info");
const order_summary = document.querySelector("#order_summary");
const payment_method = document.querySelector("#payment_method");

/* 주문 상품 정보 불러오기 */
const orderProductHTML = (product) => {
  return /*html*/ `<div class="is-flex product">
  <div class="is-flex-grow-1">  <img class="product_img" src="${
    product.main_img_url
  }"/></div>
<div class="is-flex-grow-2">  <p>${product.product_name}</p>
  <p>개수 : <input type="number" class="input_qty" value=${product.qty}>개</p>
  <p>총 금액 : ${product.price * product.qty} 원</p></div>

  </div>`;
};

/* 단일 상품 정보 컴포넌트 */
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
  /* 기본값은 주문자(사용자)와 동일 */
  delivery_info.insertAdjacentHTML(
    "beforeend",
    /*html*/ `
  <div class="m-5 is-grid">
  <label class="label has-text-weight-bold">수령인  </label><input value=${orderer.name} class="input-name">
  <label class="label has-text-weight-bold">연락처   </label><input value=${orderer.contact} class="input-contact">
  <label class="label has-text-weight-bold">우편번호  </label><input value=${orderer.email} class="input-email">
  <label class="label has-text-weight-bold">주소  </label><input value=${orderer.address} class="input-address">
  <label class="label has-text-weight-bold">상세 주소  </label><input value=${orderer.detail_address} class="input-detail_address">
  <label class="label has-text-weight-bold">배송 메모  </label>
  <select name="input-deliveryMemo" class="select">
  <option>부재 시 경비실에 맡겨주세요.</option>
  <option>집 앞에 놔주세요.</option>
  <option>택배함에 놔주세요.</option>
  <option>배송 전에 꼭 연락주세요.</option>
  <option>직접입력</option>
  </select>
  <label></label>
  <input class="direct_input is-hidden"  placeholder="배송 시 요청사항을 입력해주세요.">
  </div>
  `,
  );

  /* 주문자 정보와 동일 체크박스 선택 시 주문자와 동일 , 해제 시 직접 입력 */
  const checkbox = document.querySelector("#delivery_info .checkbox");
  checkbox.addEventListener("click", () => {
    document.querySelector(".input-name").value = checkbox.checked
      ? orderer.name
      : "";
    document.querySelector(".input-contact").value = checkbox.checked
      ? orderer.contact
      : "";
    document.querySelector(".input-email").value = checkbox.checked
      ? orderer.email
      : "";
    document.querySelector(".input-address").value = checkbox.checked
      ? orderer.address
      : "";
    document.querySelector(".input-detail_address").value = checkbox.checked
      ? orderer.detail_address
      : "";
  });

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
  name: "홍길동",
  email: "hong123@gmail.com",
  contact: "010-1111-1111",
  address: "서울특별시 성동구",
  detail_address: "123-12",
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
