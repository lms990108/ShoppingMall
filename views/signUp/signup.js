// 이미 가입된 메일인지 체크
// 비밀번호 양식 확인, 비밀번호랑 비밀번호확인 결과 일치하는지 검사
// document.getElementById('signup-button').addEventListener('click', async function(event) {
//   event.preventDefault();  

//   const password = document.getElementById('password').value;

//   // 패스위드 길이(8자이상), 알파벳 특수문자 포함 여부 확인
//   let hasAlphabet = /[a-zA-Z]/.test(password);
//   let hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

//   if (password.length < 8) {
//       alert('비밀번호는 8자 이상이어야 합니다.');  
//       return;
//   } else if (!hasAlphabet || !hasSpecialChar) {
//       alert('비밀번호는 알파벳과 특수문자를 포함해야 합니다.');  
//       return;
//   } else if (password !== confirmPassword) {
//       alert('비밀번호와 확인 비밀번호가 일치하지 않습니다.');  
//       return;
//   }

//   try {
//     const response = await fetch("/FindMe", { 
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ email, password })
//     });

//     const data = await response.json();

//     if (response.status === 201) {
//         alert('회원가입 성공!');
//         window.location.href = "../mainPage/mainPage.html"
        
//     } else if (data.error) {
//         alert(data.error);
//     }
// } catch (error) {
//     alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
// }
// });

// 비밀번호 입력할 때,  양식이 일치하지 않으면 빨간 줄 및  경고 아이콘 표시
// 비밀번호 양식 일치 시 초록색 줄 및  확인 아이콘 표시
document.getElementById('password').addEventListener('input', function(event) {
    let password = event.target.value;

    let hasAlphabet = /[a-zA-Z]/.test(password);
    let hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    const iconElement = this.nextElementSibling.querySelector('i');
    
    if (password.length < 8 || !hasAlphabet || !hasSpecialChar) {
        this.classList.add('is-danger');
        this.classList.remove('is-success');
        
        iconElement.classList.remove('fa-circle-check');
        iconElement.classList.add('fa-solid', 'fa-exclamation-triangle');
        
    } else {
        this.classList.remove('is-danger');
        this.classList.add('is-success');
        
        iconElement.classList.remove('fa-solid', 'fa-exclamation-triangle');
        iconElement.classList.add('fa-solid', 'fa-circle-check');
    }
});


//비밀번호 양식 확인, 유저 회원가입 진행
document.getElementById('signup-button').addEventListener('click', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const userId = document.getElementById('userId').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value; // Assuming there's an element with this ID

    // 패스위드 길이(8자이상), 알파벳 특수문자 포함 여부 확인
    let hasAlphabet = /[a-zA-Z]/.test(password);
    let hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    if (password.length < 8) {
        alert('비밀번호는 8자 이상이어야 합니다.');  
        return;
    } else if (!hasAlphabet || !hasSpecialChar) {
        alert('비밀번호는 알파벳과 특수문자를 포함해야 합니다.');  
        return;
    } else if (password !== confirmPassword) {
        alert('비밀번호와 확인 비밀번호가 일치하지 않습니다.');  
        return;
    }

    const data = {
        userId: userId,
        email: email,
        password: password
    };

    try {
        const response = await fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();

        if (responseData.success) {
            alert("회원가입 성공!");
            window.location.href = "../mainPage/mainPage.html"
        } else {
            alert("회원가입 실패: " + responseData.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
});
