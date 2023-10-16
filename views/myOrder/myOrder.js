// async function displayOrders(orders) {
//   const tableBody = document.getElementById("orderTableBody");
//   for (let order of orders) {
//     for (let item of order.items) {
//       const productDetail = await getProductDetail(item.product_number);

//       const row = document.createElement("tr");
//       const imgTd = document.createElement("td");
//       const img = document.createElement("img");
//       img.src = productDetail.main_img_url;
//       img.alt = productDetail.product_name;
//       img.width = 100; // Adjust size as needed
//       imgTd.appendChild(img);

//       const nameTd = document.createElement("td");
//       nameTd.textContent = productDetail.product_name;

//       const priceTd = document.createElement("td");
//       priceTd.textContent = item.price;

//       const qtyTd = document.createElement("td");
//       qtyTd.textContent = item.qty;

//       row.appendChild(imgTd);
//       row.appendChild(nameTd);
//       row.appendChild(priceTd);
//       row.appendChild(qtyTd);

//       tableBody.appendChild(row);
//     }
//   }
// }

// async function displayOrderInfo(orders) {
//   console.log(orders);

//   const tableBody = document.getElementById("orderInfoBody");
//   orders.forEach((order) => {
//     console.log(order);
//     const date = new Date(order.createdAt);
//     tableBody.innerHTML += /*html*/ `<tr>
//       <td>${order.totalPrice}</td>
//       <td>${order.destination}</td>
//       <td>${getStatusString(order.status)}</td>
//       <td>${date.getFullYear()}-${
//         date.getMonth() + 1
//       }-${date.getDate()} ${date.getHours()}시${String(
//         date.getMinutes(),
//       ).padStart(2, "0")}분</td>
//       <td>${order.memo}</td>
//       <td>${order.phone_number}</td>
//       </tr>
//       `;

//   });

// }

const getStatusString = (status) => {
  switch (status) {
    case 0:
      return "배송 준비 중";
    case 1:
      return "배송 중";
    case 2:
      return "배송완료";
    case 3:
      return "주문 취소";
    default:
      return "주문상태 미확인";
  }
};

// order json으로부터 상품정보 찾아냄.
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
    console.error(error);
  }
}

// // 상단 테이블 작성
// getUserOrder()
//   .then((orders) => {
//     displayOrderInfo(orders);
//   })
//   .catch((error) => {
//     alert("Error: " + error);
//   });

// // 하단 테이블 작성
// getUserOrder()
//   .then((orders) => {
//     displayOrders(orders);
//   })
//   .catch((error) => {
//     alert("Error: " + error);
//   });
const orderList = document.getElementById("orderList");
const createOrderList = async (orders) => {
  const orderHtml = await Promise.all(
    orders.map(async (order) => {
      const mainItemHtml = await getMain(order);
      const subItemsHtml = await Promise.all(
        order.items.map(async (item) => {
          return `${await getSubItems(item)}`;
        }),
      ).then((subItems) => subItems.join(""));

      return /*html*/ `
        <div class="subItemsContainer">
        ${mainItemHtml}
            ${subItemsHtml}
        </div>`;
    }),
  );

  orderList.innerHTML = orderHtml.join(""); // 모든 주문의 HTML을 orderList에 추가합니다.
};

const getMain = async (order) => {
  const mainItem = await getProductDetail(order.items[0].product_number);
  return /*html*/ `
  <div class="container orderContainer">
    <h3 class="title is-5">${new Date(
      order.updatedAt,
    ).toLocaleString()} 주문</h3>
    <div class="is-flex">
    <img class="mainImg" src=${mainItem.main_img_url}>
    <div class="is-align-self-center orderInfoContainer">
    <p class="title is-5">${getStatusString(order.status)}</p><br>
    <p class="label">${mainItem.product_name}<span> 외 ${
      order.items.length - 1
    }</span></p>
    <p>총 금액 : ${parseInt(order.totalPrice).toLocaleString()}원</p>
    <p>배송지 : ${order.destination}</p>
    <p> 배송 메모 : ${order.memo}</p>
  </div>
  </div>`;
};

const getSubItems = async (item) => {
  const { main_img_url, product_name } = await getProductDetail(
    item.product_number,
  );
  return `<div class="is-flex">
  <div class="subImgContainer"> <img src=${main_img_url} class="subImg"></div>
    <div class="is-align-self-center">
    <span class="has-text-weight-bold">${product_name} | </span>
    <span>${item.price.toLocaleString()}원, ${item.qty}개</span>
    </div>
    </div>`;
};

getUserOrder().then((orders) => createOrderList(orders));
const userName = localStorage.getItem("userName");
document.getElementById("userName").innerHTML = `${userName} 님의 주문목록`;
