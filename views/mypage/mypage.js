// 1. Edit Profile 누를 시 모달 창
const showModalButton = document.getElementById("showModal");
const closeModalButton = document.getElementById("closeModal");
const cancelModalButton = document.getElementById("cancelModal");
const submitFormButton = document.getElementById("submitForm");
const modal = document.getElementById("modal1");
const formInput = document.getElementById("signupForm");
const emailInput = document.getElementById("email");
const nameInput = document.getElementById("name");
const passwordInput = document.getElementById("password");

// Show modal
showModalButton.addEventListener("click", function () {
  modal.classList.add("is-active");
});

// Close modal
closeModalButton.addEventListener("click", function () {
  modal.classList.remove("is-active");
});

// Cancel modal
cancelModalButton.addEventListener("click", function () {
  modal.classList.remove("is-active");
});

// Submit 버튼을 누르면 => 회원정보수정
submitFormButton.addEventListener("click", async function (e) {
  e.preventDefault();

  const email = emailInput.value;
  const password = passwordInput.value;
  const name = nameInput.value;

  if (!email || !password || !name) {
    alert("회원정보 수정오류: 이메일,비밀번호,이름을 제대로 기입해주세요.");
    return;
  }

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인 후 이용하세요!");
      return;
    }
    const response = await fetch("/api/user", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + token,
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
      alert("회원정보가 수정되었습니다. 다시 로그인 해주세요!");
      localStorage.removeItem("token");
      modal.classList.remove("is-active");
      window.location.href = "/";
    } else {
      const errorData = await response.json();
      console.log(errorData.message);
      alert("회원정보 수정오류: " + errorData.message);
    }
  } catch (error) {
    console.error("Error:", error);
  }
});

// 2. My Order 누를 시 모달창
const showOrderModalButton = document.getElementById("showOrder");
const closeOrderModalButton = document.getElementById("closeOrderModal");
const closeOrderModalFooterButton = document.getElementById(
  "closeOrderModalFooter",
);
const orderModal = document.getElementById("modal2");

// Show order modal
showOrderModalButton.addEventListener("click", async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("로그인 후 이용하세요!");
    return;
  }

  try {
    const response = await fetch("/api/order/user/orders", {
      method: "Get",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    displayOrders(data);
  } catch (error) {
    console.error("Error fetching orders:", error);
    alert("주문내역이 없습니다!");
  }
});

// Close order modal
closeOrderModalButton.addEventListener("click", function () {
  orderModal.classList.remove("is-active");
});

closeOrderModalFooterButton.addEventListener("click", function () {
  orderModal.classList.remove("is-active");
});

function displayOrders(orders) {
  const container = document.getElementById("orderLists");
  container.innerHTML = ""; // Clear any previous data

  orders.forEach((order) => {
    const orderDiv = document.createElement("div");
    orderDiv.classList.add("box"); // Bulma's box component for a white container with a shadow
    const date = new Date(order.createdAt);

    orderDiv.innerHTML = `
      <article class="media">
        <div class="media-content">
          
          <div class="content">
            
            <p><strong>총 가격:</strong> ${order.totalPrice}</p>
            <p><strong>배송지:</strong> ${order.destination}</p>
            <p><strong>배송상태:</strong> ${getStatusString(order.status)}</p>
            <p><strong>주문시간:</strong> ${date.getFullYear()}-${
              date.getMonth() + 1
            }-${date.getDate()} ${date.getHours()}시${String(
              date.getMinutes(),
            ).padStart(2, "0")}분</p>
            <p><strong>요청사항:</strong> ${order.memo}</p>
            <p><strong>전화번호:</strong> ${order.phone_number}</p> 
            <p><strong>주문 상품은 아래와 같습니다.</strong></p>
            <table class="table is-bordered is-narrow is-hoverable is-fullwidth">
            <thead>
                <tr>
                    <th>상품 번호</th>
                    <th>가격</th>
                    <th>수량</th>
                </tr>
            </thead>
            <tbody>
                ${order.items
                  .map(
                    (item) => `
                    <tr>
                        <td>${item.product_number}</td>
                        <td>${item.price}</td>
                        <td>${item.qty}</td>
                    </tr>
                `,
                  )
                  .join("")}
            </tbody>
        </table>
          </div>
        </div>
      </article>
  `;

    container.appendChild(orderDiv);
  });

  orderModal.classList.add("is-active");
}

function getStatusString(status) {
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
}

// 회원탈퇴
const deleteAccountButton = document.getElementById("deleteAccountBtn");

deleteAccountButton.addEventListener("click", async function () {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("로그인 후 이용하세요!");
    return;
  }
  // 확인 팝업창 띄우기
  const isConfirmed = window.confirm("정말로 탈퇴하시겠습니까?");

  if (isConfirmed) {
    try {
      const response = await fetch("/api/user", {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.message);
        alert(result.message); // 성공 메시지를 사용자에게 보여줍니다.
        localStorage.removeItem("token"); // 토큰 삭제
        window.location.href = "/"; // 메인 페이지로 리다이렉션
      } else {
        const errorData = await response.json();
        console.error("Error deleting user:", errorData);
        alert("회원 탈퇴 중 오류가 발생했습니다.");
        window.location.href = "/myPage";
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
});

// 로그아웃
document.addEventListener("DOMContentLoaded", (event) => {
  const logoutButton = document.getElementById("logoutButton");
  logoutButton.addEventListener("click", () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("로그인 후 이용하세요!");
      return;
    }
    localStorage.removeItem("token");
    alert("로그아웃 하셨습니다.");
    // 메인 페이지로 리다이렉션
    window.location.href = "/";
  });
});

// MyPage에 문구 보여주기
document.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch("/api/user", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });

    if (response.ok) {
      const userData = await response.json();
      localStorage.setItem("userName", userData.name);
      document.getElementById(
        "welcomeMessage",
      ).textContent = `👋 ${userData.name}님 환영합니다!`;
      document.getElementById(
        "emailMessage",
      ).textContent = `${userData.name}님의 이메일: ${userData.email}`;
    } else {
      // 에러 처리
      console.error("Error fetching user data:", await response.json());
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
