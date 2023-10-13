// 장바구니 페이지

// 장바구니 정보 가지고 오기
const cartItem = JSON.parse(localStorage.getItem('cartItem')) || []
makeCartItem()

// 장바구니 상품 동적 생성
function makeCartItem() {
  const list = document.querySelector('.cartlist')
  list.innerHTML = ''
  let html = '';

  cartItem.forEach((item, index) => {
    html += '<tr class="row data">'
    html += '<td><label class="checkbox" onclick="setTotalPrice()"><input style="zoom:1.3;" type="checkbox" class="item_chk" value="' + index +'" checked></label></td>'
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

function itemMinus(index) {
  const item = cartItem[index]
  console.log('itemMinus: ', item)


  setTotalPrice()
}

function itemPlus(index) {
  const item = cartItem[index]
  console.log('itemPlus: ', item)

  // 상품 수량 로직

  setTotalPrice()
}

function itemDelete(index) {
  const item = cartItem[index]
  console.log('itemDelete: ', item)

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
  totalPrice.innerText = priceFormat(price) + '원'
}

// 구매하기
function doBuy() {
  // 체크된 상품만 가져오기
  const chkPrdts = document.querySelectorAll('.item_chk:checked')
  const orderProducts = []

  for (var i = 0; i < chkPrdts.length; i++) {
    const item = cartItem[Number(chkPrdts[i].value)]
    orderProducts.push(item)
  }
  // 세션스토리지에 담긴 상품정보(상품명,가격,수량) 배열 형태로 담아보냄.
  sessionStorage.setItem('orderItem', JSON.stringify(orderProducts))
  
  // 주문/결제페이지 이동
  location.href = '/payment'

}

// 가격 콤마 표시 함수 (3자리 단위로)
function priceFormat(price) {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); 
}