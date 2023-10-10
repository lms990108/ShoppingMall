const orderProduct_info = document.querySelector("#orderProduct_info");
const orderer_info = document.querySelector("#orderer_info");
const delivery_info = document.querySelector("#delivery_info");
const order_summary = document.querySelector("#order_summary");
const payment_method = document.querySelector("#payment_method");

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

const loadOrderProductInfo = (products) => {
  products.forEach((product) => {
    orderProduct_info.insertAdjacentHTML(
      "beforeend",
      orderProductHTML(product),
    );
  });
};

const loadOrdererInfo = (orderer) => {
  orderer_info.insertAdjacentHTML(
    "beforeend",
    /*html*/ `<div class="m-5">
  <label class="label has-text-weight-bold">이름 : <span>${orderer.name}</span></label>
  <label class="label has-text-weight-bold">연락처 : <span>${orderer.contact}</span> </label>
  <label class="label has-text-weight-bold">이메일 : <span>${orderer.email}</span></label>
  </div>
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
