// 장바구니 페이지

// 장바구니 정보 가지고 오기
const cartItem = JSON.parse(localStorage.getItem('cartItem')) || []
makeCartItem()

// 장바구니 상품 동적 생성
function makeCartItem() {

  console.log("장바구니 상품 동적 생성")
  const list = document.querySelector('.cartlist')
  list.replaceChildren();
  let html = '';

  cartItem.forEach((item, index) => {
    html += '<tr class="row data">'
    html += '<td><label class="checkbox" onclick="setTotalPrice()"><input style="zoom:1.3;"type="checkbox" class="item_chk" value="' + index +'" checked></label></td>'
    html += '<td><img src="'+ item.main_img_url +'" alt="상품 이미지"></td>'
    html += '<td>' + item.product_name + '</td>'
    html += '<td>' + priceFormat(item.price * item.qty) + '원</td>'
    html += '<td><div class="numbox"><button type="button" class="minusbtn" onclick="itemMinus(' + index +')">-</button><input type="text" class="quantity" value="' + item.qty +'" disabled/><button type="button" class="plusbtn" onclick="itemPlus(' + index +')">+</button></div></td>'
    html += '<td><button type="button" class="button is-info is-small delete_button" onclick="itemDelete(' + index +')">삭제</button></td>'
    html += '</tr>';
  })

  list.innerHTML = html

  // 총 금액 계산 메서드 호출
  setTotalPrice()
}

// 장바구니 수량 감소 메서드
function itemMinus(index) {
  const item = cartItem[index];

  let countnum = item.qty;

  if (countnum > 1) {
      countnum -= 1  // 아이템 수량 1씩 감소
      item.qty = countnum;

      // 장바구니 수량
      let quantity = document.querySelector(".quantity");
      quantity.value = countnum;

      makeCartItem();
      setTotalPrice();
  }
}

// 장바구니 수량 증가 메서드
function itemPlus(index) {
  const item = cartItem[index];

  // 현재 수량을 가져오기
  let countnum = item.qty;

  countnum += 1;

  // 아이템의 수량 업데이트
  item.qty = countnum;

  // 장바구니 수량
  let quantity = document.querySelector(".quantity");
  quantity.value = countnum;

  makeCartItem();
  setTotalPrice();
}

// 아이템 삭제
function itemDelete(index) {

  const item = cartItem[index];
  // console.log('itemDelete: ', item);

  // 배열에서 해당 아이템 제거 후..
  cartItem.splice(index, 1);

  // 로컬스토리지에 저장된 장바구니 아이템
  // 업데이트된 데이터를 로컬스토리지에 다시 저장!
  localStorage.setItem('cartItem', JSON.stringify(cartItem));

  makeCartItem(); // 장바구니 리스트 화면 UI 재 생성
  setTotalPrice();  // 총 금액 재계산
}


// 총 금액 계산 메서드
function setTotalPrice() {
  const totalPrice = document.querySelector('.total_price')
  const chkPrdts = document.querySelectorAll('.item_chk:checked')
  let price = 0
  for (var i = 0; i < chkPrdts.length; i++) {
    const item = cartItem[Number(chkPrdts[i].value)]
    price += item.price * item.qty
  }
  totalPrice.innerText = '총 가격:  ' + priceFormat(price) + '원';
  
}


// 가격 콤마 표시 함수 (3자리 단위로)
function priceFormat(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
}




// 구매하기
function doBuy() {
  // 장바구니 리스트에서 체크된 상품만 가져오기
  const chkPrdts = document.querySelectorAll('.item_chk:checked')
  const orderProducts = []

  for (var i = 0; i < chkPrdts.length; i++) {
    const item = cartItem[Number(chkPrdts[i].value)]
    orderProducts.push(item)
  }
  // 세션스토리지에 담긴 상품정보(상품명,가격,수량) 배열 형태로 담아보냄. 
  sessionStorage.setItem('orderItem', JSON.stringify(orderProducts))
  
  console.log(orderProducts)

  // 주문/결제페이지 이동
  location.href = '/payment'

}

// 전체 체크박스 선택/해제
let allCheckbox = document.getElementById("checked_all")

allCheckbox.addEventListener('change', function() {
    let checkboxes = document.querySelectorAll('.item_chk');
    checkboxes.forEach(checkbox => {
        checkbox.checked = allCheckbox.checked;
    });
});


// 선택된 아이템 삭제 메서드
function deleteSelectedItems() {

  // 체크된 체크박스 찾기
  const chkPrdts = document.querySelectorAll('.item_chk:checked')
  if (chkPrdts.length == 0) return;
  
  // 체크된 아이템의 인덱스 배열 초기화
  let selectedItem = [];

 
  chkPrdts.forEach((checkbox, index) => {
      if (checkbox.checked) {
        selectedItem.push(index);
      }
  });

  // 로컬스토리지에서도 삭제하고 UI 업데이트
  selectedItem.reverse().forEach(index => {
    cartItem.splice(index, 1);
    localStorage.setItem('cartItem', JSON.stringify(cartItem));
  });

  makeCartItem();
  setTotalPrice();
}

// 선택상품 삭제 버튼 클릭 시 삭제 함수 호출

let deleteBtn = document.querySelector('.clear_button');
deleteBtn.addEventListener('click', deleteSelectedItems);



// 장바구니 비우기 버튼 (전체 상품 비워짐)
function clearCart() {

  // 로컬스토리지에서 데이터 삭제
  localStorage.removeItem('cartItem');
  
  cartItem.splice(0)

  // 장바구니 UI 업데이트
  makeCartItem();
  setTotalPrice();
}

// 장바구니 전체 비우기 버튼에 이벤트 리스너 추가
let clearCartButton = document.querySelector('.cart_clear');
clearCartButton.addEventListener('click', () => {
    if (confirm("장바구니를 모두 비우시겠습니까?")) {
        clearCart();
    }
});
