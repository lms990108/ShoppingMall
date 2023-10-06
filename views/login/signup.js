// 아이디, 이메일 중복 체크
// 비밀번호 양식 확인, 비밀번호랑 비밀번호확인 결과 일치하는지 검사
document.getElementById('signupForm').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevents form from submitting traditionally

  var userId = document.getElementById('userId').value;
  var email = document.getElementById('email').value;

  // Dummy data: In a real application, you'd check against a database
  var existingUsers = ["existingUser1", "existingUser2"];
  var existingEmails = ["existingEmail1@example.com", "existingEmail2@example.com"];

  if (existingUsers.includes(userId)) {
      alert('이미 가입된 ID입니다.');  // "The ID is already registered."
  } else if (existingEmails.includes(email)) {
      alert('이미 가입된 email입니다.');  // "The Email is already registered."
  } else {
      // Proceed with the signup process
  }

  // Check password length, presence of alphabet and 특수문자 (special characters)
  var hasAlphabet = /[a-zA-Z]/.test(password);
  var hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password);

  if (password.length < 8) {
      alert('비밀번호는 8자 이상이어야 합니다.');  // Password should be at least 8 characters long.
      return;
  } else if (!hasAlphabet || !hasSpecialChar) {
      alert('비밀번호는 알파벳과 특수문자를 포함해야 합니다.');  // Password should contain both alphabets and special characters.
      return;
  } else if (password !== confirmPassword) {
      alert('비밀번호와 확인 비밀번호가 일치하지 않습니다.');  // Password and confirm password do not match.
      return;
  }
});
