// 장바구니 페이지

// 수량 체크
let minus = document.querySelector(".minusbtn");
let plus = document.querySelector(".plusbtn");
let quantity = document.querySelector(".quantity");
let totalprice = document.querySelector(".total_price");
let countnum = 1;

minus.addEventListener("click", () => {
  if (countnum > 1) {
    countnum -= 1;
    quantity.value = countnum;

    let totalcost = countnum * 235000; // 기본금액 임의 설정

    totalprice.innerText = `총 금액: ${totalcost.toLocaleString()}원`;
  }
});

plus.addEventListener("click", () => {
  countnum += 1;
  quantity.value = countnum;

  let totalcost = countnum * 235000; // 기본금액 임의 설정

  totalprice.innerText = `총 금액: ${totalcost.toLocaleString()}원`;
});

