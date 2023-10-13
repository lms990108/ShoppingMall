async function displayOrders(orders) {
  const tableBody = document.getElementById("orderTableBody");

  for (let order of orders) {
    for (let item of order.items) {
      const productDetail = await getProductDetail(item.product_number);

      const row = document.createElement("tr");
      const imgTd = document.createElement("td");
      const img = document.createElement("img");
      img.src = productDetail.main_img_url;
      img.alt = productDetail.product_name;
      img.width = 100; // Adjust size as needed
      imgTd.appendChild(img);

      const nameTd = document.createElement("td");
      nameTd.textContent = productDetail.product_name;

      const priceTd = document.createElement("td");
      priceTd.textContent = item.price;

      const qtyTd = document.createElement("td");
      qtyTd.textContent = item.qty;

      row.appendChild(imgTd);
      row.appendChild(nameTd);
      row.appendChild(priceTd);
      row.appendChild(qtyTd);

      tableBody.appendChild(row);
    }
  }
}

async function displayOrderInfo(orders) {
  console.log(orders[0]);
  const tableBody = document.getElementById("orderInfoBody");

      const row = document.createElement("tr");

      const totalPrice = document.createElement("td");
      totalPrice.textContent = orders[0].totalPrice;

      const destination = document.createElement("td");
      destination.textContent = orders[0].destination;

      const status = document.createElement("td");
      status.textContent = getStatusString(orders[0].status);

      const date = new Date(orders[0].createdAt);
      const orderTime = document.createElement("td");
      orderTime.textContent = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}시${String(date.getMinutes()).padStart(2, '0')}분`;

      const memo = document.createElement("td");
      memo.textContent = orders[0].memo;

      const phoneNumber = document.createElement("td");
      phoneNumber.textContent = orders[0].phone_number;

      row.appendChild(totalPrice);
      row.appendChild(destination);
      row.appendChild(status);
      row.appendChild(orderTime);
      row.appendChild(memo);
      row.appendChild(phoneNumber);

      tableBody.appendChild(row);

      function getStatusString(status) {
        switch (status) {
            case 0: return '배송 준비 중';
            case 1: return '배송 중';
            case 2: return '배송완료';
            case 3: return '주문 취소';
            default: return '주문상태 미확인';
        }
      }
}

// order json으로부터 상품정보 찾아냄.
async function getProductDetail(number) {
  try {
    const response = await fetch(
      "http://localhost:5001/api/product/product_detail/" + number,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    return {};
  }
}

// get user's order (사용자의 order를 json으로 받아옴)
async function getUserOrder() {
  const token = localStorage.getItem("token");

  try {
    const response = await fetch("/api/order/user/orders", {
      method: "Get",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    alert("주문 조회 실패: 주문 내역이 존재하지 않습니다.");
  }
}

// 상단 테이블 작성
getUserOrder()
  .then((orders)=>{
    displayOrderInfo(orders);
  })
  .catch((error)=> {
    alert("Error: " + error);
  })

// 하단 테이블 작성
getUserOrder()
  .then((orders) => {
    
    displayOrders(orders);
  })
  .catch((error) => {
    alert("Error: " + error);
  });

const userName = localStorage.getItem("userName");
document.getElementById("userName").textContent = `${userName} 님의 주문목록`;
