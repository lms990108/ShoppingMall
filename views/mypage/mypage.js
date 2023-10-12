  // 1. Edit Profile 누를 시 모달 창
  const showModalButton = document.getElementById('showModal');
  const closeModalButton = document.getElementById('closeModal');
  const cancelModalButton = document.getElementById('cancelModal');
  const submitFormButton = document.getElementById('submitForm');
  const modal = document.getElementById('modal1');
  const formInput = document.getElementById('signupForm');
  const emailInput = document.getElementById('email');
  const nameInput = document.getElementById('name');
  const passwordInput = document.getElementById("password");

  // Show modal
  showModalButton.addEventListener('click', function() {
    modal.classList.add('is-active');
  });

  // Close modal
  closeModalButton.addEventListener('click', function() {
    modal.classList.remove('is-active');
  });

  // Cancel modal
  cancelModalButton.addEventListener('click', function() {
    modal.classList.remove('is-active');
  });

  // Submit 버튼을 누르면 => 회원정보수정
  submitFormButton.addEventListener('click', async function(e) {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;
    const name = nameInput.value;
    
    
    try {
        const token = localStorage.getItem('token'); 
        console.log(token)
        const response = await fetch('http://localhost:5001/api/user', { 
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + token 
            },
            body: JSON.stringify({
              email: email,
              name: name,
              password: password,
          }),
        });
        
        if (response.ok) {
            const result = await response.json();
            console.log(result);
            alert('회원정보가 수정되었습니다. 다시 로그인 해주세요!');
            localStorage.removeItem('token');
            modal.classList.remove('is-active');
            window.location.href = '/'; 
        } else {
            const errorData = await response.json();
            console.error("Error updating user:", errorData);
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

  // 2. My Order 누를 시 모달창
  const showOrderModalButton = document.getElementById('showOrderModal');
  const closeOrderModalButton = document.getElementById('closeOrderModal');
  const closeOrderModalFooterButton = document.getElementById('closeOrderModalFooter');
  const orderModal = document.getElementById('modal2');
  
  // api 호출 
  async function fetchOrders(userId) {
    const response = await fetch(`http://kdt-sw-6-team05.elicecoding.com/user/${userId}/orders`);
    const data = await response.json();
    return data;
  }

  // Show order modal
  showOrderModalButton.addEventListener('click', async function() {
    
    try {
      const orders = await fetchOrders(userId);
      populateOrderList(orders);
      orderModal.classList.add('is-active');
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      // 추가적인 에러 핸들링을 여기서 수행할 수 있습니다.
    }
    
  });
  
  // Close order modal
  closeOrderModalButton.addEventListener('click', function() {
    orderModal.classList.remove('is-active');
  });
  
  closeOrderModalFooterButton.addEventListener('click', function() {
    orderModal.classList.remove('is-active');
  });
  
  function populateOrderList(orders) {
    const orderListElem = document.getElementById('orderList');
    orderListElem.innerHTML = '';  // Clear current list
  
    orders.forEach(order => {
      const row = document.createElement('tr');
      row.innerHTML = `
      <tr>
      <td>${order.orderNum}</td>
      <td>${order.status}</td>
      <td>${order.totalPrice}</td>
      <td>${order.shipTo.address}</td> // Type이 오브젝트 인데 어케 하는지 모르겠음
      <td>${order.contact.phone}</td>  // 여기도 
      <td>
          ${order.items.map(item => `${item.qty} x ${item.productId}`).join('<br>')}
      </td>
      </tr>
      `;
      orderListElem.appendChild(row);
    });
  }

// 회원탈퇴
const deleteAccountButton = document.getElementById('deleteAccountBtn');

  deleteAccountButton.addEventListener('click', async function() {
      // 확인 팝업창 띄우기
      const isConfirmed = window.confirm("정말로 탈퇴하시겠습니까?");

      if (isConfirmed) {
          try {
              const token = localStorage.getItem('token');
              
              const response = await fetch('http://localhost:5001/api/user', {
                  method: 'DELETE',
                  headers: {
                      'Authorization': 'Bearer ' + token
                  }
              });

              if (response.ok) {
                  const result = await response.json();
                  console.log(result.message);
                  alert(result.message); // 성공 메시지를 사용자에게 보여줍니다.
                  localStorage.removeItem('token'); // 토큰 삭제
                  window.location.href = '/'; // 메인 페이지로 리다이렉션
              } else {
                  const errorData = await response.json();
                  console.error("Error deleting user:", errorData);
                  alert("회원 탈퇴 중 오류가 발생했습니다.");
                  window.location.href = '/myPage';
              }
          } catch (error) {
              console.error("Error:", error);
          }
      }
  });


// 로그아웃
const logoutButton = document.getElementById('logoutButton'); // 로그아웃 버튼의 ID

logoutButton.addEventListener('click', function() {
    // 토큰 삭제
    localStorage.removeItem('token');
    alert("로그아웃 하셨습니다.")
    // 메인 페이지로 리다이렉션
    window.location.href = '/'; // 메인 페이지의 URL
});

// MyPage에 문구 보여주기
document.addEventListener('DOMContentLoaded', async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:5001/api/user', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    if (response.ok) {
      const userData = await response.json();
      document.getElementById('welcomeMessage').textContent = `👋 ${userData.name}님 환영합니다!`;
      document.getElementById('emailMessage').textContent = `${userData.name}님의 이메일: ${userData.email}`;
    } else {
      // 에러 처리
      console.error("Error fetching user data:", await response.json());
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
