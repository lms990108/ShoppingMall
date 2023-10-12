// 버튼 클릭 시 로그인
    const loginButton = document.getElementById("login-btn");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    loginButton.addEventListener("click", async (e) => {
        e.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;

        try {
            const response = await fetch("http://localhost:5001/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.status === 200) {
                localStorage.setItem("token", data.token);
                // 로그인 성공 시 "my page"로 리다이렉트
                alert("로그인 성공")
                window.location.href = "../mypage/mypage.html";
            } else {
                // 로그인 실패 시 에러 메시지 표시
                alert(data.error);
                window.location.href = "./login.html";
            }
        } catch (error) {
            
            alert(error);
        }
    });
