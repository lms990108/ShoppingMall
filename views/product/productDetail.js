// 제품 상세 페이지
// ex )http://localhost:5001/product_detail?productNumber=1

// 가격 콤마 표시 함수 (3자리 단위로)
function priceFormat(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
}

// 상단으로 이동 버튼 스크롤 이벤트 (제품 상세 정보 들어올 시점에 등장!)
const basicArea = window.innerHeight * 0.5;
    const topButton = document.querySelector(".to_top");

    const imgShowLine = topButton.getBoundingClientRect().top - basicArea

    window.addEventListener("scroll", scrollEvent);

    function scrollEvent() {
      let scrollTop = window.scrollY;

      if (scrollTop >= imgShowLine) {
        topButton.classList.add('on');

        topButton.onclick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        }
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

    let totalcost = countnum * 249000; // 기본금액 임의 설정
    totalprice.textContent = totalcost.toLocaleString()

  } 
  
  
})

plus.addEventListener("click", () => {
  // + 버튼 클릭 시 마다 1씩 증가
  countnum += 1;
  quantity.value = countnum;

  let totalcost = countnum * 249000; // 기본금액 임의 설정
  totalprice.textContent = totalcost.toLocaleString()
})


