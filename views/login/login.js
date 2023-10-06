// 로그인 실패 -> 알림창, 성공 -> 마이 페이지 연결
document.getElementById('login-button').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevents form from submitting in traditional way

  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  // Dummy check: you'd replace this with an actual server request
  if(username === 'user@maiil.com' && password === 'pass') {
      // Successful login, redirecting to another page
      window.location.href = './mypage.html'; 
  } else {
      // Failed login, show alert
      alert('Login failed!');
  }
});