// 버튼 클릭 시 로그인
    const loginButton = document.getElementById("login-btn");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    loginButton.addEventListener("click", async (e) => {
        e.preventDefault();

        const email = emailInput.value;
        const password = passwordInput.value;
        const token = localStorage.getItem('token');
        if(token){
            alert('이미 로그인 하셨습니다!');
            return;
        }

        try {
            const response = await fetch("http://localhost:5001/api/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });
        
            const data = await response.json();
            console.log(data);
        
            if (response.status === 200) {
                localStorage.setItem("token", data.token);
                window.location.href = "/myPage";
            } else {
                alert(data.message);  
                window.location.href = "/login";
            }
        } catch (error) {
            alert("로그인 도중 오류가 발생했습니다.");  // 네트워크 문제 또는 예상치 못한 문제로 인해 발생할 수 있는 오류를 위해
            window.location.href = "/login";
        }
        
    });
