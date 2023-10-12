const logoutButton = document.getElementById('logoutButton'); // 로그아웃 버튼의 ID

logoutButton.addEventListener('click', function() {
    // 토큰 삭제
    localStorage.removeItem('token');
    alert("로그아웃 하셨습니다.")
    // 메인 페이지로 리다이렉션
    window.location.href = '/'; // 메인 페이지의 URL
});
