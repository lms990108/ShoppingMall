
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


// confirmPassword가 password와 다르면 빨간줄
// confirmPassword와 password일치하면 초록색줄, 아이콘 변경
document.getElementById('confirmPassword').addEventListener('input', function(event) {
    let confirmPassword = event.target.value;
    const password = document.getElementById('password').value;
    const iconElement = this.nextElementSibling.querySelector('i');
    
    if (password !== confirmPassword) {
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
    const name = document.getElementById('name').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value; 

    let hasAlphabet = /[a-zA-Z]/.test(password);
    let hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

    if(password.length < 8 || !hasAlphabet || !hasSpecialChar){
        alert("비밀번호는 8자이상, 알파벳 및 특수기호를 포함해주세요!")
        return;
    }

    if (password !== confirmPassword) {
        alert('비밀번호와 비밀번호 확인란이 일치하지 않습니다.');
        return;
    }

    const data = {
        email: email,
        name: name,
        password: password,
        level: 0
    };

    try {
        const response = await fetch('http://localhost:5001/api/join', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const responseData = await response.json();

        if (response.status === 201) {
            alert("회원가입 성공!");
            window.location.href = "/"
        } else {
            alert("회원가입 실패: " + responseData.message);
        }
    } catch (error) {
        alert(error +" 다시 시도해주세요.");
        window.location.href = "/signUp"
    }
});         