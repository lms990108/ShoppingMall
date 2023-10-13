async function displayOrders(orders) {
  const tableBody = document.getElementById('orderTableBody');

  for(let order of orders) {
      for(let item of order.items) {
          const productDetail = await getProductDetail(item.product_number);

          const row = document.createElement('tr');
          const imgTd = document.createElement('td');
          const img = document.createElement('img');
          img.src = productDetail.main_img_url;
          img.alt = productDetail.product_name;
          img.width = 100; // Adjust size as needed
          imgTd.appendChild(img);

          const nameTd = document.createElement('td');
          nameTd.textContent = productDetail.product_name;

          const priceTd = document.createElement('td');
          priceTd.textContent = item.price;

          const qtyTd = document.createElement('td');
          qtyTd.textContent = item.qty;

          row.appendChild(imgTd);
          row.appendChild(nameTd);
          row.appendChild(priceTd);
          row.appendChild(qtyTd);

          tableBody.appendChild(row);
      }
  }
}

async function getProductDetail(number) {
  try {
    const response = await fetch("http://localhost:5001/api/product/product_detail/" + number);
    const data = await response.json();
    return data
  } catch (error) {
    console.error("Error:", error);
    return {}
  }
}

// get user's order (사용자의 order를 json으로 받아옴)
async function getUserOrder(){
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('/api/order/user/orders',{
          method : 'Get',
          headers: {
          'Authorization': "Bearer "+token,  
          'Content-Type': 'application/json'
          }
        });

        const data = await response.json();
        return data;

    } catch(error){
      alert("주문 조회 실패: 주문 내역이 존재하지 않습니다.");
    }
  }

  getUserOrder()
  .then(orders => {
      displayOrders(orders);
  })
  .catch(error => {
      alert("Error:"+ error);
  });
