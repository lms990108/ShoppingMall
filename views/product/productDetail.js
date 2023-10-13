// 제품 상세 페이지
// ex )/product_detail?productNumber=1

const URLMatch = new URLSearchParams(location.search);
const productNumber = URLMatch.get("productNumber");
let product = {};
// fleg 값으로 구분(구매/장바구니 버튼 클릭 시 해당되는 모달 창 생성)
let buyFlag = 1; // 1: 구매하기. 2: 장바구니. / 1이 디폴트임.
const modalMsg = {
  1: {
    content: "구매 하시겠습니까?",
    btnConfirm: {
      function: buyNow,
      msg: "예",
    },
    btnCancel: {
      function: buyCancel,
      msg: "아니오",
    },
  },
  2: {
    content: "장바구니에 추가되었습니다.",
    btnConfirm: {
      function: cartNow,
      msg: "장바구니로 이동",
    },
    btnCancel: {
      function: moreShopping,
      msg: "상품 더 둘러보기",
    },
  },
};

// jwt 토큰 체크
function tokenCheck() {
  const token = localStorage.getItem("token");
  if (token) return token;
  return false;
}

// 상품 정보 호출
async function getProductDetail(number) {
  try {
    const response = await fetch("/api/product/product_detail/" + number);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return {};
  }
}

// 상품 정보 화면 렌더링
async function setProductData(number) {
  product = await getProductDetail(number);
  console.log(product);

  // 상품명
  const title = document.querySelector(".product_title");
  title.innerText = product.product_name;

  // 상품내용
  const content = document.querySelector(".destext");
  content.innerText = product.content;

  // 상품이미지
  const mainImage = document.querySelector(".main_img_box");
  const mainImgEl = document.createElement("img");
  mainImgEl.classList.add("detail_image");
  mainImgEl.src = product.main_img_url;
  mainImage.appendChild(mainImgEl);

  // 상품가격
  const price = document.querySelector(".price");
  price.innerText = priceFormat(product.price) + "원";
  const totalPrice = document.querySelector(".total_price");
  totalPrice.innerText = priceFormat(product.price) + "원";

  // 상품 상세정보
  const detailImg = document.querySelector(".detail_info_content");
  const detailImgEl = document.createElement("img");
  detailImgEl.src = product.des_img_url;
  detailImg.appendChild(detailImgEl);
}

setProductData(productNumber);

// 가격 콤마 표시 함수 (3자리 단위로)
function priceFormat(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 상단으로 이동 버튼 스크롤 이벤트 (제품 상세 정보 이미지 들어올 시점에 등장!!)
const basicArea = window.innerHeight * 0.5;
const topButton = document.querySelector(".to_top");
const imgShowLine = topButton.getBoundingClientRect().top - basicArea;

window.addEventListener("scroll", scrollEvent);

function scrollEvent() {
  let scrollTop = window.scrollY;

  if (scrollTop >= imgShowLine) {
    topButton.classList.add("on");

    topButton.onclick = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
  }
}

// 수량 체크
let minus = document.querySelector(".minusbtn");
let plus = document.querySelector(".plusbtn");
let quantity = document.querySelector(".quantity");
let totalprice = document.querySelector(".total_price");

let countnum = 1;

minus.addEventListener("click", () => {
  if (countnum > 1) {
    countnum -= 1; // - 버튼 클릭 시 마다 1씩 감소
    quantity.value = countnum;

    let totalcost = countnum * product.price; // 수량 * 가격
    totalprice.innerText = `${totalcost.toLocaleString()}원`;
  }
});

plus.addEventListener("click", () => {
  // + 버튼 클릭 시 마다 1씩 증가
  countnum += 1;
  quantity.value = countnum;

  let totalcost = countnum * product.price;
  totalprice.innerText = `${totalcost.toLocaleString()}원`;
});

// 모달 전역변수
const modal = document.querySelector(".modal");
const btnModalClose = document.querySelector(".close_modal_button");
const popContent = document.querySelector(".modal .content");
const popBtnConfirm = document.querySelector(".modal .btnConfirm");
const popBtnCancel = document.querySelector(".modal .btnCancel");

// 구매하기 버튼 이벤트
const btnBuy = document.querySelector(".buy_btn");

btnBuy.addEventListener("click", function () {
  // 토큰 체크를 했는데 토큰이 없는 경우, (=비회원) -> 로그인 페이지로 이동.
  if (!tokenCheck()) return goLoginPage();
  buyFlag = 1;
  setPopup(buyFlag); // 구매 flag 값에 따라나오는 모달 창 생성 함수 호출.

  modal.style.display = "block";
});

// 장바구니 버튼 이벤트
const btnCart = document.querySelector(".cart_btn");
btnCart.addEventListener("click", function () {
  // 토큰 체크를 했는데 없는 경우, (비회원). 로그인 페이지로 이동
  if (!tokenCheck()) return goLoginPage();

  // 장바구니 상품 저장
  const productObj = Object.assign({}, product); // 상품 정보
  productObj.qty = Number(document.querySelector(".quantity").value); // 수량 정보 추가로 새 객체에 담음.
  const cartItem = JSON.parse(localStorage.getItem("cartItem")) || []; // 로컬스토리지(장바구니)에 상품 유무

  // 장바구니에 같은 상품이 이미 담겨있을때..
  const sameProduct = cartItem.find(
    (cartProduct) => cartProduct.product_number === productObj.product_number,
  );
  if (sameProduct) sameProduct.qty += productObj.qty; // 같은 상품 수량(qty)더함
  else cartItem.push(productObj);
  localStorage.setItem("cartItem", JSON.stringify(cartItem)); // 배열 형태, 그 안에 하나씩 item 추가됨.

  // 2: 장바구니 모달 설정
  buyFlag = 2;
  setPopup(buyFlag);

  modal.style.display = "block";
});

// 모달 닫기
btnModalClose.addEventListener("click", function () {
  modalClose();
});

// 모달 팝업창 세팅 메서드
function setPopup(flag) {
  popContent.innerText = modalMsg[flag].content;
  popBtnConfirm.innerText = modalMsg[flag].btnConfirm.msg;
  popBtnCancel.innerText = modalMsg[flag].btnCancel.msg;

  popBtnConfirm.addEventListener("click", modalMsg[flag].btnConfirm.function);
  popBtnCancel.addEventListener("click", modalMsg[flag].btnCancel.function);
}

// 구매하기 메서드
function buyNow() {
  // 주문상품객체 생성
  const productObj = Object.assign({}, product); // 상품 정보
  productObj.qty = Number(document.querySelector(".quantity").value);
  sessionStorage.setItem("orderItem", JSON.stringify([productObj]));

  // 주문/결제페이지 이동
  location.href = "/payment";
}

// 구매취소 메서드
function buyCancel() {
  modalClose();
}

// 장바구니 이동 메서드
function cartNow() {
  location.href = "/cart";
}

// 상품더둘러보기 메서드
function moreShopping() {
  modalClose(); // 상품을 보던 현 페이지에 머무른다.
}

// 모달 닫기 메서드
function modalClose() {
  modal.style.display = "none";

  // 이벤트 누적 방지
  popBtnConfirm.removeEventListener(
    "click",
    modalMsg[buyFlag].btnConfirm.function,
  );
  popBtnCancel.removeEventListener(
    "click",
    modalMsg[buyFlag].btnCancel.function,
  );
}

// 로그인 페이지 이동
function goLoginPage() {
  const res = confirm("로그인이 필요한 서비스 입니다.\n로그인 하시겠습니까?");
  if (res) {
    location.href = "/login";
  }
}
